import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Button,
  Card,
  Form,
  Icon,
  Label,
  Message,
  Segment,
} from "semantic-ui-react";
import { generateAiCv, fetchAiCvGeneration } from "../../actions/ai-cv";
import { fetchCVs } from "../../actions/cv";
import { addNotification } from "../../actions/notification";
import "../../styles/ai-cv.css";

const initialForm = {
  prompt: "Adapt my CV to this job description",
  jobTitle: "",
  business: "",
  workMode: "",
  location: "",
  contractType: "",
  description: "",
  baselineCvId: "",
};

// 10 s per poll, so about 15 minutes. This matches the server's stale-job limit.
const MAX_POLL_ATTEMPTS = 90;

const plainText = (value = "") =>
  value
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();

class AiCV extends Component {
  state = {
    form: initialForm,
    errors: {},
    status: "new",
    loading: false,
    collapsed: false,
  };

  componentDidMount() {
    this.props.fetchCVs();
  }

  componentWillUnmount() {
    window.clearTimeout(this.pollTimer);
  }

  handleChange = (event, data) => {
    const name = data.name || event.target.name;
    const value = data.value === undefined ? event.target.value : data.value;
    this.setState(({ form, errors }) => {
      const nextForm = { ...form, [name]: value };
      const nextErrors = { ...errors };
      const fieldError = this.validateForm(nextForm)[name];
      if (fieldError) nextErrors[name] = fieldError;
      else delete nextErrors[name];
      return { form: nextForm, errors: nextErrors };
    });
  };

  validateForm = (form = this.state.form) => {
    const errors = {};
    const requiredTextFields = {
      jobTitle: "Job title is required.",
      business: "Business is required.",
      contractType: "Contract type is required.",
      description: "Job description and requirements are required.",
      prompt: "Refine AI prompt is required.",
    };

    Object.entries(requiredTextFields).forEach(([field, message]) => {
      if (!String(form[field] || "").trim()) errors[field] = message;
    });

    if (!["On-site", "Hybrid", "Remote"].includes(form.workMode)) {
      errors.workMode = "Select a work mode.";
    }

    const availableCv = (this.props.cvs || []).some(
      (cv) => cv._id === form.baselineCvId,
    );
    if (!availableCv) errors.baselineCvId = "Choose an existing baseline CV.";

    return errors;
  };

  poll = (jobId, attempt = 1) => {
    this.pollTimer = window.setTimeout(async () => {
      try {
        const result = await this.props.fetchAiCvGeneration(jobId);
        // Ignore results from a job that a newer submit replaced.
        if (jobId !== this.activeJobId) return;
        this.setState({
          status: result.status,
          generatedCv: result.cv || null,
        });
        const pending =
          result.status === "in-progress" || result.status === "new";
        if (pending && attempt < MAX_POLL_ATTEMPTS)
          this.poll(jobId, attempt + 1);
        if (pending && attempt >= MAX_POLL_ATTEMPTS)
          this.props.notify(
            "CV generation is taking too long. Check the CV list later.",
            true,
          );
        if (result.status === "completed")
          this.props.notify("Your tailored CV is ready.");
        if (result.status === "failed")
          this.props.notify(result.error || "CV generation failed", true);
      } catch (error) {
        this.props.notify(error.message, true);
      }
    }, 10000);
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    const errors = this.validateForm();
    this.setState({ errors });
    if (Object.keys(errors).length) return;

    window.clearTimeout(this.pollTimer);
    this.activeJobId = null;
    this.setState({ loading: true, status: "new", generatedCv: null });
    try {
      const result = await this.props.generateAiCv(this.state.form);
      this.setState({
        loading: false,
        status: result.status,
        generatedCv: result.cv || null,
      });
      this.props.notify(result.message);
      this.activeJobId = result.jobId;
      if (result.status === "in-progress") this.poll(result.jobId);
    } catch (error) {
      this.setState({ loading: false, status: "failed" });
      this.props.notify(error.message || "CV generation failed", true);
    }
  };

  renderPreview() {
    const { generatedCv, collapsed } = this.state;
    if (!generatedCv) return null;
    return (
      <Card fluid className="ai-cv-result">
        <Card.Content>
          <Button
            floated="right"
            basic
            icon
            labelPosition="left"
            onClick={() => this.setState({ collapsed: !collapsed })}
          >
            <Icon name={collapsed ? "chevron down" : "chevron up"} />
            {collapsed ? "Show" : "Hide"}
          </Button>
          <Card.Header>{generatedCv.name}</Card.Header>
          <Card.Meta>Generated CV · {generatedCv.cats?.position}</Card.Meta>
        </Card.Content>
        {!collapsed && (
          <Card.Content>
            <h3>Professional summary</h3>
            <p>{plainText(generatedCv.summary)}</p>
            <h3>Experience</h3>
            {(generatedCv.workExp || []).map((item, index) => (
              <div className="ai-cv-experience" key={item._id || index}>
                <strong>{item.position || item.title}</strong>
                {item.company && ` · ${item.company}`}
                <p>{plainText(item.desc)}</p>
              </div>
            ))}
          </Card.Content>
        )}
        <Card.Content extra>
          <Button as="a" primary href={`/cv/${generatedCv._id}`}>
            <Icon name="edit" />
            Open generated CV
          </Button>
        </Card.Content>
      </Card>
    );
  }

