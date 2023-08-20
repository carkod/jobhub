/* eslint-disable */
import _ from "lodash";
import moment from "moment";
import PropTypes from "prop-types";
import React, { Component } from "react";
import update from "react-addons-update";
import { connect } from "react-redux";
import { compose } from "redux";
import { Dropdown, Table } from "semantic-ui-react";
import { addNotification } from "../../actions/notification";
import {
	deleteApplication,
	editApplication,
	getApplications,
	moveNextStage
} from "../../actions/tracker";
import { withRouter } from "../../utils";
import AddNewApplicationConfig from "./AddNewApplication.config";
import { APPLIED_COMPANIES, columns } from "./Tracker.data";

class TrackingTable extends Component {
  constructor(props) {
    super(props);
    this.stages = new AddNewApplicationConfig();
    this.state = {
      activeColumn: null,
      direction: null,
      activePage: 1,
      activePageSize: 10,
      totalPages: 1,
      filterStatus: "active",
      applications: APPLIED_COMPANIES,
      pagedApplications: APPLIED_COMPANIES,
    };
  }

  componentDidMount = () => {
    this.props.getApplications(this.state.filterStatus);
  };

  componentDidUpdate = (prevProps, prevState) => {

    if (prevProps.applications !== this.props.applications) {
      this.setState({
        applications: this.props.applications,
      });
    }

    if (prevProps.filterStatus !== this.props.filterStatus) {
      this.props.getApplications(this.props.filterStatus);
    }
  };

  getCurrentStage = (allStages) => {
    const filterCompleted = allStages.filter((x) => !x.completed);
    if (filterCompleted.length > 0) {
      return filterCompleted[0];
    }
    return this.stages.emptyStages[0];
  };

  openDetailPage(id) {
    this.props.router.navigate(`/tracker/${id}`);
  }

  deleteApplication = (id) => {
    this.props.deleteApplication(id).then((res) => {
      this.props.getApplications();
    });
  };

  moveNextStage = (i) => {
    const { stages } = this.state.applications[i];
    const findStageIndex = stages.findIndex((x) => !x.completed);
    if (findStageIndex === -1) {
      const action = {
        type: "NO_MORE_STAGES",
      };
      addNotification(action);
      return false;
    }
    const newData = update(this.state.applications, {
      [i]: { stages: { [findStageIndex]: { completed: { $set: true } } } },
    });
    this.setState({ applications: newData });
    this.props.moveNextStage(this.state.applications[i]);
  };

  handleSort = (clickedColumn) => () => {
    const { activeColumn, applications, direction } = this.state;

    if (activeColumn !== clickedColumn) {
      this.setState({
        activeColumn: clickedColumn,
        applications: _.sortBy(applications, [clickedColumn]),
        direction: "ascending",
      });

      return;
    }

    this.setState({
      applications: applications.reverse(),
      direction: direction === "ascending" ? "descending" : "ascending",
    });
  };

  totalPages() {
    const { applications, activePageSize } = this.state;
    if (applications.length < activePageSize) {
      this.setState({ totalPages: 1 });
      return 1;
    } else {
      // Is there a remainder?
      const remainder = applications.length % activePageSize === 0;
      const calculatePages = applications.length / activePageSize;
      const result = remainder
        ? calculatePages
        : Math.floor(calculatePages) + 1;
      this.setState({ totalPages: result });
      return result;
    }
  }

  handleReject = (index) => {
    this.setState(
      {
        applications: update(this.state.applications, {
          [index]: {
            status: { text: { $set: "Rejected" }, value: { $set: 2 } },
          },
        }),
      },
      () => this.props.editApplication(this.state.applications[index], this.state.applications[index]._id)
    );
  };

  render() {
    const { applications, activeColumn, direction, totalPages } = this.state;
    return (
      <Table sortable compact celled color="blue">
        <Table.Header>
          <Table.Row>
            {columns.map((col, i) => (
              <Table.HeaderCell
                key={i}
                sorted={activeColumn === col ? direction : null}
                onClick={this.handleSort(col)}
              >
                {col}
              </Table.HeaderCell>
            ))}
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {applications.length > 0 ? (
            applications.map((application, i) => (
              <Table.Row key={i}>
                <Table.Cell>{application.company}</Table.Cell>
                <Table.Cell>{application.status.text}</Table.Cell>
                <Table.Cell>{application.role || ""}</Table.Cell>
                <Table.Cell>
                  {application.contacts.length > 0
                    ? application.contacts[0].contactName +
                      " <" +
                      application.contacts[0].contactEmail +
                      ">"
                    : ""}
                </Table.Cell>
                <Table.Cell>
                  {this.getCurrentStage(application.stages).action +
                    " (" +
                    this.getCurrentStage(application.stages).dept +
                    ")"}
                </Table.Cell>
                <Table.Cell>
                  {moment(
                    new Date(this.getCurrentStage(application.stages).startDate)
                  ).format("DD MMMM YYYY")}
                </Table.Cell>
                <Table.Cell>{application.location}</Table.Cell>
                <Table.Cell>{application.salary}</Table.Cell>
                <Table.Cell>
                  <Dropdown
                    direction="left"
                    floating
                    className="button icon"
                    trigger={<React.Fragment />}
                  >
                    <Dropdown.Menu>
                      <Dropdown.Item
                        text="View/Edit"
                        icon="eye"
                        onClick={() => this.openDetailPage(application._id)}
                      />
                      <Dropdown.Item
                        text="Delete"
                        icon="delete"
                        onClick={() => this.deleteApplication(application._id)}
                      />
                      <Dropdown.Item
                        text="Rejected"
                        icon="user close"
                        onClick={() => this.handleReject(i)}
                      />
                    </Dropdown.Menu>
                  </Dropdown>
                </Table.Cell>
              </Table.Row>
            ))
          ) : (
            <Table.Row>
              <Table.Cell colSpan={columns.length}>No Applications</Table.Cell>
            </Table.Row>
          )}
        </Table.Body>
      </Table>
    );
  }
}

TrackingTable.propTypes = {
  trackerData: PropTypes.arrayOf(PropTypes.string),
  stages: PropTypes.array,
  columns: PropTypes.arrayOf(PropTypes.string),
};

function mapStateToProps(state, ownProps) {
  return {
    applications: state.applications,
  };
}

export default compose(
  withRouter,
  connect(mapStateToProps, {
    addNotification,
    getApplications,
    deleteApplication,
    moveNextStage,
    editApplication,
  })
)(TrackingTable);
