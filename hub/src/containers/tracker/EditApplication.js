/* eslint-disable */

import moment from 'moment';
import React, { Component } from 'react';
import update from 'react-addons-update';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, Checkbox, Divider, Form, Header, Icon } from 'semantic-ui-react';
import { addNotification, saveApplication, uploadFile, fetchApplication } from '../../actions/tracker';
import Editor from '../../components/Editor';
import AddNewApplicationConfig from './AddNewApplication.config';
import { status as statusOptions } from './Tracker.data';


class EditApplication extends Component {

	constructor(props) {
		super(props)
		this.applicationModel = new AddNewApplicationConfig()
		const { id } = this.props.match.params
		this.state = {
			_id: id,
			status: {
				value: 0,
				text: 'Applied',
			},
			company: '',
			role: 'Front End Developer',
			salary: '',
			applicationUrl: '',
			location: '',
			contacts: this.applicationModel.emptyContact,
			stages: this.applicationModel.emptyStages,
			files: [""],
			description: '',

		}
	}

	componentDidMount() {
		const { id } = this.props.match.params
		this.props.fetchApplication(id)
	}

	componentWillReceiveProps(nextProps) {
		console.log('component will receive', nextProps)
		const newObj = this.applicationModel.fillInApplicationModel(nextProps.application)
		this.setState(newObj)
	}

	inputChange = (e) => {
		this.setState({ [e.target.name]: e.target.value })
	}

	descChange = (e) => {
		this.setState({ description: e.toString('html') });
	}

	addNewStage = () => {
		const oldStages = Object.assign([], this.state.stages)
		this.setState({
			stages: oldStages.concat(this.applicationModel.emptyStages)
		})
	}

	addNewContact = () => {
		const newData = this.state.contacts.concat(this.applicationModel.emptyContact)
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

		this.setState({
			company: '',
			status: {
				text: '',
				value: 0
			},
			role: '',
			salary: '',
			applicationUrl: '',
			location: '',
			contacts: this.applicationModel.emptyContact,
			stages: this.applicationModel.emptyStages,
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

		const { company, status, role, salary, applicationUrl, stages, files, description, location, contacts } = this.state
		console.log('render', this.state)

		return (
			<div id="new-application">
				<h1>View and Edit application {backBtn}</h1>
				<Form className="addNew-modal" onSubmit={this.handleSubmit}>
					<Form.Group widths='equal'>
						<Form.Input value={company} fluid name='company' placeholder='Company name' required onChange={this.inputChange} />
						<Form.Dropdown value={status.value} fluid selection options={statusOptions} placeholder='Select application status' required onChange={this.statusChange} />
						<Form.Input value={role} fluid name='role' placeholder='Role' onChange={this.inputChange} />
						<Form.Input value={salary} fluid name='salary' placeholder='Salary' onChange={this.inputChange} />
					</Form.Group>

					<Form.Group widths='equal'>
						<Form.Input value={applicationUrl} type='text' fluid name='applicationUrl' placeholder='Application url' />
						<Form.Input value={location} fluid name='location' placeholder='Location' onChange={this.inputChange} />
					</Form.Group>

					<br />
					<Divider horizontal>
						<Header as='h3'>
							Contacts
						<button type="button" className="btn"><Icon name='plus square' onClick={this.addNewContact} /></button>
						</Header>
					</Divider>
					<br />

					{contacts.map((contact, i) =>
						<Form.Group key={i}>
							<Form.Input width={'5'} fluid label='Contact name' name='contactName' placeholder='Contact name' value={contacts[i].contactName} onChange={this.contactInputChange(i)} />
							<Form.Input width={'5'} fluid label='Contact email' name='contactEmail' placeholder='Contact email' value={contacts[i].contactEmail} onChange={this.contactInputChange(i)} />
							<Form.Input width={'6'} fluid label='Contact phone' name='contactPhone' placeholder='Contact phone' value={contacts[i].contactPhone} onChange={this.contactInputChange(i)} />
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

					{stages.map((stage, i) =>
						<Form.Group key={i}>
							<Form.Input width={'1'} fluid label='Order' name='order' type='number' value={stages[i].order} onChange={this.stagesInputChange(i)} />
							<Form.Field width={'1'}>
								<label>Completed?</label>
								<Checkbox toggle checked={stages[i].completed} onChange={this.stagesInputChange(i)}></Checkbox>
							</Form.Field>

							<Form.Input width={'3'} fluid label='Action' name='action' placeholder='Action' value={stages[i].action} onChange={this.stagesInputChange(i)} />
							<Form.Input width={'4'} fluid label='Type' name='dept' placeholder='Type' value={stages[i].dept} onChange={this.stagesInputChange(i)} />
							<Form.Input width={'3'} fluid label='Start date' name='startDate' value={moment().format('DD MMMM YYYY')} value={stages[i].startDate} onChange={this.stagesInputChange(i)} />
							<Form.Input width={'3'} fluid label='End date' name='endDate' disabled value={stages[i].endDate} onChange={this.stagesInputChange(i)} />
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

					{files.map((file, i) =>
						<Form.Group key={i} widths='equal'>
							<Form.Input fluid label='File name' name='fileName' value={files[i].fileName} onChange={this.fileInputChange(i)} />
							<Form.Input fluid label='File url' name='fileUrl' value={files[i].fileUrl} onChange={this.fileInputChange(i)} />
							{removeFileBtn(i)}
						</Form.Group>
					)}

					<br />
					<Divider />
					<br />

					<h3>Job description</h3>
					<Editor value={description} onChange={this.descChange} />

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

function mapStateToProps(state) {
	console.log(state.applicationDetail.data)
	return {
		application: state.applicationDetail.data
	}
}

export default connect(mapStateToProps, { uploadFile, addNotification, saveApplication, fetchApplication })(EditApplication);