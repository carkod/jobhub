import React, { Component } from 'react';
import { Grid, Header, Icon } from 'semantic-ui-react';
import { skillsObjGenerator, webdevSkillObj } from '../../reducers/cv';

export default class WebdevSkills extends Component {

  constructor(props) {
    super(props);
    this.state = {
      toggle: false,
    };
  }

  componentDidMount = () => {
    this.setState({ webdevSkills: this.props.webdevSkills })
  }

  componentDidUpdate = (props) => {
    if (props.webdevSkills !== this.props.webdevSkills) this.setState({ webdevSkills: this.props.webdevSkills })
  }

  pushSkill = (e) => {
    e.preventDefault();
    const { webdevSkills } = this.state;
    webdevSkills.push(skillsObjGenerator("webdevSkill"))
    this.setState({ webdevSkills });
  }

  removeSkill = (i) => (e) => {
    e.preventDefault();
    const { webdevSkills } = this.state;
    webdevSkills.splice(i, 1)
    this.setState({ webdevSkills })
  }


  handleChange = (i) => (e) => {
    const { webdevSkills } = this.state;
    webdevSkills[i][e.target.name] = e.target.value;
    this.setState({ webdevSkills })
    this.timeout = setTimeout(() => this.props.update({ webdevSkills }), 1000)
  }

  render() {
    const { webdevSkills } = !!Object.keys(this.state).length ? this.state : this.props;
    return (
      <div className="webdevSkills section">
        <Header sub className="u-space-between u-align-baseline">
          <div>
            <span>Web Development skills</span>
            <button className="btn" onClick={this.pushSkill}><Icon className="green" name="add square"></Icon></button>
          </div>
          <div>
            <button className="btn" type="button" onClick={() => this.setState({ toggle: !this.state.toggle })}>
              <Icon className="blue large" fitted name='caret square down' />
            </button>
          </div>
        </Header>

        {this.state.toggle && webdevSkills ? webdevSkills.map((webdev, i) =>
          <div className="single" key={webdev.id}>
            <button className="btn btn-close-repeat" onClick={this.removeSkill(i)}>
              <Icon className="red large" name="window close" />
            </button>
            <Grid columns={12}>
              <Grid.Row columns={2}>
                <Grid.Column>
                  <Grid.Row>
                    <Grid.Column >
                      <label>Name </label>
                      <input type="text" name="name" onChange={this.handleChange(i)} value={webdev.name} />
                    </Grid.Column>
                  </Grid.Row>
                  <Grid.Row>
                    <Grid.Column className="pos-bottom">
                      <label>Level </label>
                      <input type="text" name="level" onChange={this.handleChange(i)} value={webdev.level} />
                    </Grid.Column>
                  </Grid.Row>
                </Grid.Column>

                <Grid.Column>
                  <label>Brief description </label>
                  <textarea style={{ width: '100%' }} rows="5" type="text" name="desc" onChange={this.handleChange(i)} value={webdev.desc} />
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </div>
        ) : ""}
      </div>
    );

  }

}
