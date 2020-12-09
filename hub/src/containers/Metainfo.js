import React from 'react';
import { Dropdown, Header, Segment } from 'semantic-ui-react';
import shortid from 'shortid';
import { formatDate, checkValue } from "../utils";

const Metainfo = props => {
	

	return (
		<div id="metainfo" className="u-top-margin-title">
			<Header as='h1'>
				<input type="text" name="name" value={props.name} onChange={props.name} />
			</Header>
			<div className="section">
				<Header sub>META</Header>
				<Segment.Group horizontal>
					<Segment><strong>Created</strong>: {formatDate(props.createdAt)}</Segment>
					<Segment><strong>Updated</strong>: {formatDate(props.updatedAt)}</Segment>
					<Segment><strong>PDF</strong>:
							{props.pdf !== undefined ? props.pdf.map((el, i) =>
						<a key={shortid.generate()} href={el.link}>{'\u00A0' + el.name + '\u00A0'}</a>
					) : ''}
					</Segment>
				</Segment.Group>
							
							{ checkValue(props.locales) && <Dropdown onChange={props.onChange} name='locale' selection options={props.locales} value={props.meta.locale} /> }
				
							{ checkValue(props.statuses) && <Dropdown value={props.meta.status} onChange={props.onChange} name='status' selection options={props.statuses} /> }
				
							{ checkValue(props.positions) && <Dropdown value={props.meta.position} onChange={props.onChange} name='position' selection options={props.positions}/> }
			</div>
		</div>
	)

}

export default Metainfo;
