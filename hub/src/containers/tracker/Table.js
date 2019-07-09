/* eslint-disable */
import PropTypes from 'prop-types';
import React, { Component } from "react";
import { Dropdown, Pagination, Table } from 'semantic-ui-react';
import { addNotification, getApplications, deleteApplication } from '../../actions/tracker';
import { APPLIED_COMPANIES, columns, role, status, stages, actions } from './Tracker.data'
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom'

class TrackingTable extends Component {
	constructor(props) {
		super(props);
		this.state = {

		}
	}

	componentDidMount = () => {
		this.props.getApplications()
	}

	getCurrentStage = (allStages) => {
		const maxVal = Math.max.apply(Math, allStages.map((o, i) => +o.order))
		const maxObj = allStages.filter(x => maxVal == x.order)
		return maxObj[0]
	}

	openDetailPage(id) {
		console.log(this)
		return <Redirect to={`/tracker/${id}`} />
		// this.props.history.push(`/tracker/${id}`)
	}

	deleteApplication = id => {
		console.log('delete application')
		this.props.deleteApplication(id).then(res => {
			this.props.getApplications()
		})
	}

	moveNextStage = i => {
		console.log('move next stage', i)
	}

	closeStatus = i => {
		console.log('close status', i)
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
					{applications.length > 0 ? applications.map((application, i) =>
						<Table.Row key={i}>
							<Table.Cell>{application.company}</Table.Cell>
							<Table.Cell>{application.status.text}</Table.Cell>
							<Table.Cell>{application.role || ''}</Table.Cell>
							<Table.Cell>{application.contacts.length > 0 ? application.contacts[0].contactName + ' <' + application.contacts[0].contactEmail + '>' : ''}</Table.Cell>
							<Table.Cell>{this.getCurrentStage(application.stages).action + " (" + this.getCurrentStage(application.stages).dept + ")"}</Table.Cell>
							<Table.Cell>{application.applicationUrl}</Table.Cell>
							<Table.Cell>{application.location}</Table.Cell>
							<Table.Cell>{application.description}</Table.Cell>
							<Table.Cell>
								<Dropdown direction='left' floating className='button icon' trigger={<React.Fragment />} >
									<Dropdown.Menu>
										<Dropdown.Item text='View/Edit' icon='eye' onClick={() => <Redirect to={`/tracker/${application._id}`} />} />
										<Dropdown.Item text='Delete' icon='delete' onClick={() => this.deleteApplication(application._id)} />
										<Dropdown.Item text='Next Stage' icon='play' onClick={() => this.moveNextStage(i)} />
										<Dropdown.Item text='Close status' icon='close' onClick={() => this.closeStatus(i)} />
									</Dropdown.Menu>
								</Dropdown>
							</Table.Cell>
						</Table.Row>
					) :
						<Table.Row>
							No Applications
						</Table.Row>
					}

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

export default connect(mapStateToProps, { addNotification, getApplications, deleteApplication })(TrackingTable);
