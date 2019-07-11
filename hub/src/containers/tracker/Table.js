/* eslint-disable */
import PropTypes from 'prop-types';
import React, { Component } from "react";
import update from 'react-addons-update';
import { connect } from 'react-redux';
import { Dropdown, Pagination, Table } from 'semantic-ui-react';
import { addNotification, deleteApplication, getApplications } from '../../actions/tracker';
import { APPLIED_COMPANIES, columns } from './Tracker.data';

class TrackingTable extends Component {
	constructor(props) {
		super(props);
		this.state = {
			applications: APPLIED_COMPANIES
		}
	}

	componentDidMount = () => {
		this.props.getApplications()
	}

	componentWillReceiveProps = (nextProps) => {
		this.setState({
			applications: nextProps.applications
		})
	}

	getCurrentStage = (allStages) => {
		const sortedStages = allStages.sort(({ order: a }, { order: b }) => {
			if (+a > +b) {
				return 1
			} else {
				return -1
			}
		})
		const filterCompleted = sortedStages.filter(x => !x.completed)
		return filterCompleted[0]
	}

	openDetailPage(id) {
		this.props.history.push(`/tracker/${id}`)
	}

	deleteApplication = id => {
		this.props.deleteApplication(id).then(res => {
			this.props.getApplications()
		})
	}

	moveNextStage = i => {
		console.log('move next stage', i, this.state)
		const { stages } = this.state.applications[i]
		const orderedStages = stages.sort(({order: a}, {order: b}) => {
			if (a > b) {
				return 1
			} else {
				return -1
			}
		})
		const findStageIndex = orderedStages.findIndex(x => x.completed)
		const newData = update(this.state.applications,
			{ 
				[i]: { stages: { completed: { $set: true } } }
			}
		)
		this.setState({ applications: newData })
	}

	closeStatus = i => {
		console.log('close status', i)
	}
	render() {
		const { applications } = this.state
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
										<Dropdown.Item text='View/Edit' icon='eye' onClick={() => this.openDetailPage(application._id)} />
										<Dropdown.Item text='Delete' icon='delete' onClick={() => this.deleteApplication(application._id)} />
										<Dropdown.Item text='Next Stage' icon='play' onClick={() => this.moveNextStage(i)} />
										<Dropdown.Item text='Close status' icon='close' onClick={() => this.closeStatus(i)} />
									</Dropdown.Menu>
								</Dropdown>
							</Table.Cell>
						</Table.Row>
					) :
						<Table.Row>
							<Table.Cell colSpan={columns.length}>No Applications</Table.Cell>
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
	return {
		applications: state.applications
	}

}

export default connect(mapStateToProps, { addNotification, getApplications, deleteApplication })(TrackingTable);
