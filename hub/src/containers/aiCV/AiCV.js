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
    this.setState(({ form }) => ({ form: { ...form, [name]: value } }));
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

  handleSubmit = async () => {
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
    const { form, loading, status } = this.state;
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
          <Form onSubmit={this.handleSubmit} loading={loading}>
            <div className="title-status-row">
              <Form.Input
                required
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
              label="Business"
              name="business"
              placeholder="Station"
              value={form.business}
              onChange={this.handleChange}
            />
            <Form.Group widths="equal">
              <Form.Select
                required
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
                label="Contract type"
                name="contractType"
                placeholder="Full-time"
                value={form.contractType}
                onChange={this.handleChange}
              />
            </Form.Group>
            <Form.TextArea
              required
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
              label="Baseline CV"
              name="baselineCvId"
              placeholder="Choose an existing CV"
              noResultsMessage="No CVs found"
              options={cvOptions}
              value={form.baselineCvId}
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
export default connect(mapStateToProps, mapDispatchToProps)(AiCV);
