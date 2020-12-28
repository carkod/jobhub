import React, { Component } from "react";
import produce from "immer";
import ReactMarkdown from "react-markdown";
import { connect } from "react-redux";
import gfm from "remark-gfm";
import {
  Dropdown,
  Header,
  Segment,
  Button,
  Icon,
  TextArea,
} from "semantic-ui-react";
import { fetchRelationsApi } from "../../actions/relations";
import { saveBlogApi, fetchBlogApi } from "../../actions/blog";
import { checkValue, formatDate } from "../../utils";

class Blog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      content: "",
      category: "",
    };
  }

  componentDidMount = () => {
    const { id } = this.props.match.params;
    if (id) {
      this.props.fetchBlogApi(id);
    }

    this.props.fetchRelationsApi();
  };

  componentDidUpdate = (props) => {
    if (this.props.category !== props.category) {
      this.setState({ category: this.props.category });
    }
    if (this.props.name !== props.name) {
      this.setState({ name: this.props.name });
    }
    if (this.props.content !== props.content) {
      this.setState({ content: this.props.content });
    }
  };

  handleTitle = (e) => this.setState({ [e.target.name]: e.target.value });

  handleChange = (e, { name, value }) => {
    this.setState(
      produce((draft) => {
        draft[name] = value;
      })
    );
  };

  handleContent = (e, { name, value }) => {
    this.setState(
      produce((draft) => {
        draft[name] = value;
      })
    );
  };

  onSubmit = (e) => {
    e.preventDefault();
    this.props.saveBlogApi(this.state);
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
                onChange={this.handleTitle}
                value={this.state.name}
              />
            </Header>
            <div className="section">
              <Header sub>META</Header>
              <Segment.Group horizontal>
                <Segment>
                  <strong>Created</strong>: {formatDate(this.props.createdAt || new Date())}
                </Segment>
                <Segment>
                  <strong>Updated</strong>: {formatDate(this.props.updatedAt || new Date())}
                </Segment>
              </Segment.Group>
              <div className="u-space-between">
                {checkValue(this.props.categories) && (
                  <Dropdown
                    onChange={this.handleChange}
                    name="category"
                    selection
                    search
                    options={this.props.categories}
                    value={this.state.category}
                  />
                )}
              </div>
            </div>
          </div>

          <div id="editor" className="u-basic-layout">
            <div className="write">
              <h2 className="title">Write</h2>
              <TextArea
                name="content"
                placeholder="Write blog content here"
                rows={20}
                onChange={this.handleContent}
                value={this.state.content}
              />
            </div>

            <div className="preview">
              <h2 className="title">Preview</h2>
              <div className="md-renderer">
                <ReactMarkdown
                  plugins={[gfm]}
                  children={this.state.content}
                  allowDangerousHtml
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

const mapStateToprops = (state, props) => {
  const { blogReducer, catsReducer } = state;
  return {
    ...blogReducer,
    ...catsReducer,
  };
};

export default connect(mapStateToprops, {
  fetchBlogApi,
  saveBlogApi,
  fetchRelationsApi,
})(Blog);