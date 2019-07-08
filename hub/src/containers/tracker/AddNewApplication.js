/* eslint-disable */

import moment from 'moment';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, Checkbox, Divider, Form, Icon, Header } from 'semantic-ui-react';
import shortid from 'shortid';
import { addNotification, getApplications, uploadFile, saveApplication } from '../../actions/tracker';
import Editor from '../../components/Editor';
import { status } from './Tracker.data';
import update from 'react-addons-update';

const emptyStages = [
	{ order: 0, completed: false, action: 'First contact', dept: 'Recruitment', startDate: moment().format('DD MMMM YYYY'), endDate: '' },
]

const emptyContact = [
	{
		contactId: shortid.generate(),
		contactName: '',
		contactEmail: '',
		contactPhone: '',
	}
]

class AddNewApplication extends Component {

	constructor(props) {
		super(props)
		this.state = {
			company: '',
			role: 'Front End Developer',
			contacts: [{
				contactId: shortid.generate(),
				contactName: '',
				contactEmail: '',
				contactPhone: '',
			}],
			description: '',
			stages: emptyStages,
			status: {
				value: 0,
				name: 'Applied',
			}
		}
	}

	componentDidMount() {
		this.resetForm()
	}


	inputChange = (e) => {
		this.setState({ [e.target.name]: e.target.value })
	}

	handleSubmit = () => {
		console.log(this.state)
	}

	descChange = (e) => {
		this.setState({ description: e.toString('html') });
	}

	addNewStage = () => {
		const oldStages = Object.assign([], this.state.stages)
		this.setState({
			stages: oldStages.concat(emptyStages)
		})
	}

	addNewContact = () => {
		console.log(this.state.contacts)
		const oldData = Object.assign([], this.state.contacts)
		this.setState({
			contacts: oldData.concat(emptyContact)
		})
		console.log(this.state)
	}

	statusChange = (e) => {
		const { name, value } = e.target;
		const newData = update(this.state.status,
			{ name: { $set: name } },
			{ value: { $set: value } },
		)
		this.setState({ status: newData })
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

	stagesChange = (e, i) => {
		console.log(e, i)
	}

	removeStage = i => e => {
		const oldStages = this.state.stages.slice(0, i)
		this.setState({
			stages: [...oldStages]
		})
	}

	removeContact = i => e => {
		const oldStages = this.state.contacts.slice(0, i)
		this.setState({
			contacts: [...oldStages]
		})
	}

	handleFileChange = (e) => {
		let data = new FormData();
		data.append('fieldname', e.target.files[0]);
		this.data = data;
	}


	handleUpload = e => {
		e.preventDefault();
		const { documents } = this.state;
		const data = this.data;
		const parseSize = (bytes) => parseFloat(Math.round(bytes / 1024)).toFixed(2);
		if (this.fieldname === undefined || this.fieldname.files.length < 1) {

			addNotification({ type: 'NO_FILE' })
			//handle error no file uploaded
		} else {
			console.log('file found')
			//Loading icon
			this.setState({ uploading: true });

			uploadFile(data)
				.then(file => {
					addNotification({ type: 'UPLODED_FILE' })
					const newFile = {
						fileId: shortid.generate(),
						fileName: file.fieldname,
						fileSize: parseSize(file.size),
						fileDate: Date.now(),
						fileURL: file.url,
						fileRawName: file.originalname,
						fileDir: file.destination
					}
					documents.push(newFile);

					this.setState({ documents, uploading: false }, () => {
						this.props.onUpload({ documents });
					});

				})
		}

	}

	deleteDoc = (doc) => (e) => {
		e.preventDefault();
		const { documents } = this.state;
		removeFile(doc)
			.then(file => {
				const i = documents.findIndex(x => x.fileId === doc.fileId)
				documents.splice(i, 1);
				this.setState({ documents });
				this.props.onDeupload({ documents });
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
				name: '',
				value: 0
			},
			role: '',
			contact: [Object.assign({}, this.state.contact, contact)],
			stages: Object.assign([], this.state.stages, emptyStages),
			files: '',
			description: '',
		})
	}

	onSave = () => {
		console.log('saving...', this.state)
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

		return (
			<div id="new-application">
				<h1>New Application {backBtn}</h1>
				<Form className="addNew-modal" onSubmit={this.handleSubmit}>
					<Form.Group widths='equal'>
						<Form.Input fluid label='Company name' name='company' placeholder='Company name' required onChange={this.inputChange} />
						<Form.Select fluid label='Status' options={status} placeholder='Select application status' onChange={this.statusChange} />
						<Form.Input fluid label='Role' placeholder='Enter role' onChange={this.inputChange} />
						<Form.Input fluid label='Salary' placeholder='Enter role salary' onChange={this.inputChange} />
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
							<Form.Input width={'1'} fluid label='Order' name='order' value={this.state.stages[i].order} onChange={this.stagesInputChange(i)} />
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
					<Divider />
					<br />
					<Form.Group widths='equal'>

						<Form.Field>
							<label>Files:</label>
							{/* {this.props.files.map(file => 
									<a href={file.url}>{file.name}</a>
								)} */}
						</Form.Field>

						<Form.Field>
							<Button content="Choose File" labelPosition="left" icon="file" onClick={() => this.fileInputRef.current.click()} />
							<input ref={this.fileInputRef} type="file" hidden onChange={this.fileChange} />
						</Form.Field>
					</Form.Group>
					<label>Job description</label>
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