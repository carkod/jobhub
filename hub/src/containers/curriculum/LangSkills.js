/* eslint-disable */

import React, { Component } from 'react';
import { Grid, Header, Icon } from 'semantic-ui-react';
import shortid from 'shortid';

export default class LangSkills extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      toggle: false,
    };
  }

  componentDidMount = () => {
    this.setState({ langSkills: this.props.langSkills })
  }
  
  componentDidUpdate = (props) => {
    if (this.props.langSkills !== props.langSkills) this.setState({ langSkills: this.props.langSkills })
  }

  pushSkill = (e) => {
    e.preventDefault();
    const {langSkills} = this.state;
    const id = 'langSkill-' + shortid.generate();
    const newLang = {
      id: id, 
      name: '', 
      level:'',
      desc: '',
    }
    langSkills.push(newLang)
    this.setState({ langSkills });
  }
  
  removeSkill = (i) => (e) => {
    e.preventDefault();
    const {langSkills} = this.state;
    langSkills.splice(i,1)
    this.setState({ langSkills })
  }


  handleChange = (i) => (e) => {
    const {langSkills} = this.state;
    langSkills[i][e.target.name] = e.target.value;
    this.setState({ langSkills })
    this.timeout = setTimeout(() => this.props.update({langSkills}), 1000)    
  }
  
  render() {
    const {langSkills} = !!Object.keys(this.state).length ? this.state : this.props;
    return (
      <div className="langSkills section">
        <Header sub className="u-space-between u-align-baseline">
          <div>
            <span>Languages</span>
            <button className="btn" onClick={this.pushSkill}><Icon className="green" name="add square"></Icon></button>
          </div>
          <div>
            <button className="btn" type="button" onClick={() => this.setState({ toggle: !this.state.toggle})}>
              <Icon className="blue large" fitted name='caret square down' />
            </button>
          </div>
        </Header>

        {this.state.toggle && langSkills ? langSkills.map((lang, i) => 
          <div className="single" key={lang.id}>
            { i > 0 ? <button className="btn btn-close-repeat" onClick={this.removeSkill(i)}><Icon className="red large" name="window close" ></Icon></button> : ''}
            <Grid columns={12}>
              <Grid.Row columns={2}>
                <Grid.Column>
                  <Grid.Row>
                    <Grid.Column >
                      <label>Name </label>
                      <input type="text" name="name" onChange={this.handleChange(i)} value={lang.name}/> 
                    </Grid.Column>
                  </Grid.Row>
                  <Grid.Row>
                    <Grid.Column className="pos-bottom">
                      <label>Level </label>
                      <input type="text" name="level" onChange={this.handleChange(i)} value={lang.level}/> 
                    </Grid.Column>
                  </Grid.Row>
                </Grid.Column>
                
                <Grid.Column>
                <label>Brief description </label>
                  <textarea style={{width:'100%'}} rows="5" type="text" name="desc" onChange={this.handleChange(i)} value={lang.desc} />
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </div>
        ): ""}
        </div>
    );
  }
}
