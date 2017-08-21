/* eslint-disable */

import React, { Component } from 'react';
//import Detail from './components/Detail';
import { Field, Button, Checkbox, Form, Input, Radio, Select, TextArea, Header, Divider, Grid, Icon } from 'semantic-ui-react';

const WorkRepeater = (props) => {
  
  return(
    <div className="workRepeater">
      {props.fields.map((work, i) =>
        <div id={work} className="item" key={i} id={'work' + (i + 1)}>
            <Button onClick={(e) => props.removeWork(e, work)} icon inverted><Icon className="red" name="window close" data-id={work} ></Icon></Button>
            
            <label>Date</label>
            <input type="text" name="date" /> 
            
            <label>Position</label>
            <input type="text" name="position" /> 
            
        </div>  
      )}
    </div>
    )

    
}



const EducRepeater = () => {
    
}

export { WorkRepeater, EducRepeater }