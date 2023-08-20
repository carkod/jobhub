import React, { Component } from "react";
import update from "react-addons-update";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { compose } from "redux";
import {
  Button,
  Checkbox,
  Divider,
  Form,
  Header,
  Icon,
  TextArea
} from "semantic-ui-react";
import { addNotification } from "../../actions/notification";
import {
  fetchApplication,
  saveApplication,
  uploadFile,
  editApplication
} from "../../actions/tracker";
import { withRouter } from "../../utils";
import AddNewApplicationConfig from "./AddNewApplication.config";
import { status as statusOptions } from "./Tracker.data";

class EditApplication extends Component {
  constructor(props) {
    super(props);
    this.applicationModel = new AddNewApplicationConfig();
    this.state = {
      _id: null,
      status: {
        value: 0,
        text: "Applied",
      },
      company: "",
      role: "Front End Developer",
      salary: "",
      applicationUrl: "",
      location: "",
      contacts: this.applicationModel.emptyContact,
      stages: this.applicationModel.emptyStages,
      files: [""],
      description: "",
    };
  }

  componentDidMount() {
    const { id } = this.props.router.params;
    this.props.fetchApplication(id);
  }

  componentDidUpdate(prevProps, prevState) {

    if (this.props.application !== prevProps.application) {
      const { status, contacts, stages } = this.props.application;    
      this.setState((prevState) => ({
        status: {
          ...prevState.status,
          value: status.value,
          text: status.text,
        },
        stages: update(this.state.stages, { $set: stages }),
        contacts: contacts,
        company: this.props.application.company,
        role: this.props.application.role,
        salary: this.props.application.salary,
        applicationUrl: this.props.application.applicationUrl,
        files: this.props.application.files,
        description: this.props.application.description,
        location: this.props.application.location,
      }));
    }

    if (this.props.showArchive !== prevProps.showArchive) {
      const { id } = this.props.router.params;
      this.props.fetchApplication(id);
    }
  }

  inputChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  descChange = (e) => {
    this.setState({ description: e.toString("html") });
  };

  addNewStage = () => {
    const oldStages = this.state.stages;
    const lastIndex = this.state.stages.length - 1;
    const newOrder = this.state.stages[lastIndex].order + 1;
    let applicationModel = new AddNewApplicationConfig();
    applicationModel.emptyStages[0].order = newOrder;
    const newStages = oldStages.concat(applicationModel.emptyStages);
    this.setState({ stages: newStages });
  };

  addNewContact = () => {
    const newData = this.state.contacts.concat(
      this.applicationModel.emptyContact
    );
    this.setState({ contacts: newData });
  };

  statusChange = (e, data) => {
    const findObj = statusOptions.find((x) => x.key === data.value);
    this.setState({ status: findObj });
  };

  stagesInputChange = (i) => (e) => {
    const { name, value } = e.target;
    const newData = update(this.state.stages, {
      [i]: { [name]: { $set: value } },
    });
    this.setState({ stages: newData });
  };

  completedStage = (i) => (e, data) => {
    const { name, checked } = data;
    const newData = update(this.state.stages, {
      [i]: { [name]: { $set: checked } },
    });
    this.setState({ stages: newData });
  };

  contactInputChange = (i) => (e) => {
    const { name, value } = e.target;
    const newData = update(this.state.contacts, {
      [i]: { [name]: { $set: value } },
    });
    this.setState({ contacts: newData });
  };

  fileInputChange = (i) => (e) => {
    const { name, value } = e.target;
    const newData = update(this.state.contacts, {
      [i]: { [name]: { $set: value } },
    });
    this.setState({ contacts: newData });
  };

  removeStage = (i) => (e) => {
    const oldData = this.state.stages.slice(0, i);
    this.setState({
      stages: [...oldData],
    });
  };

  removeContact = (i) => (e) => {
    const oldData = this.state.contacts.slice(0, i);
    this.setState({
      contacts: [...oldData],
    });
  };

  removeFile = (i) => (e) => {
    const oldData = this.state.files.slice(0, i);
    this.setState({
      files: [...oldData],
    });
  };

  resetForm() {
    this.setState({
      company: "",
      status: {
        text: "",
        value: 0,
      },
      role: "",
      salary: "",
      applicationUrl: "",
      location: "",
      contacts: this.applicationModel.emptyContact,
      stages: this.applicationModel.emptyStages,
      files: [""],
      description: "",
    });
  }

  onSave = (e) => {
    if (this.props.router.params.id) {
      this.props.editApplication(this.state, this.props.router.params.id);
    } else {
      this.props.saveApplication(this.state);
    }
    
  };

