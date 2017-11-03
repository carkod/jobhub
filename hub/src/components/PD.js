/* eslint-disable */

import React, { Component } from 'react';
//import { Field, Button, Checkbox, Form, Input, Radio, Select, TextArea, Header, Divider, Grid, Icon } from 'semantic-ui-react';

const PD = (props) => (  
    <div className="personal">
        <label>Name</label>
        <input name="name" type="text" onChange={props.onChange} value={props.persdetails.name} />  
        
        <label>Surname</label>
        <input name="lastname" type="text" onChange={props.onChange} value={props.persdetails.lastname} />  
    </div>
);

export default PD;