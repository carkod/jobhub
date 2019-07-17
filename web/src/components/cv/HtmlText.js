/* eslint-disable */

import React, { Component } from 'react';
import ReactHtmlParser from 'react-html-parser'

class HtmlText extends Component {
    constructor(props) {
        super(props);
    }

    componentWillReceiveProps = (props) => {
        const { text } = props;
    }

    render() {
        return (
            <div className="rte-text">
                {ReactHtmlParser(this.props.text)}
                {/* <Editor editorState={blocksFromHTML} readOnly={true} /> */}
            </div>
        )
    }


}

export default HtmlText;