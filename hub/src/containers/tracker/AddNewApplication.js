/* eslint-disable */

import moment from 'moment';
import React, { Component } from 'react';
import update from 'react-addons-update';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, Checkbox, Divider, Form, Header, Icon } from 'semantic-ui-react';
import { addNotification, saveApplication, uploadFile } from '../../actions/tracker';
import Editor from '../../components/Editor';
import AddNewApplicationConfig from './AddNewApplication.config';
import { status } from './Tracker.data';


class AddNewApplication extends Component {

	constructor(props) {
		super(props)
		this.contacts = new AddNewApplicationConfig()
		this.state = {
			status: {
				value: 0,
				text: 'Applied',
			},
			company: '',
			role: 'Front End Developer',
			salary: '',
			applicationUrl: '',
			location: '',
			contacts: this.contacts.emptyContact,
			stages: this.contacts.emptyStages,
			files: [""],
			description: '',

		}
	}

	componentDidMount() {
	}


	inputChange = (e) => {
		this.setState({ [e.target.name]: e.target.value })
	}

	// handleSubmit = () => {
	// 	console.log(this.state)
	// }

	descChange = (e) => {
		this.setState({ description: e.toString('html') });
	}

	addNewStage = () => {
		const oldStages = Object.assign([], this.state.stages)
		this.setState({
			stages: oldStages.concat(this.contacts.emptyStages)
		})
	}

	addNewContact = () => {
		const newData = this.state.contacts.concat(this.contacts.emptyContact)
		this.setState({ contacts: newData })

	}

	statusChange = (e, data) => {
		const findObj = status.find(x => x.key === data.value)
		this.setState({ status: findObj })
	}

	stagesInputChange = i => e => {
		const { name, value } = e.target;
		const newData = update(this.state.stages,
			{ [i]: { [name]: { $set: value } } }
		)
		this.setState({ stages: newData })
	}

	contactInputChange = i => e => {
		const { name, value } = e.target;
		const newData = update(this.state.contacts,
			{ [i]: { [name]: { $set: value } } }
		)
		this.setState({ contacts: newData })
	}

	fileInputChange = i => e => {
		const { name, value } = e.target;
		const newData = update(this.state.contacts,
			{ [i]: { [name]: { $set: value } } }
		)
		this.setState({ contacts: newData })
	}

	removeStage = i => e => {
		const oldData = this.state.stages.slice(0, i)
		this.setState({
			stages: [...oldData]
		})
	}

	removeContact = i => e => {
		const oldData = this.state.contacts.slice(0, i)
		this.setState({
			contacts: [...oldData]
		})
	}

	removeFile = i => e => {
		const oldData = this.state.files.slice(0, i)
		this.setState({
			files: [...oldData]
		})
	}

	resetForm() {
		const contact = {
			contactName: '',
			contactEmail: '',
			contactPhone: ''
		}
		this.setState({
			company: '',
			status: {
				text: '',
				value: 0
			},
			role: '',
			salary: '',
			contacts: this.contacts.emptyContact,
			stages: this.contacts.emptyStages,
			files: [''],
			description: '',
		})
	}

	onSave = () => {
		this.props.saveApplication(this.state).then(res => {
			console.log('saved application', res);
		})
	}

