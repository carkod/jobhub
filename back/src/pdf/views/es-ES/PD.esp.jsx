/* eslint-disable */
import React, { Component } from "react";

class PD extends Component {
  render() {
    const { persdetails } = this.props;

    return (
      <section id="details">
        <h2 className="ui dividing header">Datos personales</h2>
        <div className="u-standard-grid">
            {persdetails.name ? (
              <div id="firstname">
                <p>
                  <strong>
                    <span className="label">Nombre: </span>
                  </strong>
                  {persdetails.name}
                  </p>
              </div>
            ) : (
              ""
            )}

            {persdetails.lastname ? (
              <div id="lastname">
                <p>
                <strong>
                  <span className="label">Apellidos: </span>
                </strong>
                {persdetails.lastname}
                </p>
              </div>
            ) : (
              ""
            )}

            {persdetails.email ? (
              <div id="email">
                <p><strong>
                  <span className="label">Email: </span>
                </strong>
                {persdetails.email}
                </p>
              </div>
            ) : (
              ""
            )}

            {persdetails.phone ? (
              <div id="phone">
                <p><strong>
                  <span className="label">Teléfono: </span>
                </strong>
                {persdetails.phone}
                </p>
              </div>
            ) : (
              ""
            )}
            {persdetails.address ? (
              <div id="address">
                <p><strong>
                  <span className="label">Domicilio: </span>
                </strong>
                {persdetails.address}
                </p>
              </div>
            ) : (
              ""
            )}

            {persdetails.PC ? (
              <div id="postcode">
                <p><strong>
                  <span className="label">Código Postal: </span>
                </strong>
                {persdetails.PC}
                </p>
              </div>
            ) : (
              ""
            )}

            {persdetails.city ? (
              <div id="city">
                <p><strong>
                  <span className="label">Población: </span>
                </strong>
                {persdetails.city}
                </p>
              </div>
            ) : (
              ""
            )}

            {persdetails.country ? (
              <div id="country">
                <p><strong>
                  <span className="label">País: </span>
                </strong>
                {persdetails.country}
                </p>
              </div>
            ) : (
              ""
            )}

            {persdetails.nationality ? (
              <div id="nationality">
                <p><strong>
                  <span className="label">Nacionalidad: </span>
                </strong>
                {persdetails.nationality}
                </p>
              </div>
            ) : (
              ""
            )}

            {persdetails.DoB ? (
              <div id="dob" >
                <p><strong>
                  <span className="label">Fecha de Nacimiento: </span>
                </strong>
                {persdetails.DoB}
                </p>
              </div>
            ) : (
              ""
            )}

            {persdetails.ID ? (
              <div id="passport">
                <p><strong>
                  <span className="label">Pasaporte: </span>
                </strong>
                {persdetails.ID}
                </p>
              </div>
            ) : (
              ""
            )}

            {persdetails.PoB ? (
              <div id="pob">
                <p><strong>
                  <span className="label">Lugar de Nacimiento: </span>
                </strong>
                {persdetails.PoB}
                </p>
              </div>
            ) : (
              ""
            )}
          {/* { persdetails.photo && <div className="photo four wide column">{persdetails.photo}</div> } */}
        </div>
      </section>
    );
  }
}

export default PD;
