import { ContentState, convertFromHTML, Editor, EditorState } from 'draft-js';
import React, { Component } from 'react';

export default class HtmlText extends Component {
	constructor(props) {
		super(props);
		const { text } = this.props;
		const convert = convertFromHTML(text)
		const state = ContentState.createFromBlockArray(
			convert.contentBlocks,
			convert.entityMap
		);

		this.state = {
			editorState: EditorState.createWithContent(state)
		};

	}

	componentDidUpdate = (props) => {
		if (this.props.text !== props.text) {
			const { text } = props;
			const convert = convertFromHTML(text);
			const content = ContentState.createFromBlockArray(convert.contentBlocks, convert.entityMap)
			this.setState({ editorState: EditorState.createWithContent(content) })
		}

	}

	render() {
		return (
			<div className="HtmlText">
				<Editor editorState={this.state.editorState} readOnly={true} />
			</div>
		)
	}


}
