/* eslint-disable */

import React, { Component } from 'react';
//import Detail from './components/Detail';
import { Field, Button, Checkbox, Form, Input, Radio, Select, TextArea, Header, Divider, Grid, Icon } from 'semantic-ui-react';

const WorkRepeater = field => {
    
    return(
    <div className="repeater" key={field} id={field}>
      <Button icon inverted><Icon className="red" name="window close"></Icon></Button>
      <Form.Group widths='equal'>
        <Form.Field id='form-input-control-first-name' control={Input} placeholder='Date' />
        <Form.Field id='form-input-control-surname' control={Input} placeholder='Company' />
      </Form.Group>
      <Grid columns={2}>
        <Grid.Row>
          <Grid.Column>
            <Form.Field id='form-input-control-nationality' control={Input} placeholder='Position'/>
            <Form.Field id='form-input-control-phoneno' control={Input} placeholder='Related Projects' />
          </Grid.Column>
          <Grid.Column>
            <Form.Field id='form-input-control-phoneno' control={TextArea} placeholder='Description'  />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
    )
}

const EducRepeater = () => {
    
}

export { WorkRepeater, EducRepeater }