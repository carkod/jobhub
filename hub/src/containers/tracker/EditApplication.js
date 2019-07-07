/* eslint-disable */

import moment from 'moment';
import React, { Component } from 'react';
import { Button, Form, Header, Icon, Modal, Checkbox, Label } from 'semantic-ui-react';
import shortid from 'shortid';
import { addNotification, uploadFile, fetchApplications } from '../../actions/tracker';
import { stages, status } from './Tracker.data';
import Editor from '../../components/Editor';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';


const buttonDefaultStyles = {
	backgroundColor: '#fff',
	border: 'none',
	cursor: 'pointer',
	outline: 'none',
}

const emptyStages = [
	{ order: 0, completed: false, name: 'First contact', dept: 'Recruitment', startDate: new Date(), endDate: '' },
]

class EditApplication extends Component {

	constructor(props) {
		super(props)
		console.log(props)
		this.state = {
			description: '',
			stages: [],
		}
	}

	componentDidMount() {
		this.resetForm()
	}


	handleChange = (e) => {
		this.setState({ [e.target.name]: e.target.value })
	}

	handleSubmit = () => {
		console.log(this.state)
	}

	descChange = (e) => {
		console.log(e)
	}

	addNewStage = () => {
		const oldStages = Object.assign([], this.state.stages)
		this.setState({
			stages: oldStages.concat(emptyStages)
		})
	}

	stagesChange = (e, i) => {
		console.log(e, i)
	}

	removeStage = i => e => {
		const oldStages = this.state.stages
		console.log(oldStages.slice(0, i))
		// this.setState({
		// 	stages: oldStages.slice(0, this.state.stages.indexOf(i))
		// })
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
			status: 0,
			role: '',
			contact: Object.assign({}, this.state.contact, contact),
			stages: Object.assign([], this.state.stages, emptyStages),
			files: '',
			description: '',
		})
	}

	render() {

		const addNewButton =
			<button onClick={() => this.setState({ modalOpen: true })} style={buttonDefaultStyles} >
				<Icon name="plus square" color="green" />
			</button>;

		const title = this.state.editMode ? 'Edit appliaction' : 'New application';
		const stagesList = this.state.editMode ? this.props.stages : this.state.stages;

		return (
			<Modal trigger={addNewButton} size={'fullscreen'} open={this.state.modalOpen} onClose={() => this.setState({ modalOpen: false })} closeIcon style={{ left: "auto !important" }}>
				<Header icon='file text outline' content={title} />
				<Modal.Content>
					<Form className="addNew-modal" onSubmit={this.handleSubmit}>
						<Form.Group widths='equal'>
							<Form.Input fluid label='Company name' name='company' placeholder='Company name' required onChange={this.inputChange} />
							<Form.Select fluid label='Status' options={status} placeholder='Select application status' />
							<Form.Input fluid label='Role' placeholder='Enter role' onChange={this.inputChange} />
						</Form.Group>

						<Form.Group widths='equal'>

							<Form.Input fluid label='Contact name' name='contactName' placeholder='Contact name' onChange={this.inputChange} />
							<Form.Input fluid label='Contact email' name='contactEmail' placeholder='Contact email' onChange={this.inputChange} />
							<Form.Input fluid label='Contact phone' name='phone' placeholder='Contact phone' onChange={this.inputChange} />
						</Form.Group>

						<label>Stages <Button icon='plus' type='button' onClick={this.addNewStage} /></label>
						{stagesList.map((stage, i) =>
							<Form.Group key={i}>
								<Form.Input width={'1'} fluid label='Order' name='order' value={stage.order} onChange={this.inputChange} disabled />
								<Form.Field width={'1'}>
									<label>Completed?</label>
									<Checkbox toggle  checked={stage.completed} onChange={this.stagesChange(i)}></Checkbox>
								</Form.Field>
								
								<Form.Input width={'3'} fluid label='Action' name='action' placeholder='Action' value={stage.name} onChange={this.inputChange} />
								<Form.Input width={'4'} fluid label='Type' name='type' placeholder='Type' value={stage.dept} onChange={this.inputChange} />
								<Form.Input width={'3'} fluid label='Start date' name='startDate' value={moment().format('DD MMMM YYYY')} value={stage.startDate} onChange={this.inputChange} />
								<Form.Input width={'3'} fluid label='End date' name='endDate' disabled value={stage.endDate} onChange={this.inputChange} />
								<Button type='button' onClick={this.removeStage(i)} width={'1'}>
									<Icon name='minus' />
								</Button>
							</Form.Group>
						)}


						<Form.Group widths='equal'>
							<Form.Input fluid label='Location' name='location' placeholder='London' onChange={this.inputChange} />
							<Form.Field>
								<label>Files:</label>
								{/* {this.props.files.map(file => 
									<a href={file.url}>{file.name}</a>
								)} */}
							</Form.Field>
							<Button content="Choose File" labelPosition="left" icon="file" onClick={() => this.fileInputRef.current.click()} />
							<input ref={this.fileInputRef} type="file" hidden onChange={this.fileChange} />
						</Form.Group>
						<Editor value={this.state.description} onChange={this.descChange()} />

					</Form>
				</Modal.Content>
				<Modal.Actions>
					<Button form="newcv" type="submit" color='green'>
						<Icon name='save' /> Save
              </Button>
				</Modal.Actions>
			</Modal>
		)
	}
}

function mapStateToProps(state, ownProps) {
	return {
		applications: state.applications
	}
}

export default connect(mapStateToProps, { uploadFile, addNotification, fetchApplications })(EditApplication);