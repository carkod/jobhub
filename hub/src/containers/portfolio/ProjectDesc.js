/* eslint-disable */

import React, { Component } from 'react';
import { Grid, Header } from 'semantic-ui-react';
import Editor from '../../components/Editor';

class ProjectDesc extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
        };
        //this.pdChange = this.pdChange.bind(this);
    }
   
    
    onChange = (e) => {
        this.props.onChange(e.toString('html'))
    }
  
    render() {
        const {desc} = this.props;
        return (
            <div className="personal section">
                <Header sub>DESCRIPTION</Header>
                
                <Grid>
                    <Grid.Row>
                        <Grid.Column width={16}>
                            <Editor value={desc} onChange={this.onChange}/>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </div>
        )  
    }
}

export default ProjectDesc;