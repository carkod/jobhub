/* eslint-disable */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, Button, Checkbox, Form, Input, Radio, Select, TextArea, Header, Divider, Grid, Icon } from 'semantic-ui-react';
import { syncPersdetails, retrieveCV, retrieveOne } from '../actions';

class PersonalDetails extends Component {
    
    
    handleChange = (e) => {
        this.props.update(e)
    }
    
    render() {
        return(
        <div className="personal">
            <label>Name</label>
            <input name="name" type="text" onChange={this.handleChange} value={this.props.persdetails.name} />  
            
            <label>Surname</label>
            <input name="lastname" type="text" onChange={this.handleChange} value={this.props.persdetails.lastname} />  
            
        </div>

        )
    }
}



export default PersonalDetails;