import React, { Component } from 'react';
import { Grid, Header, Icon } from 'semantic-ui-react';
import shortid from 'shortid';

class ItSkills extends Component {

  constructor(props) {
    super(props);
    this.state = {
      toggle: false,
    }
  }

  componentDidMount = () => {
    this.setState({ itSkills: this.props.itSkills })
  }

  componentDidUpdate = (props) => {
    if (this.props.itSkills !== props.itSkills) this.setState({ itSkills: this.props.itSkills })
  }

  pushSkill = (e) => {
    e.preventDefault();
    const { itSkills } = this.state;
    const id = 'itSkill-' + shortid.generate();
    const newLang = {
      id: id,
      name: '',
      level: '',
      desc: '',
    }
    itSkills.push(newLang)
    this.setState({ itSkills });
  }

  removeSkill = (i) => (e) => {
    e.preventDefault();
    const { itSkills } = this.state;
    itSkills.splice(i, 1)
    this.setState({ itSkills })
  }


  handleChange = (i) => (e) => {
    const { itSkills } = this.state;
    itSkills[i][e.target.name] = e.target.value;
    this.setState({ itSkills })
    this.timeout = setTimeout(() => this.props.update({ itSkills }), 1000)
  }

  render() {
    const { itSkills } = !!Object.keys(this.state).length ? this.state : this.props;
    return (
      <div className="itSkills section">
        <Header sub className="u-space-between u-align-baseline">
          <div>
            <span>IT skills</span>
            <button className="btn" onClick={this.pushSkill}><Icon className="green" name="add square"></Icon></button>
            </div>
          <div>
            <button className="btn" type="button" onClick={() => this.setState({ toggle: !this.state.toggle})}>
              <Icon className="blue large" fitted name='caret square down' />
            </button>
          </div>
        </Header>

        {this.state.toggle && itSkills ? itSkills.map((it, i) =>
          <div className="single" key={it.id}>
            <button className="btn btn-close-repeat" onClick={this.removeSkill(i)}>
              <Icon className="red large" name="window close" ></Icon>
            </button>
            <Grid columns={12}>
              <Grid.Row columns={2}>
                <Grid.Column>
                  <Grid.Row>
                    <Grid.Column >
                      <label>Name </label>
                      <input type="text" name="name" onChange={this.handleChange(i)} value={it.name} />
                    </Grid.Column>
                  </Grid.Row>
                  <Grid.Row>
                    <Grid.Column className="pos-bottom">
                      <label>Level </label>
                      <input type="text" name="level" onChange={this.handleChange(i)} value={it.level} />
                    </Grid.Column>
                  </Grid.Row>
                </Grid.Column>

                <Grid.Column>
                  <label>Brief description </label>
                  <textarea style={{ width: '100%' }} rows="5" type="text" name="desc" onChange={this.handleChange(i)} value={it.desc} />
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </div>
        ) : ""}
      </div>
    );

  }

}


export default ItSkills;