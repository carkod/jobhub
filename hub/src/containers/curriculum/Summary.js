/* eslint-disable */

import React, { Component } from 'react';
import { Grid, Header, Checkbox } from 'semantic-ui-react';
import Editor from '../../components/Editor';

class Summary extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    
    onChange = (e) => {
        this.props.onChange(e.toString('html'));
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