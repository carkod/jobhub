import React from 'react';
import { Dropdown, Header, Segment } from 'semantic-ui-react';
import shortid from 'shortid';
// import {positions, languages} from '../Categories';
import { formatDate } from "../utils";

const Metainfo = props => {
	const { meta, categories } = props;
	let position = 'Select Position', language = 'Select Locale', status = 'Select Status';
	// const positions = props.categories.find(i => i.label === 'positions').children;
	// const languages = props.categories.find(i => i.label === 'locales').children;
	// const statuses = props.categories.find(i => i.label === 'statuses').children;

	// if (!!categories[0]._id && meta) {

	// 	const positionIndex = positions.findIndex(v => v.value.toLowerCase() === meta.cats.position.toLowerCase());
	// 	position = meta.cats.position && positionIndex !== -1 ? meta.cats.position.toLowerCase() : 'Select Position';

	// 	const languageIndex = languages.findIndex(v => v.value === meta.cats.locale);
	// 	language = !!meta.cats.locale && languageIndex !== -1 ? meta.cats.locale : 'Select Locale';

	// 	const statusIndex = statuses.findIndex(v => v.value === meta.cats.status);
	// 	status = meta.cats.status && statusIndex !== -1 ? meta.cats.status : 'Select Status';
	// }

	return (
		<div id="metainfo">
			<Header as='h1'>
				<input type="text" name="name" value={meta.name} onChange={props.name} />
				<Header.Subheader>{meta._id}</Header.Subheader>
			</Header>
			<div className="section">
				<Header sub>
					META
                </Header>
				<Segment.Group>
					<Segment.Group horizontal>
						<Segment><strong>Created</strong>: {formatDate(meta.createdAt)}</Segment>
						<Segment><strong>Updated</strong>: {formatDate(meta.updatedAt)}</Segment>
						<Segment><strong>Slug</strong>: {meta.slug}</Segment>
						<Segment><strong>PDF</strong>:
                        {meta.pdf !== undefined ? meta.pdf.map((el, i) =>
							<a key={shortid.generate()} href={el.link}>{'\u00A0' + el.name + '\u00A0'}</a>
						) : ''}
						</Segment>
					</Segment.Group>

					{/* {
						<Segment.Group horizontal>
							<Segment>
								<Dropdown placeholder={language} options={languages} value={language} onChange={props.onChange} name='locale' selection />
							</Segment>

							<Segment>
								<Dropdown placeholder={status} options={statuses} value={status} onChange={props.onChange} name='status' selection />
							</Segment>

							<Segment>
								<Dropdown placeholder={position} options={positions} value={position} onChange={props.onChange} name='position' selection />
							</Segment>
						</Segment.Group>
					} */}

				</Segment.Group>

			</div>
		</div>
	)

}

export default Metainfo;
