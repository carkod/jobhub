/* eslint-disable */
import PropTypes from 'prop-types';
import React, { Component } from "react";

const columns = ['Company', 'Role', 'Location', 'Contact', 'Application', 'Description', 'Files'];
const stages = [
    // (1) Use default stages and (2) allow for adding additional stages
    { order: 0, type: 'First contact', dept: 'HR', startDate: new Date(), finishDate: new Date() },
    { order: 1, type: 'Telephone', dept: 'HR', startDate: new Date(), finishDate: new Date() },
    { order: 2, type: 'Videocall', dept: 'Senior Developer', startDate: new Date(), finishDate: new Date() },
    { order: 3, type: 'Face2Face', dept: 'Developer', startDate: new Date(), finishDate: new Date() },
    { order: 3, type: 'Test', dept: 'Technical', startDate: new Date(), finishDate: new Date() },
];
const role = ['Front-end developer', 'JavaScript developer', 'Business analyst', 'Project manager', 'Full stack Javascript Developer'];
// const roleSeniority = ['Junior', 'Mid-level', 'Senior'];
let description, web, companyType;


class TrackingTable extends Component {
    constructor(props) {
        super(props);

        this.state = {
        };

    }
    render() {
        return (
            <Table compact celled definition>
                <Table.Header>
                    <Table.Row>
                        {columns.map(col => 
                            <Table.HeaderCell>{col}</Table.HeaderCell>
                        )}
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {}
                    <Table.Row>
                        <Table.Cell>Capgemini</Table.Cell>
                        <Table.Cell>Success / In progress / Rejected</Table.Cell>
                        <Table.Cell>Front-end developer</Table.Cell>
                        <Table.Cell>{"Maria Zambrano <maria@recruitment.com>"}</Table.Cell>
                        <Table.Cell>11/07/2019</Table.Cell>
                        <Table.Cell>Interview / Group dynamics / Test</Table.Cell>
                        <Table.Cell>https://www.linkedin.com/jobs/view/1331562981/</Table.Cell>
                        <Table.Cell>Madrid</Table.Cell>
                        <Table.Cell>28/07/2019</Table.Cell>
                    </Table.Row>
                </Table.Body>

                <Table.Footer fullWidth>
                    <Table.Row>
                        <Table.HeaderCell />
                        <Table.HeaderCell colSpan="4">
                            <Button floated="right" labelPosition primary size="small">
                                <Icon name="user" /> Add User
                            </Button>
                            <Button size="small">Approve</Button>
                            <Button disabled size="small">
                                Approve All
                            </Button>
                        </Table.HeaderCell>
                    </Table.Row>
                </Table.Footer>
            </Table>
        )
    }
}

Track.propTypes = {
    company: PropTypes.string,
    status: PropTypes.array,
    contact: PropTypes.string,
    stage: PropTypes.array,
    appliction: PropTypes.string,
    location: PropTypes.string,
}

TrackingTable.propTypes = {
    trackerData: PropTypes.arrayOf(PropTypes.string),
    stages: PropTypes.array,
    columns: PropTypes.arrayOf(PropTypes.string)

}


export default TrackingTable