/* eslint-disable */

import React, { Component } from 'react';
import {Helmet} from "react-helmet";
import { connect } from 'react-redux';
import {stateToHTML} from 'draft-js-export-html';
import RichTextEditor from 'react-rte';
import {convertToRaw, convertFromHTML, ContentState, Editor, EditorState} from 'draft-js';

class HtmlText extends Component {
    constructor(props) {
    super(props);
    const {text} = this.props;
    const convert = convertFromHTML(text)
    const state = ContentState.createFromBlockArray(
      convert.contentBlocks,
      convert.entityMap
    );
    
    this.state = {
        editorState: EditorState.createWithContent(state)
    };
    
    }
    
    componentDidMount = () => {
        
    }
    
    componentWillReceiveProps = (props) => {
        const {text} = props;
        const convert = convertFromHTML(text);
        const content = ContentState.createFromBlockArray(convert.contentBlocks,convert.entityMap)
        this.setState({editorState: EditorState.createWithContent(content)})    
    }

    render () {
        return (
            <div className="HtmlText">
              <Editor editorState={this.state.editorState} readOnly={true}/>
            </div>
        )    
    }
    
    
}

export default HtmlText;