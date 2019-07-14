/* eslint-disable */
import _ from 'lodash';
import PropTypes from 'prop-types';
import React, { Component } from "react";
import update from 'react-addons-update';
import { connect } from 'react-redux';
import { Dropdown, Pagination, Table } from 'semantic-ui-react';
import { addNotification, deleteApplication, getApplications, moveNextStage } from '../../actions/tracker';
import AddNewApplicationConfig from './AddNewApplication.config';
import { APPLIED_COMPANIES, columns } from './Tracker.data';
import moment from 'moment';

class TrackingTable extends Component {
	constructor(props) {
		super(props);
		this.stages = new AddNewApplicationConfig()
		this.state = {
			activeColumn: null,
			direction: null,
			activePage: 1,
			activePageSize: 10,
			totalPages: 1,
			showArchive: false,
			applications: APPLIED_COMPANIES,
			pagedApplications: APPLIED_COMPANIES
		}
	}


	componentDidMount = () => {
		this.props.getApplications();
	}

	componentWillReceiveProps = (nextProps) => {
		let filterRejected = nextProps.applications.filter(x => x.status.value !== 2)
		if (nextProps.showArchive) {
			filterRejected = nextProps.applications;
		}
		this.setState({
			applications: filterRejected,
			showArchive: nextProps.showArchive,
			pagedApplications: this.paginatePages(nextProps.applications, nextProps.activePage)
		})		
	}

	componentDidUpdate = (prevProps, prevState, snapshot) => {
		if (prevState.applications !== this.state.applications) {
			this.totalPages()
			this.setState({
				pagedApplications: this.paginatePages(prevState.applications, prevState.activePage)
			})
		}
		if (prevState.totalPages !== this.state.totalPages) {
			this.setState({ pagedApplications: this.paginatePages(prevState.applications, prevState.activePage) })
		}
		
	}

	getCurrentStage = (allStages) => {
		const filterCompleted = allStages.filter(x => !x.completed)
		if (filterCompleted.length > 0) {
			return filterCompleted[0]
		}
		return this.stages.emptyStages[0]
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
		const { stages } = this.state.applications[i];
		const findStageIndex = stages.findIndex(x => !x.completed)
		if (findStageIndex === -1) {
			const action = {
				type: 'NO_MORE_STAGES',
			}
			addNotification(action)
			return false
		}
		const newData = update(this.state.applications,
			{
				[i]: { stages: { [findStageIndex]: { completed: { $set: true } } } }
			}
		)
		this.setState({ applications: newData })
		this.props.moveNextStage(this.state.applications)
	}

	handleSort = clickedColumn => () => {
		const { activeColumn, applications, direction } = this.state

		if (activeColumn !== clickedColumn) {
			this.setState({
				activeColumn: clickedColumn,
				applications: _.sortBy(applications, [clickedColumn]),
				direction: 'ascending',
			})

			return
		}

		this.setState({
			applications: applications.reverse(),
			direction: direction === 'ascending' ? 'descending' : 'ascending',
		})
	}

	handlePaginationChange = (e, p) => {
		this.setState({ activePage: p.activePage, pagedApplications: this.paginatePages(this.state.applications, p.activePage) })
	}

	totalPages() {
		const { applications, activePageSize } = this.state
		if (applications.length < activePageSize) {
			this.setState({ totalPages: 1 })
			return 1
		} else {
			// Is there a remainder?
			const remainder = (applications.length % activePageSize) === 0
			const calculatePages = applications.length / activePageSize
			const result = remainder ? calculatePages : Math.floor(calculatePages) + 1
			this.setState({ totalPages: result })
			return result
		}
	}

	paginatePages(applications, activePage) {
		const { activePageSize } = this.state
		const pagedApplications = applications.slice((activePage - 1) * activePageSize, activePageSize * activePage);
		return pagedApplications
	}

	render() {
		const { applications, activeColumn, direction, activePage, activePageSize, totalPages, pagedApplications } = this.state
		const firstItem = { 'aria-label': 'First item', content: 1 }
		const lastItem = { 'aria-label': 'Last item', content: totalPages }
		return (
			<Table sortable compact celled color='blue'>
				<Table.Header>
					<Table.Row>
						{columns.map((col, i) =>
							<Table.HeaderCell key={i} sorted={activeColumn === col ? direction : null} onClick={this.handleSort(col)}>
								{col}
							</Table.HeaderCell>
						)}
					</Table.Row>
				</Table.Header>

				<Table.Body>
					{pagedApplications.length > 0 ? pagedApplications.map((application, i) =>
						<Table.Row key={i}>
							<Table.Cell>{application.company}</Table.Cell>
							<Table.Cell>{application.status.text}</Table.Cell>
							<Table.Cell>{application.role || ''}</Table.Cell>
							<Table.Cell>{application.contacts.length > 0 ? application.contacts[0].contactName + ' <' + application.contacts[0].contactEmail + '>' : ''}</Table.Cell>
							<Table.Cell>{this.getCurrentStage(application.stages).action + " (" + this.getCurrentStage(application.stages).dept + ")"}</Table.Cell>
							<Table.Cell>
								{moment(new Date(this.getCurrentStage(application.stages).startDate)).format('DD MMMM YYYY')}
							</Table.Cell>
							<Table.Cell>{application.location}</Table.Cell>
							<Table.Cell>{application.salary}</Table.Cell>
							<Table.Cell>
								<Dropdown direction='left' floating className='button icon' trigger={<React.Fragment />} >
									<Dropdown.Menu>
										<Dropdown.Item text='View/Edit' icon='eye' onClick={() => this.openDetailPage(application._id)} />
										<Dropdown.Item text='Delete' icon='delete' onClick={() => this.deleteApplication(application._id)} />
										<Dropdown.Item text='Next Stage' icon='play' onClick={() => this.moveNextStage(i)} />
										{/* <Dropdown.Item text='Close status' icon='close' onClick={() => this.closeStatus(i)} /> */}
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
								boundaryRange={3}
								siblingRange={1}
								ellipsisItem={null}
								firstItem={firstItem}
								lastItem={lastItem}
								pointing
								secondary
								totalPages={totalPages}
								activePage={activePage}
								onPageChange={this.handlePaginationChange}
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

export default connect(mapStateToProps, { addNotification, getApplications, deleteApplication, moveNextStage })(TrackingTable);
