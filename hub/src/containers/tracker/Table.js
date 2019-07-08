/* eslint-disable */
import PropTypes from 'prop-types';
import React, { Component } from "react";
import { Dropdown, Pagination, Table } from 'semantic-ui-react';
import { addNotification, getApplications } from '../../actions/tracker';
import { APPLIED_COMPANIES, columns, role, status, stages, actions } from './Tracker.data'
import { connect } from 'react-redux';


class TrackingTable extends Component {
	constructor(props) {
		super(props);
	}

	componentDidMount = () => {
		this.props.getApplications()
	}

	getCurrentStage = (allStages) => {
		const maxVal = Math.max.apply(Math, allStages.map((o, i) => +o.order))
		const maxObj = allStages.filter(x => maxVal == x.order)
		return maxObj[0]
	}

	render() {
		const applications = this.props.applications.length > 0 ? this.props.applications : this.state.applications

		return (
			<Table compact celled>
				<Table.Header>
					<Table.Row>
						{columns.map((col, i) =>
							<Table.HeaderCell key={i} >{col}</Table.HeaderCell>
						)}
					</Table.Row>
				</Table.Header>

				<Table.Body>
					{applications.map((application, i) =>
						<Table.Row key={i}>
							<Table.Cell>{application.company}</Table.Cell>
							{/* <Table.Cell>{application.status.name}</Table.Cell> */}
							<Table.Cell>{application.role}</Table.Cell>
							<Table.Cell>{application.contact.contactName + ' <' + application.contact.contactEmail + '>'}</Table.Cell>
							<Table.Cell>{this.getCurrentStage(application.stages).action + " (" + this.getCurrentStage(application.stages).dept + ")"}</Table.Cell>
							<Table.Cell>{application.applicationUrl}</Table.Cell>
							<Table.Cell>{application.location}</Table.Cell>
							<Table.Cell>{application.description}</Table.Cell>
							<Table.Cell>
								<Dropdown options={actions} direction='left' floating className='button icon' trigger={<React.Fragment />} />
							</Table.Cell>
						</Table.Row>
					)}

				</Table.Body>

				<Table.Footer fullWidth>
					<Table.Row>
						<Table.HeaderCell colSpan={columns.length}>
							<Pagination
								defaultActivePage={1}
								firstItem={null}
								lastItem={null}
								pointing
								secondary
								totalPages={3}
							/>
						</Table.HeaderCell>
					</Table.Row>
				</Table.Footer>
			</Table>
		)
	}
}


TrackingTable.propTypes = {
	trackerData: PropTypes.arrayOf(PropTypes.string),
	stages: PropTypes.array,
	columns: PropTypes.arrayOf(PropTypes.string)

}

function mapStateToProps(state, ownProps) {
	if (state.applications.length > 0) {
		return {
			applications: state.applications,
		}
	} else {
		return {
			applications: APPLIED_COMPANIES
		}

	}

}

export default connect(mapStateToProps, { addNotification, getApplications })(TrackingTable);
