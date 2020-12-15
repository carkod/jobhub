import React, { Component } from 'react';
import RichTextEditor from 'react-rte';
import { Grid, Header, Icon } from 'semantic-ui-react';
import shortid from 'shortid';
import Editor from '../../components/Editor';

class WorkRepeater extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      toggle: false,
    };
    
  }

  componentDidMount = () => {
    this.setState({ workExp: this.props.workExp })
  }
  
  componentDidUpdate = (props) => {
    if (this.props.workExp !== props.workExp) this.setState({ workExp: this.props.workExp })
  }
  

  pushExp = (e) => {
    e.preventDefault();
    const {workExp} = this.state;
    const id = 'workExp-' + shortid.generate();
    const newExp = {
      id: id, 
      date: '', 
      position:'',
      company:'',
      desc: RichTextEditor.createEmptyValue(),
    }
    workExp.unshift(newExp)
    this.setState({ workExp });
  }
  
  removeExp = (i) => (e) => {
    e.preventDefault();
    const {workExp} = this.state;
    workExp.splice(i,1)
    this.setState({ workExp })
  }
  
  descChange = (i) => (e) => {
    const {workExp} = this.state;
    workExp[i].desc = e.toString('html');
    this.setState({workExp});
    this.props.update({workExp});
  }


  handleChange = (i) => (e) => {
    const {workExp} = this.state;
    workExp[i][e.target.name] = e.target.value;
    this.setState({ workExp })
    this.timeout = setTimeout(() => this.props.update({workExp}), 1000)    
  }
  
  render() {
    const {workExp} = !!Object.keys(this.state).length ? this.state : this.props;
      return(
        <div className="workRepeater section">
            <Header sub className="u-space-between u-align-baseline">
              <div>
                <span>WORK EXPERIENCE</span>
                <button className="btn" onClick={this.pushExp}><Icon className="green" name="add square"></Icon></button>
              </div>
              <div>
                <button className="btn" type="button" onClick={() => this.setState({ toggle: !this.state.toggle})}>
                  <Icon className="blue large" fitted name='caret square down' />
                </button>
              </div>
            </Header>

            {this.state.toggle && workExp ? workExp.map((work, i) => 
                <div className="single" key={work.id}>
                { i > 0 ? <button className="btn btn-close-repeat" onClick={this.removeExp(i)}><Icon className="red large" name="window close" ></Icon></button> : ''}
                <Grid columns={12}>
                    <Grid.Row columns={3}>
                      <Grid.Column >
                        <label>Date </label>
                        <input type="text" name="date" onChange={this.handleChange(i)} value={work.date}/> 
                      </Grid.Column>
                      <Grid.Column >
                        <label>Position </label>
                        <input type="text" name="position" onChange={this.handleChange(i)} value={work.position}/> 
                      </Grid.Column>
                      <Grid.Column >
                        <label>Company </label>
                        <input type="text" name="company" onChange={this.handleChange(i)} value={work.company}/> 
                      </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                      <Grid.Column width={16}>
                        <div className="block">
                          <label>Description </label>
                          <br />
                          <Editor value={work.desc} onChange={this.descChange(i)} />
                        </div>
                      </Grid.Column>
                    </Grid.Row>
                  </Grid>
                </div>
              
            ) : ""}
        </div>
        
        )
      
  }
}

export default WorkRepeater;