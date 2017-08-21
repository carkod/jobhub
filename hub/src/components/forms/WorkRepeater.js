import React from 'react';
import { Field, FieldArray, reduxForm, input, select, textarea } from 'redux-form';


const renderWork = ({ fields }) => (
  <div className="workItem">
  <button type="button" onClick={() => fields.push({})}>New Work Experience</button>
    {fields.map((work, index) =>
      <div key={index} className="workFields">
        <button type="button" title="Remove Member" onClick={() => fields.remove(index)}/>
        <h4>Job {index + 1}</h4>
        
        <label>Date</label>
        <Field name={`${work}.date`} type="text" placeholder="Date" component={input}/>
        
        
        <label>Position</label>  
        <Field name={`${work}.position`} type="text" placeholder="Position" component={input}/>
        </div>
    )}
  </div>
)

let WorkRepeater = props => {
  const { fields, onChange } = props;
  return (
      <FieldArray name="work" component={renderWork} onChange={onChange}/>
  )
}

export default reduxForm({ form: 'workForm' })(WorkRepeater)
