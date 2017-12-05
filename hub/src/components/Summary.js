/* eslint-disable */

import React, { Component } from 'react';
import { Field, Button, Checkbox, Form, Input, Radio, Select, TextArea, Header, Divider, Grid, Icon } from 'semantic-ui-react';
import Editor from './Editor';
import RichTextEditor from 'react-rte';

class Summary extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
        };
        //this.pdChange = this.pdChange.bind(this);
    }
    
    componentDidMount = () => {
        /*const value = RichTextEditor.createValueFromString(this.props.summary.toString('html'), 'html');
        this.setState({ value: value })*/
    }
    
    componentWillReceiveProps = (props) => {
        //console.log(props)
        /*const {summary} = props;
        const value = RichTextEditor.createValueFromString(summary.toString('html'), 'html');
        this.setState({ value: value })*/
    }
    
    onChange = (e) => {
        this.props.onChange(e.toString('html'))
    }
  
    render() {
        const {summary} = this.props;
        return (
            <div className="personal section">
                <Header sub>SUMMARY AND PROFESSIONAL GOALS</Header>
                
                <Grid>
                    <Grid.Row>
                        <Grid.Column width={16}>
                            <Editor value={summary} onChange={this.onChange}/>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </div>
        )  
    }
}

export default Summary;