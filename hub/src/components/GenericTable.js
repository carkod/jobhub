/* eslint-disable */
import _ from 'lodash';
import moment from 'moment';
import PropTypes from 'prop-types';
import React, { Component } from "react";
import update from 'react-addons-update';
import { connect } from 'react-redux';
import { Dropdown, Pagination, Table } from 'semantic-ui-react';
import { addNotification } from '../../actions/notification';

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
			data: {

      },
			pageddata: APPLIED_COMPANIES
		}
	}


	componentDidMount = () => {
		
	}

	componentWillReceiveProps = (nextProps) => {
		
	}

	componentDidUpdate = (prevProps, prevState, snapshot) => {
		const { data, totalPages, showArchive, activePage } = this.state 
		if (prevState.data !== this.state.data) {
			this.totalPages()
			this.setState({
				pageddata: this.paginatePages(data, activePage)
			})
		}
		if (prevState.totalPages !== this.state.totalPages) {
			this.setState({ pageddata: this.paginatePages(data, activePage) })
		}

		if (prevState.showArchive !== this.state.showArchive) {
			this.setState({ showArchive: showArchive})
		}

	}

	openDetailPage(id) {
		this.props.history.push(`/tracker/${id}`)
	}

	deleteApplication = id => {
		this.props.deleteApplication(id).then(res => {
			this.props.getdata()
		})
	}

	moveNextStage = i => {
		const { stages } = this.state.data[i];
		const findStageIndex = stages.findIndex(x => !x.completed)
		if (findStageIndex === -1) {
			const action = {
				type: 'NO_MORE_STAGES',
			}
			addNotification(action)
			return false
		}
		const newData = update(this.state.data,
			{
				[i]: { stages: { [findStageIndex]: { completed: { $set: true } } } }
			}
		)
		this.setState({ data: newData })
		this.props.moveNextStage(this.state.data)
	}

	handleSort = clickedColumn => () => {
		const { activeColumn, data, direction } = this.state

		if (activeColumn !== clickedColumn) {
			this.setState({
				activeColumn: clickedColumn,
				data: _.sortBy(data, [clickedColumn]),
				direction: 'ascending',
			})

			return
		}

		this.setState({
			data: data.reverse(),
			direction: direction === 'ascending' ? 'descending' : 'ascending',
		})
	}

	handlePaginationChange = (e, p) => {
		this.setState({ 
      activePage: p.activePage, 
      pageddata: this.paginatePages(this.state.data, p.activePage) 
    })
	}

	totalPages() {
		const { data, activePageSize } = this.state
		if (data.length < activePageSize) {
			this.setState({ totalPages: 1 })
			return 1
		} else {
			// Is there a remainder?
			const remainder = (data.length % activePageSize) === 0
			const calculatePages = data.length / activePageSize
			const result = remainder ? calculatePages : Math.floor(calculatePages) + 1
			this.setState({ totalPages: result })
			return result
		}
	}

	paginatePages(data, activePage) {
		const { activePageSize } = this.state
		const pageddata = data.slice((activePage - 1) * activePageSize, activePageSize * activePage);
		return pageddata
	}

	render() {
		const { data, activeColumn, direction, activePage, activePageSize, totalPages, pageddata } = this.state
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
					{pageddata.length > 0 ? pageddata.map((application, i) =>
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
							<Table.Cell colSpan={columns.length}>No data</Table.Cell>
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
	data: PropTypes.arrayOf(PropTypes.string),
	columns: PropTypes.arrayOf(PropTypes.string)

}

function mapStateToProps(state, ownProps) {
	return {
		data: state.data
	}

}

export default connect(mapStateToProps)(GenericTable);
