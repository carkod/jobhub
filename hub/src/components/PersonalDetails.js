/* eslint-disable */

import React, { Component } from 'react';
import { Field, Button, Checkbox, Form, Input, Radio, Select, TextArea, Header, Divider, Grid, Icon } from 'semantic-ui-react';

class PersonalDetails extends Component {

    constructor(props) {
    super(props);
    this.state = {};
   
  }

  componentDidMount = () => {
    this.setState({ persdetails: this.props.persdetails })
  }
  
  componentWillReceiveProps = (props) => {
    console.log(props)
    this.setState({ persdetails: props.persdetails })
  }
  
  handleChange = (e) => {
      const persdetails = Object.assign({}, this.state.persdetails, {
          [e.target.name]: e.target.value
      })
      this.setState({ persdetails })
      //this.props.update({ persdetails })
  }
    
    render() {
        
        const persdetails = this.state.persdetails || this.props.persdetails;
       console.log(this.props)
       if (persdetails === undefined) {
         return (
            <div className="personal"></div>
            )
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