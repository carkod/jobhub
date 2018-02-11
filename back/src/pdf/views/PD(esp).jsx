/* eslint-disable */
import React, { Component } from 'react';

class PD extends Component {
  
  
  render() {
    const {persdetails} = this.props;
    
    return (
      <section id="details">
      <h2 className="ui dividing header">Datos personales</h2>
        <div className="ui grid">
          <div className="text twelve wide column">
          <div className="ui two column grid">
            {persdetails.name ? <div id="firstname" className="field two column wide"><strong><span className="label">Nombre: </span></strong>{persdetails.name}</div> : ''}
            
            {persdetails.lastname ? <div id="lastname" className="field two column wide"><strong><span className="label">Apellidos: </span></strong>{persdetails.lastname}</div> : ''}
            
            {persdetails.email ? <div id="email" className="field two column wide"><strong><span className="label">Email: </span></strong>{persdetails.email}</div> : ''}
            
            {persdetails.phone ? <div id="phone" className="field two column wide"><strong><span className="label">Tlf: </span></strong>{persdetails.phone}</div> : ''}
            
            {persdetails.address ? <div id="address" className="field two column wide"><strong><span className="label">Domicilio: </span></strong>{persdetails.address}</div> : ''}
            
            {persdetails.PC ? <div id="postcode" className="field two column wide"><strong><span className="label">Código Postal: </span></strong>{persdetails.PC}</div> : ''}
            
            {persdetails.city ? <div id="city" className="field two column wide"><strong><span className="label">Ciudad: </span></strong>{persdetails.city}</div> : ''}
            
            {persdetails.country ? <div id="country" className="field two column wide"><strong><span className="label">País: </span></strong>{persdetails.country}</div> : ''}
            
            
            {persdetails.nationality ? <div id="nationality" className="field two column wide"><strong><span className="label">Nacionalidad: </span></strong>{persdetails.nationality}</div> : ''}
            
            {persdetails.DoB ? <div id="dob" className="additional field two column wide"><strong><span className="label">Fecha de Nacimiento: </span></strong>{persdetails.DoB}</div> : ''}
            
            {persdetails.ID ? <div id="passport" className="additional field two column wide"><strong><span className="label">DNI: </span></strong>{persdetails.ID}</div> : ''}
            
            {persdetails.PoB ? <div id="pob" className="additional field two column wide"><strong><span className="label">Lugar de Nacimiento: </span></strong>{persdetails.PoB}</div> : ''}
            
            </div>
          </div>
          <div className="photo four wide column">{persdetails.photo}</div>  
      </div>
    </section>
    );
  }
}


export default PD;