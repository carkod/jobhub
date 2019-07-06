/* eslint-disable */
import PropTypes from 'prop-types';
import React, { Component } from "react";
import { Dropdown, Pagination, Table } from 'semantic-ui-react';

const columns = ['Company', 'Status', 'Role', 'Contact', 'Current Stage', 'Application', 'Location', 'Description', ''];
const stages = [
	// (1) Use default stages and (2) allow for adding additional stages
	{ order: 0, type: 'First contact', dept: 'HR', startDate: new Date(), finishDate: new Date() },
	{ order: 1, type: 'Telephone', dept: 'HR', startDate: new Date(), finishDate: new Date() },
	{ order: 2, type: 'Videocall', dept: 'Senior Developer', startDate: new Date(), finishDate: new Date() },
	{ order: 3, type: 'Face2Face', dept: 'Developer', startDate: new Date(), finishDate: new Date() },
	{ order: 3, type: 'Test', dept: 'Technical', startDate: new Date(), finishDate: new Date() },
];
const role = ['Front-end developer', 'JavaScript developer', 'Business analyst', 'Project manager', 'Full stack Javascript Developer'];
const status = [
	{ value: 0, name: "Not started" },
	{ value: 1, name: "In progress" },
	{ value: 2, name: "Rejected" },
	{ value: 3, name: "Success" },
]
// const roleSeniority = ['Junior', 'Mid-level', 'Senior'];
const appliedCompanies = [
	{
		company: "Capgemini",
		status: { value: 0, name: "Not started" },
		role: "Front-end developer",
		contact: {
			name: "Maria Zambrano",
			email: "maria@recruitment.com",

		},
		stage: { order: 1, type: 'Telephone', dept: 'HR', startDate: new Date(), finishDate: new Date() },
		applicationUrl: "https://www.linkedin.com/jobs/view/1331562981/",
		location: "Madrid",
		description: "Angular 6, Spanish. Needed knowledge in JIRA and agile methodologies",
		files: null
	},
	{
		company: "Indra",
		status: { value: 0, name: "Not started" },
		role: "Front-end developer",
		contact: {
			name: "Maria Zambrano",
			email: "maria@recruitment.com",

		},
		stage: { order: 1, type: 'Telephone', dept: 'HR', startDate: new Date(), finishDate: new Date() },
		applicationUrl: "https://www.linkedin.com/jobs/view/1331562981/",
		location: "Madrid",
		description: "Angular 6, Spanish. Needed knowledge in JIRA and agile methodologies",
		files: null
	}
]
const actions = [
	{ key: 0, icon: 'eye', text: 'View more', value: 'view' },
	{ key: 1, icon: 'play', text: 'Next stage', value: 'next' },
	{ key: 2, icon: 'edit', text: 'Edit', value: 'edit' },
	{ key: 3, icon: 'delete', text: 'Remove', value: 'delete' },
	{ key: 4, icon: 'hide', text: 'Close status', value: 'close' },
]



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