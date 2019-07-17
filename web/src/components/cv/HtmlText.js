/* eslint-disable */

import { ContentState, convertFromHTML, Editor, EditorState } from 'draft-js';
import React, { Component } from 'react';

class HtmlText extends Component {
    constructor(props) {
        super(props);
    }
    
    componentWillReceiveProps = (props) => {
        const {text} = props;
    }

    render () {
        return (
            <div className="HtmlText">
              {this.props.text}
            </div>
        )    
    }
    
    
}

export default HtmlText;