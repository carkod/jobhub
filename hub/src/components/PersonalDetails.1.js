/* eslint-disable */

import React, { Component } from 'react';
import { Field, Button, Checkbox, Form, Input, Radio, Select, TextArea, Header, Divider, Grid, Icon } from 'semantic-ui-react';

class PersonalDetails extends Component {

    
    render() {
        const {persdetails} = this.props;
        if (persdetails === undefined) {
            return (<div className="personal" />)
        } else {
            return (
            <div className="personal">
                <label>Name</label>
                <input name="name" type="text" onChange={this.handleChange} value={persdetails.name} />  
                
                <label>Surname</label>
                <input name="lastname" type="text" onChange={this.handleChange} value={persdetails.lastname} />  
            </div>
            )
        }
        
    }
}



export default PersonalDetails;