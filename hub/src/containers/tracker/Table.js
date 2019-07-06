/* eslint-disable */
import PropTypes from 'prop-types';
import React, { Component } from "react";
import { Dropdown, Pagination, Table } from 'semantic-ui-react';

import { appliedCompanies, columns, role, status, stages, actions } from './Tracker.data'


class TrackingTable extends Component {
	constructor(props) {
		super(props);

		this.state = {
		};

	}
	render() {
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
					{appliedCompanies.map((application, i) =>
						<Table.Row key={i}>
							<Table.Cell>{application.company}</Table.Cell>
							<Table.Cell>{application.status.value}</Table.Cell>
							<Table.Cell>{application.role}</Table.Cell>
							<Table.Cell>{application.contact.name + ' <' + application.contact.email + '>'}</Table.Cell>
							<Table.Cell>{application.stage.type + " (" + application.stage.dept + ")"}</Table.Cell>
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


export default TrackingTable