/* eslint-disable */

import React, { Component } from 'react';
//import Detail from './components/Detail';
import { Field, Button, Checkbox, Form, Input, Radio, Select, TextArea, Header, Divider, Grid, Icon } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { fetchCVs, saveCV } from '../actions';

//import Preview from './Preview';

class Detail extends Component {
  
  state = {
    name: this.props.name ?  this.props.name : null,  
    workRepeat: ['workRepeat-0'],
  }

  
  componentDidMount = () => {
    this.props.fetchCVs();
    
  }
  
  componentWillReceiveProps = (nextProps) => {
     this.setState({
       name: nextProps.name,
     });
    }
  
  onChange = (e) => {
      this.setState({ 
        name: e.target.value
        
      });
    }
    
  onSubmit = (e) => {
    const name = this.state.name;
    
    this.props.saveCV({ name })
    
  }
  
  repeater = () => {
    const newField = 'workRepeat-' + this.state.workRepeat.length;
    this.setState({ workRepeat: this.state.workRepeat.concat([newField]) })
    console.log(this.state.workRepeat)
  }
  
  closeField = (field) => {
    this.setState({ workRepeat: this.state.workRepeat.splice( i, field) });
    console.log(field)
  }

  render() {
    return (
      <div id="detail" className="">
        <Header as="h1">This is Detail</Header>
        <p>Should use this page for editing CV</p>
        <p>Use List to add CV and come to this page</p>
        <div className="App-intro">
          <Form onSubmit={this.onSubmit}>
          <h4 className="ui header">Personal details</h4>
          <Divider />
            <Form.Group widths='equal'>
              <Form.Field id='form-input-control-first-name' control={Input} placeholder='Name' onChange={this.onChange} />
              <Form.Field id='form-input-control-surname' control={Input} placeholder='Surname' onChange={this.onChange} />
              <Form.Field id='form-input-control-dob' control={Input} placeholder='Date of Birth' onChange={this.onChange} />
              <Form.Field id='form-input-control-pob' control={Input} placeholder='Place of Birth' onChange={this.onChange} />
            </Form.Group>
            <Form.Group widths='equal'>
              <Form.Field id='form-input-control-nationality' control={Input} placeholder='Nationality' onChange={this.onChange} />
              <Form.Field id='form-input-control-address' control={Input} placeholder='Address' onChange={this.onChange} />
              <Form.Field id='form-input-control-postcode' control={Input} placeholder='Post Code' onChange={this.onChange} />
              <Form.Field id='form-input-control-phoneno' control={Input} placeholder='Phone number' onChange={this.onChange} />
            </Form.Group>
            <Form.Group widths='equal'>
              <Form.Field id='form-input-control-dni' control={Input} placeholder='DNI' />
              <Form.Field id='form-input-control-passport' control={Input} placeholder='Passport' />
              <Form.Field id='form-input-control-email' control={Input} placeholder='E-mail' />
            </Form.Group>
            <Form.Field id='form-textarea-control-opinion' control={TextArea} placeholder='Summary and professional goals' />
            <Button type='submit'>Save</Button>
            
            <h4 className="ui header">Working Experience <Button onClick={this.repeater} icon inverted><Icon className="green" name="plus square"></Icon></Button></h4>
          <Divider />
            
            
            {this.state.workRepeat.map(field => {
            
            return (
                <div className="repeater" key={field} id={field}>
                  <Button onClick={this.closeField.bind(null, field)} icon inverted><Icon className="red" name="window close"></Icon></Button>
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
            })}
            
            {this.props.workRepeat}
            
            <Button type='submit'>Save</Button>
            
          </Form>
        </div>
      </div>
    );
  }
}

function mapStateToProps (state, ownProps) {
  return {
    cvs: state.cvs
  }
}


export default connect(mapStateToProps, { saveCV, fetchCVs })(Detail);
