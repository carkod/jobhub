/* eslint-disable */
import React, { Component } from "react";

class PD extends Component {
  render() {
    const { persdetails } = this.props;

    return (
      <section id="details">
        <h2 className="ui dividing header">Personal Details</h2>
        <div className="u-standard-grid">
            {persdetails.name ? (
              <div id="firstname">
                <p>
                  <strong>
                    <span className="label">First name: </span>
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
                  <span className="label">Surname: </span>
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
                  <span className="label">Phone: </span>
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
                  <span className="label">Address: </span>
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
                  <span className="label">Post Code: </span>
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
                  <span className="label">City: </span>
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
                  <span className="label">Country: </span>
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
                  <span className="label">Nationality: </span>
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
                  <span className="label">Date of Birth: </span>
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
                  <span className="label">Passport: </span>
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
                  <span className="label">Place of Birth: </span>
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
