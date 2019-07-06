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
                <Grid.Column width={6}>
                    <label>Name </label>
                    <input name="name" type="text" onChange={props.onChange} value={persdetails.name} />  
                </Grid.Column>
                <Grid.Column width={5}>
                    <label>Surname </label>
                    <input name="lastname" type="text" onChange={props.onChange} value={persdetails.lastname} /> 
                </Grid.Column>
                <Grid.Column width={5}>
                    <label>Date of Birth </label>
                    <input name="DoB" type="text" onChange={props.onChange} value={persdetails.DoB} /> 
                </Grid.Column>
            </Grid.Row>
            <Grid.Row>
                <Grid.Column width={6}>
                    <label>Place of Birth </label>
                    <input name="PoB" type="text" onChange={props.onChange} value={persdetails.PoB} />  
                </Grid.Column>
                <Grid.Column width={5}>
                    <label>Nationality </label>
                    <input name="nationality" type="text" onChange={props.onChange} value={persdetails.nationality} /> 
                </Grid.Column>
                <Grid.Column width={5}>
                    <label>ID/Passport </label>
                    <input name="ID" type="text" onChange={props.onChange} value={persdetails.ID} /> 
                </Grid.Column>
            </Grid.Row>
            <Grid.Row>
                <Grid.Column width={6}>
                    <label>Address </label>
                    <input name="address" type="text" onChange={props.onChange} value={persdetails.address} size={30} />  
                </Grid.Column>
                <Grid.Column width={5}>
                    <label>PostCode </label>
                    <input name="PC" type="text" onChange={props.onChange} value={persdetails.PC} /> 
                </Grid.Column>
                <Grid.Column width={4}>
                    <label>City</label>
                    <input name="city" type="text" onChange={props.onChange} value={persdetails.city} /> 
                </Grid.Column>
            </Grid.Row>
            <Grid.Row>
                <Grid.Column width={6}>
                    <label>Country</label>
                    <input name="country" type="text" onChange={props.onChange} value={persdetails.country} /> 
                </Grid.Column>
                <Grid.Column width={5}>
                    <label>E-mail </label>
                    <input name="email" type="text" onChange={props.onChange} value={persdetails.email} /> 
                </Grid.Column>
                <Grid.Column width={5}>
                    <label>Phone No. </label>
                    <input name="phone" type="text" onChange={props.onChange} value={persdetails.phone} /> 
                </Grid.Column>
            </Grid.Row>
        </Grid>
    </div>
    )  
};

export default PD;