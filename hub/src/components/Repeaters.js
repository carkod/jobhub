/* eslint-disable */

import React, { Component } from 'react';
//import Detail from './components/Detail';
import { Field, Button, Checkbox, Form, Input, Radio, Select, TextArea, Header, Divider, Grid, Icon } from 'semantic-ui-react';


const WorkRepeater = (props) => {
  
  
  return(
    <div className="workRepeater">
      {props.fields.map((work, i) =>
        <div id={work.id} className="item" key={i} >
            { i > 0 ? <Button onClick={(e) => props.removeWork(e, work)} icon inverted><Icon className="red" name="window close" ></Icon></Button> : ''}
            
            <label>Date</label>
            <input type="text" name="date" onChange={(e) => props.onChange(e, work)} /> 
            
            <label>Position</label>
            <input type="text" name="position" onChange={(e) => props.onChange(e, work)} /> 
            
        </div>  
      )}
    </div>
    )

    
}



const EducRepeater = () => {
    
}

export { WorkRepeater, EducRepeater }