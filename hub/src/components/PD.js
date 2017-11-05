/* eslint-disable */

import React, { Component } from 'react';
import { Field, Button, Checkbox, Form, Input, Radio, Select, TextArea, Header, Divider, Grid, Icon } from 'semantic-ui-react';

const PD = (props) => {
    const {persdetails} = props;
    //console.log(props)
  return (
    <div className="personal section">
        <Header sub>
            <span>PERSONAL DETAILS</span>
        </Header>
        <div className="block">
            <label>Name </label>
            <input name="name" type="text" onChange={props.onChange} value={persdetails.name} />  
            
            <label>Surname </label>
            <input name="lastname" type="text" onChange={props.onChange} value={persdetails.lastname} /> 
            
            
        </div>
    </div>
    )  
};

export default PD;