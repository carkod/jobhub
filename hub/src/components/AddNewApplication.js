/* eslint-disable */

import React, { Component } from 'react';
import { Button, Header, Icon, Modal, Form, Input } from 'semantic-ui-react';
import shortid from 'shortid';
import { roles, status, stages } from '../containers/tracker/Tracker.data'
import { uploadFile, addNotification } from '../actions/tracker'
import moment from 'moment';

const buttonDefaultStyles = {
	backgroundColor: '#fff',
	border: 'none',
	cursor: 'pointer',
	outline: 'none',
}


class AddNewApplication extends Component {

	constructor(props) {
		super(props)
		console.log(props)
		this.state = {
			savedID: null,
		}
	}


	handleChange = (e) => {
		this.setState({ [e.target.name]: e.target.value })
	}

	handleSubmit = () => {
		console.log(this.state)
	}

	handleChange = (e) => {
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

	render() {

		const addNewButton =
			<button onClick={() => this.setState({ modalOpen: true })} style={buttonDefaultStyles} >
				<Icon name="plus square" color="green" />
			</button>;

		const title = this.state.editMode ? 'Edit appliaction' : 'New application';

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

						<label>Contact details</label>
						<Form.Group widths='equal'>

							<Form.Input fluid label='Contact name' name='contactName' placeholder='Contact name' onChange={this.inputChange} />
							<Form.Input fluid label='Contact email' name='contactEmail' placeholder='Contact email' onChange={this.inputChange} />
							<Form.Input fluid label='Contact phone' name='phone' placeholder='Contact phone' onChange={this.inputChange} />
						</Form.Group>

						<label>Stages</label>
						{stages.map((stage, i) =>
							<Form.Group widths='equal' key={i}>
								<Form.Input fluid label='Order' name='Order' value={stage.order} onChange={this.inputChange} disabled />
								<Form.Input fluid label='Status name' name='statusName' placeholder='Action' value={stage.name} onChange={this.inputChange} />
								<Form.Input fluid label='Status department' name='statusDept' placeholder='Contact type' value={stage.dept} onChange={this.inputChange} />
								<Form.Input fluid label='Start date' name='startDate' value={moment().format('DD MMMM YYYY')} value={stage.startDate} onChange={this.inputChange} />
								<Form.Input fluid label='End date' name='endDate' disabled value={stage.endDate} onChange={this.inputChange} />
							</Form.Group>
						)}


						<label>Other details</label>
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

							<Form.Input fluid label='Description' name='description' placeholder='Comments' onChange={this.inputChange} />
						</Form.Group>

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
		cvs: state.cvs
	}
}

export default AddNewApplication;