  render() {
    const backBtn = (
      <button className="btn__add-new">
        <Link to={`/tracker`}>
          <Icon name="backward" color="green" />
        </Link>
      </button>
    );

    const removeContactBtn = (i) => {
      return (
        <Button
          type="button"
          onClick={this.removeContact(i)}
          width={"1"}
          className="btn"
        >
          <Icon name="minus square" />
        </Button>
      );
    };

    const removeStageBtn = (i) => {
      if (i > 0) {
        return (
          <Button
            type="button"
            onClick={this.removeStage(i)}
            width={"1"}
            className="btn"
          >
            <Icon name="minus square" />
          </Button>
        );
      }
    };

    const removeFileBtn = (i) => {
      return (
        <Button
          type="button"
          onClick={this.removeFile(i)}
          width={"1"}
          className="btn"
        >
          <Icon name="minus square" />
        </Button>
      );
    };

    const {
      company,
      status,
      role,
      salary,
      applicationUrl,
      stages,
      files,
      description,
      location,
      contacts,
    } = this.state;

    return (
      <div id="new-application">
        <h1>View and Edit application {backBtn}</h1>
        <Form className="addNew-modal" onSubmit={this.onSave}>
          <Form.Group widths="equal">
            <Form.Input
              value={company}
              fluid
              name="company"
              placeholder="Company name"
              required
              onChange={this.inputChange}
            />
            <Form.Dropdown
              value={status.value}
              fluid
              selection
              options={statusOptions}
              placeholder="Select application status"
              required
              onChange={this.statusChange}
            />
            <Form.Input
              value={role}
              fluid
              name="role"
              placeholder="Role"
              onChange={this.inputChange}
            />
            <Form.Input
              value={salary}
              fluid
              name="salary"
              placeholder="Salary"
              onChange={this.inputChange}
            />
          </Form.Group>

          <Form.Group widths="equal">
            <Form.Input
              value={applicationUrl}
              type="text"
              fluid
              name="applicationUrl"
              placeholder="Application url"
            />
            <Form.Input
              value={location}
              fluid
              name="location"
              placeholder="Location"
              onChange={this.inputChange}
            />
          </Form.Group>

          <br />
          <Divider horizontal>
            <Header as="h3">
              Contacts
              <button type="button" className="btn">
                <Icon name="plus square" onClick={this.addNewContact} />
              </button>
            </Header>
          </Divider>
          <br />

          {contacts.map((contact, i) => (
            <Form.Group key={i}>
              <Form.Input
                width={"5"}
                fluid
                name="contactName"
                placeholder="Contact name"
                value={contacts[i].contactName}
                onChange={this.contactInputChange(i)}
              />
              <Form.Input
                width={"5"}
                fluid
                name="contactEmail"
                placeholder="Contact email"
                value={contacts[i].contactEmail}
                onChange={this.contactInputChange(i)}
              />
              <Form.Input
                width={"6"}
                fluid
                name="contactPhone"
                placeholder="Contact phone"
                value={contacts[i].contactPhone}
                onChange={this.contactInputChange(i)}
              />
              {removeContactBtn(i)}
            </Form.Group>
          ))}

          <br />
          <Divider horizontal>
            <Header as="h3">
              Stages
              <button type="button" className="btn">
                <Icon name="plus square" onClick={this.addNewStage} />
              </button>
            </Header>
          </Divider>
          <br />

          {stages.map((stage, i) => (
            <Form.Group key={i}>
              <Form.Input
                width={"1"}
                fluid
                placeholder="Order"
                name="order"
                type="number"
                value={stages[i].order}
                onChange={this.stagesInputChange(i)}
              />
              <Form.Field width={"1"}>
                <label>Completed?</label>
                <Checkbox
                  toggle
                  name="completed"
                  checked={stages[i].completed}
                  onChange={this.completedStage(i)}
                ></Checkbox>
              </Form.Field>

              <Form.Input
                width={"3"}
                fluid
                name="action"
                placeholder="Action"
                value={stages[i].action}
                onChange={this.stagesInputChange(i)}
              />
              <Form.Input
                width={"4"}
                fluid
                name="dept"
                placeholder="Type"
                value={stages[i].dept}
                onChange={this.stagesInputChange(i)}
              />
              <Form.Input
                width={"3"}
                fluid
                name="startDate"
                value={stages[i].startDate}
                onChange={this.stagesInputChange(i)}
              />
              <Form.Input
                width={"3"}
                fluid
                name="endDate"
                disabled
                value={stages[i].endDate}
                onChange={this.stagesInputChange(i)}
              />
              {removeStageBtn(i)}
            </Form.Group>
          ))}

          <br />
          <Divider horizontal>
            <Header as="h3">
              Files
              <button type="button" className="btn">
                <Icon name="plus square" onClick={this.addNewFile} />
              </button>
            </Header>
          </Divider>
          <br />

          {files.map((file, i) => (
            <Form.Group key={i} widths="equal">
              <Form.Input
                fluid
                label="File name"
                name="fileName"
                value={files[i].fileName}
                onChange={this.fileInputChange(i)}
              />
              <Form.Input
                fluid
                label="File url"
                name="fileUrl"
                value={files[i].fileUrl}
                onChange={this.fileInputChange(i)}
              />
              {removeFileBtn(i)}
            </Form.Group>
          ))}

          <br />
          <Divider />
          <br />

          <h3>Job description</h3>
          <TextArea
            name="description"
            placeholder="Write blog content here"
            rows={20}
            onChange={this.descChange}
            value={description}
          />
        <br />
        <Divider />
        <br />

        <Button type="submit" color="green">
          <Icon name="save" /> Save
        </Button>
        </Form>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    application: state.applicationDetail.data,
    showArchive: state.showArchive,
  };
}

export default compose(
  withRouter,
  connect(mapStateToProps, {
    uploadFile,
    addNotification,
    saveApplication,
    fetchApplication,
    editApplication,
  })
)(EditApplication);
