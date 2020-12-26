import React, { Component } from "react";
import ReactMarkdown from "react-markdown";
import { connect } from "react-redux";
import gfm from "remark-gfm";
import { Dropdown, Header, Segment, Button, Icon, TextArea } from "semantic-ui-react";


class Blog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      content: "",
      createdAt: "",
      updatedAt: "",
      categories: [],
      tags: [],
    };
  }

  componentDidMount = () => {
    const { id } = this.props.match.params.id;
    if (id) {
      // this.props.fetch();
    }

    // this.props.fetchRelationsApi();
  };

  componentDidUpdate = (props) => {};

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  onSubmit = (e) => {
    e.preventDefault();
    this.props.saveCvApi(this.state);
  };

  render() {
    return (
      <div id="blog">
        <form onSubmit={this.onSubmit}>
          <div id="metainfo" className="u-top-margin-title">
            <Header as="h1">
              <input
                className="u-display-block"
                type="text"
                name="name"
                onChange={this.handleChange}
              />
            </Header>
            <div className="section">
              <Header sub>META</Header>
              <Segment.Group horizontal>
                <Segment>
                  {/* <strong>Created</strong>: {formatDate(this.props.createdAt)} */}
                </Segment>
                <Segment>
                  {/* <strong>Updated</strong>: {formatDate(this.props.updatedAt)} */}
                </Segment>
              </Segment.Group>
              <div className="u-space-between">
                {/* {checkValue(props.locales) && <Dropdown onChange={this.handleChange} name='locale' selection options={props.locales} value={props.meta.locale} />}

					{checkValue(props.positions) && <Dropdown value={props.meta.position} onChange={this.handleChange} name='position' selection options={props.positions} />} */}
              </div>
            </div>
          </div>

          <div id="editor" className="u-basic-layout">
            <div className="write">
              <h2 className="title">Write</h2>
              <TextArea placeholder='Tell us more' rows={20} onChange={this.handleChange}/>
            </div>
            
            <div className="preview">
              <h2 className="title">Preview</h2>
              <div className="md-renderer">
                <ReactMarkdown
                plugins={[gfm]}
                children={this.state.content}
            />
            </div>
            </div>
            

          </div>
          
          <Button type="submit" color="green">
            <Icon name="save" />
            Save
          </Button>
        </form>
      </div>
    );
  }
}

// const mapStateToProps = (state, props) => {
//   const { cvReducer, catsReducer } = state;
//   return {
//     ...cvReducer,
//     ...catsReducer,
//   };
// };

export default connect(null, {
  // saveCvApi,
  // fetchCVs,
  // fetchCV,
  // fetchRelationsApi,
})(Blog);
