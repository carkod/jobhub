import React from 'react';
import { Dropdown, Header, Segment } from 'semantic-ui-react';
import { checkValue, formatDate } from "../utils";

const Metainfo = props => {

	return (
		<div id="metainfo" className="u-top-margin-title">
			<Header as='h1'>
				<input className="u-display-block" type="text" name="name" value={props.name} onChange={props.onChange} />
			</Header>
			<label htmlFor="navName">Navigation name:</label>
			<input type="text" name="navName" value={props.navName} onChange={props.onChange} />
			<div className="section">
				<Header sub>META</Header>
				<Segment.Group horizontal>
					<Segment><strong>Created</strong>: {formatDate(props.createdAt)}</Segment>
					<Segment><strong>Updated</strong>: {formatDate(props.updatedAt)}</Segment>
					<Segment><strong>PDF preview</strong>: {props.previewPdf}</Segment>
				</Segment.Group>
				<div className="u-space-between">
					{checkValue(props.locales) && <Dropdown onChange={props.onChange} name='locale' selection options={props.locales} value={props.meta.locale} />}

					{checkValue(props.statuses) && <Dropdown value={props.meta.status} onChange={props.onChange} name='status' selection options={props.statuses} />}

					{checkValue(props.positions) && <Dropdown value={props.meta.position} onChange={props.onChange} name='position' selection options={props.positions} />}
				</div>
			</div>
		</div>
	)

}

export default Metainfo;