  render() {
    const { form, errors, loading, status } = this.state;
    // The reducer starts with an empty placeholder CV that has no _id. Skip it.
    const cvOptions = (this.props.cvs || [])
      .filter((cv) => cv._id)
      .map((cv) => ({
        key: cv._id,
        value: cv._id,
        text: cv.name,
      }));
    return (
      <div id="ai-cv">
        <div className="ai-cv-heading">
          <div>
            <span className="eyebrow">AI CV studio</span>
            <h1>Tailor a CV to your next role</h1>
            <p>
              Provide the job details and choose an existing CV as the factual
              baseline.
            </p>
          </div>
        </div>
        <Segment padded="very" className="ai-cv-form-card">
          <Form
            noValidate
            onSubmit={this.handleSubmit}
            loading={loading}
          >
            {Object.keys(errors).length > 0 && (
              <Message
                error
                header="Please correct the following fields before continuing."
                list={Object.values(errors)}
              />
            )}
            <div className="title-status-row">
              <Form.Input
                required
                error={errors.jobTitle && { content: errors.jobTitle }}
                label="Job title"
                name="jobTitle"
                placeholder="Full Stack Engineer"
                value={form.jobTitle}
                onChange={this.handleChange}
              />
              <div className="status-field">
                <label>Status</label>
                <Label
                  color={
                    status === "completed"
                      ? "green"
                      : status === "failed"
                        ? "red"
                        : status === "in-progress"
                          ? "orange"
                          : "blue"
                  }
                >
                  {status}
                </Label>
              </div>
            </div>
            <Form.Input
              required
              error={errors.business && { content: errors.business }}
              label="Business"
              name="business"
              placeholder="Station"
              value={form.business}
              onChange={this.handleChange}
            />
            <Form.Group widths="equal">
              <Form.Select
                required
                error={errors.workMode && { content: errors.workMode }}
                label="Work mode"
                name="workMode"
                placeholder="Select work mode"
                options={["On-site", "Hybrid", "Remote"].map((value) => ({
                  key: value,
                  value,
                  text: value,
                }))}
                value={form.workMode}
                onChange={this.handleChange}
              />
              <Form.Input
                label="Location (optional)"
                name="location"
                placeholder="London, England, UK"
                value={form.location}
                onChange={this.handleChange}
              />
              <Form.Input
                required
                error={errors.contractType && {
                  content: errors.contractType,
                }}
                label="Contract type"
                name="contractType"
                placeholder="Full-time"
                value={form.contractType}
                onChange={this.handleChange}
              />
            </Form.Group>
            <Form.TextArea
              required
              error={errors.description && {
                content: errors.description,
              }}
              label="Job description and requirements"
              name="description"
              placeholder="Paste the complete job description here…"
              rows={14}
              value={form.description}
              onChange={this.handleChange}
            />
            <Form.Select
              search
              required
              error={errors.baselineCvId && {
                content: errors.baselineCvId,
              }}
              label="Baseline CV"
              name="baselineCvId"
              placeholder="Choose an existing CV"
              noResultsMessage="No CVs found"
              options={cvOptions}
              value={form.baselineCvId}
              onChange={this.handleChange}
            />
            <Form.TextArea
              required
              error={errors.prompt && { content: errors.prompt }}
              label="Refine AI prompt"
              name="prompt"
              rows={4}
              value={form.prompt}
              onChange={this.handleChange}
            />
            {status === "in-progress" && (
              <Message
                info
                content="Generation is taking a little longer. You can leave this page and check back in 10 minutes."
              />
            )}
            <Button primary size="large" type="submit" disabled={loading}>
              <Icon name="magic" />
              {loading ? "Adapting CV…" : "Generate tailored CV"}
            </Button>
          </Form>
        </Segment>
        {this.renderPreview()}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({ cvs: state.getCvsReducer });
const mapDispatchToProps = (dispatch) => ({
  fetchCVs: () => dispatch(fetchCVs()),
  generateAiCv: (payload) => dispatch(generateAiCv(payload)),
  fetchAiCvGeneration: (id) => dispatch(fetchAiCvGeneration(id)),
  notify: (message, error = false) =>
    dispatch({ ...addNotification({}, message), error }),
});
export { AiCV };
export default connect(mapStateToProps, mapDispatchToProps)(AiCV);
