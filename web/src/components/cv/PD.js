/* eslint-disable */

import React, { Component } from 'react';
import {Helmet} from "react-helmet";

class PD extends Component {
    
    constructor(props) {
    super(props);
    this.state = {
    };
    
  }

  componentDidMount = () => {
  }
  
  componentWillReceiveProps = (props) => {
    const {persdetails} = props;
    this.setState({ persdetails })
  }
  
  render() {
    const {persdetails} = !!Object.keys(this.state).length ? this.state : this.props;
    
    return (
      <section id="details">
      <h2 className="ui dividing header">Personal Details</h2>
        <div className="ui grid">
          <div className="text twelve wide column">
          <div className="ui two column grid">
            <div className="field column"><strong><span className="label">First name: </span></strong>{persdetails.name}</div>
            <div className="field column"><strong><span className="label">Last name: </span></strong>{persdetails.lastname}</div>
            <div className="field two column wide"><strong><span className="label">Nationality: </span></strong>{persdetails.nationality}</div>
            <div className="field two column wide"><strong><span className="label">Address: </span></strong>{persdetails.address}</div>
            <div className="field two column wide"><strong><span className="label">Date of Birth: </span></strong>{persdetails.DoB}</div>
            <div className="field two column wide"><strong><span className="label">Passport: </span></strong>{persdetails.ID}</div>
            <div className="field two column wide"><strong><span className="label">PostCode: </span></strong>{persdetails.PC}</div>
            <div className="field two column wide"><strong><span className="label">City: </span></strong>{persdetails.city}</div>
            <div className="field two column wide"><strong><span className="label">Country: </span></strong>{persdetails.country}</div>
            <div className="field two column wide"><strong><span className="label">Email: </span></strong>{persdetails.email}</div>
            <div className="field two column wide"><strong><span className="label">Nationality: </span></strong>{persdetails.nationality}</div>
            <div className="field two column wide"><strong><span className="label">Phone: </span></strong>{persdetails.phone}</div>
            <div className="field two column wide"><strong><span className="label">Date of Birth: </span></strong>{persdetails.DoB}</div>
          </div>
          </div>
          <div className="photo four wide column">{persdetails.photo}</div>  
      </div>
    </section>
    );
  }
}


export default PD;