	render() {
		const backBtn =
			<button className="btn__add-new" >
				<Link to={`/tracker`} >
					<Icon name='backward' color="green" />
				</Link>
			</button>

		
		const removeContactBtn = (i) => {
			return <Button type='button' onClick={this.removeContact(i)} width={'1'} className="btn">
				<Icon name='minus square' />
			</Button>
		}

		const removeStageBtn = (i) => {
			if (i > 0) {
				return <Button type='button' onClick={this.removeStage(i)} width={'1'} className="btn">
					<Icon name='minus square' />
				</Button>
			}
		}

		const removeFileBtn = (i) => {
			return <Button type='button' onClick={this.removeFile(i)} width={'1'} className="btn">
				<Icon name='minus square' />
			</Button>
		}

		return (
			<div id="new-application">
				<h1>New Application {backBtn}</h1>
				<Form className="addNew-modal" onSubmit={this.handleSubmit}>
					<Form.Group widths='equal'>
						<Form.Input fluid label='Company name' name='company' placeholder='Company name' required onChange={this.inputChange} />
						<Form.Dropdown fluid selection label='Status' options={status} placeholder='Select application status' required onChange={this.statusChange} />
						<Form.Input fluid name='role' label='Role' placeholder='Enter role' onChange={this.inputChange} />
						<Form.Input fluid name='salary' label='Salary' placeholder='Enter role salary' onChange={this.inputChange} />
					</Form.Group>

					<Form.Group widths='equal'>
						<Form.Input fluid label='Application url' name='applicationUrl' placeholder='Source website' onChange={this.inputChange} />
						<Form.Input fluid label='Location' name='location' placeholder='London' onChange={this.inputChange} />
					</Form.Group>

					<br />
					<Divider horizontal>
						<Header as='h3'>
							Contacts
						<button type="button" className="btn"><Icon name='plus square' onClick={this.addNewContact} /></button>
						</Header>
					</Divider>
					<br />

					{this.state.contacts.map((contact, i) =>
						<Form.Group key={i}>
							<Form.Input width={'5'} fluid label='Contact name' name='contactName' placeholder='Contact name' value={this.state.contacts[i].contactName} onChange={this.contactInputChange(i)} />
							<Form.Input width={'5'} fluid label='Contact email' name='contactEmail' placeholder='Contact email' value={this.state.contacts[i].contactEmail} onChange={this.contactInputChange(i)} />
							<Form.Input width={'6'} fluid label='Contact phone' name='contactPhone' placeholder='Contact phone' value={this.state.contacts[i].contactPhone} onChange={this.contactInputChange(i)} />
							{removeContactBtn(i)}
						</Form.Group>
					)}

					<br />
					<Divider horizontal>
						<Header as='h3'>
							Stages
						<button type="button" className="btn"><Icon name='plus square' onClick={this.addNewStage} /></button>
						</Header>
					</Divider>
					<br />

					{this.state.stages.map((stage, i) =>
						<Form.Group key={i}>
							<Form.Input width={'1'} fluid label='Order' name='order' type='number' value={this.state.stages[i].order} onChange={this.stagesInputChange(i)} />
							<Form.Field width={'1'}>
								<label>Completed?</label>
								<Checkbox toggle checked={this.state.stages[i].completed} onChange={this.stagesInputChange(i)}></Checkbox>
							</Form.Field>

							<Form.Input width={'3'} fluid label='Action' name='action' placeholder='Action' value={this.state.stages[i].action} onChange={this.stagesInputChange(i)} />
							<Form.Input width={'4'} fluid label='Type' name='dept' placeholder='Type' value={this.state.stages[i].dept} onChange={this.stagesInputChange(i)} />
							<Form.Input width={'3'} fluid label='Start date' name='startDate' value={moment().format('DD MMMM YYYY')} value={this.state.stages[i].startDate} onChange={this.stagesInputChange(i)} />
							<Form.Input width={'3'} fluid label='End date' name='endDate' disabled value={this.state.stages[i].endDate} onChange={this.stagesInputChange(i)} />
							{removeStageBtn(i)}
						</Form.Group>
					)}

<br />
					<Divider horizontal>
						<Header as='h3'>
							Files
						<button type="button" className="btn"><Icon name='plus square' onClick={this.addNewFile} /></button>
						</Header>
					</Divider>
					<br />

					{this.state.files.map((file, i) =>
						<Form.Group key={i} widths='equal'>
							<Form.Input fluid label='File name' name='fileName' value={this.state.files[i].fileName} onChange={this.fileInputChange(i)} />
							<Form.Input fluid label='File url' name='fileUrl' value={this.state.files[i].fileUrl} onChange={this.fileInputChange(i)} />
							{removeFileBtn(i)}
						</Form.Group>
					)}

					<br />
					<Divider />
					<br />

					<h3>Job description</h3>
					<Editor value={this.state.description} onChange={this.descChange} />

				</Form>

				<br />
				<Divider />
				<br />

				<Button form="newcv" type="submit" color='green' onClick={this.onSave}>
					<Icon name='save' /> Save
              </Button>
			</div>
		)
	}
}

function mapStateToProps(state, ownProps) {
	return {
		applications: state.applications
	}
}

export default connect(mapStateToProps, { uploadFile, addNotification, saveApplication })(AddNewApplication);