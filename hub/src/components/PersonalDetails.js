/* eslint-disable */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, Button, Checkbox, Form, Input, Radio, Select, TextArea, Header, Divider, Grid, Icon } from 'semantic-ui-react';
import { syncPersdetails, retrieveCV, retrieveOne } from '../actions';


/*if (!this.props.cvs) {
    name: this.props.cvs.persdetails.fields.name || '',
    lastname: this.props.cvs.persdetails.fields.lastname || '',
    
} else {
    name: '',
    lastname: '',
}*/
        


class PersonalDetails extends Component {
    
    state = {
        //name: this.props.cvs ? this.props.cvs.persdetails.fields.name : '',
        //lastname: this.props.cvs ? this.props.cvs.persdetails.fields.lastname : '',
    }
    
   
    componentDidMount = () => {
        //this.props.retrieveOne()
        console.log(this.state)
    }
    
    handleChange = (e) => {
        
        this.setState({ [e.target.name]: e.target.value })
        this.props.update(e)
        
    }
    
    render() {
        return(
        <div className="personal">
            <label>Name</label>
            <input name="name" type="text" onChange={this.handleChange} value={this.state.name || ''}/>  
            
            <label>Surname</label>
            <input name="lastname" type="text" onChange={this.handleChange} value={this.state.lastname || ''}/>  
            
        </div>

        )
    }
}



export default PersonalDetails;