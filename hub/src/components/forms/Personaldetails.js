/* eslint-disable */
import React from 'react'
import { connect } from 'react-redux';
import { Field, reduxForm, formValueSelector } from 'redux-form'

let PersDetails = props => {
  const { name, surname } =  props;
  return (
    <div id="persdetails">
      <div>
        <label>Name</label>
        <div>
          <Field name="name" component="input" type="text" placeholder="First Name" />
        </div>
      </div>
      <div>
        <label>Surname</label>
        <div>
          <Field name="surname" component="input"type="text" placeholder="Last Name"/>
        </div>
      </div>
    </div>
  )
}

const selector = formValueSelector('persdetails');

const mapStateToProps = (state) => {
    return selector(state, 'name', 'surname')
}

PersDetails = reduxForm({ form: 'persdetails' })(PersDetails)

export default connect(mapStateToProps)(PersDetails);