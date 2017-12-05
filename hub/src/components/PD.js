/* eslint-disable */

import React, { Component } from 'react';
import { Field, Button, Checkbox, Form, Input, Radio, Select, TextArea, Header, Divider, Grid, Icon } from 'semantic-ui-react';

const PD = (props) => {
    const {persdetails} = props;
    //console.log(props)
  return (
    <div className="personal section">
        <Header sub>PERSONAL DETAILS</Header>
        
        <Grid>
            <Grid.Row>
                <Grid.Column width={8}>
                    <label>Name </label>
                    <input name="name" type="text" onChange={props.onChange} value={persdetails.name} />  
                </Grid.Column>
                <Grid.Column width={8}>
                    <label>Surname </label>
                    <input name="lastname" type="text" onChange={props.onChange} value={persdetails.lastname} /> 
                </Grid.Column>
            </Grid.Row>
        </Grid>
    </div>
    )  
};

export default PD;