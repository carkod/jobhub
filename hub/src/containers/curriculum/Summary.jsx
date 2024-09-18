import React, { Component } from "react";
import { Grid, Header, Icon } from "semantic-ui-react";
import Editor from "../../components/Editor";

class Summary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toggle: true,
    };
  }

  onChange = (e) => {
    this.props.onChange(e);
  };

  render() {
    const { summary } = this.props;
    return (
      <div className="personal section">
        <div className="u-space-between u-align-baseline">
          <Header sub>SUMMARY AND PROFESSIONAL GOALS</Header>
          <button
            className="btn"
            type="button"
            onClick={() => this.setState({ toggle: !this.state.toggle })}
          >
            <Icon className="blue large" fitted name="caret square down" />
          </button>
        </div>
        {this.state.toggle && (
          <Grid>
            <Grid.Row>
              <Grid.Column width={16}>
                <Editor value={summary} onChange={this.onChange}/>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        )}
      </div>
    );
  }
}

export default Summary;
