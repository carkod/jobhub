/* eslint-disable */

import React, { Component } from 'react';
import {Helmet} from "react-helmet";

class Work extends Component {
    
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
                
        <p className="details">First name: {persdetails.name}</p>
        <p className="details">Last name: {persdetails.lastname}</p>
        <p className="details">Nationality: {persdetails.nationality}</p>
        <p className="details">Address: {persdetails.address}</p>
        <p className="details">Date of Birth: {persdetails.DoB}</p>
        <p>Passport:{persdetails.ID}</p>
        <p>PostCode:{persdetails.PC}</p>
        <p>City:{persdetails.city}</p>
        <p>Country:{persdetails.country}</p>
        <p>Email:{persdetails.email}</p>
        <p>Nationality:{persdetails.nationality}</p>
        <p>Phone:{persdetails.phone}</p>
        <p>Date of Birth:{persdetails.DoB}</p>
                
    </section>
    );
  }
}


export default Work;