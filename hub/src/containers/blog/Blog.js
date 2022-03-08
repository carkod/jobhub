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
import { checkValue, formatDate, withRouter } from "../../utils";
import { compose } from "redux";

class Blog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      content:  "",
      category: "",
      status: "draft",
    };
  }

  componentDidMount = () => {
    const { id } = this.props.router.params;
    this.props.fetchBlogApi(id);
    this.props.fetchRelationsApi();
  };

  componentDidUpdate = (props, state) => {
    if (this.props.router.params.id != props.router.params.id) {
      this.props.fetchBlogApi(id);
    }
    if (this.props.category !== this.state.category) {
      this.setState({ category: this.props.category });
    }
    if (this.props.name !== state.name) {
      this.setState({ name: this.props.name });
    }
    if (this.props.content !== state.content) {
      this.setState({ content: this.props.content });
    }
    if (this.props.status !== state.status) {
      this.setState({ status: this.props.status });
    }
  };

  handleTitle = (e) => {
    this.setState({ name: e.target.value });
  }

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
    const { id } = this.props.router.params;
    if (checkValue(id)) {
      this.setState({ _id: id}, () => this.props.saveBlogApi(this.state))
    } else {
      this.props.saveBlogApi(this.state);
    }
  };

  render() {
    console.log("State:", this.state)
    return (
      <div id="blog">
        <form onSubmit={this.onSubmit}>
          <div id="metainfo" className="u-top-margin-title">
            <Header as="h1">
              {console.log(this.state.name)}
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
                {checkValue(this.props.statuses) && (
                  <Dropdown
                    onChange={this.handleChange}
                    name="status"
                    selection
                    search
                    options={this.props.statuses}
                    value={this.state.status}
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
                value={this.state.content || ""}
              />
            </div>

            <div className="preview">
              <h2 className="title">Preview</h2>
              <div className="md-renderer">
                <ReactMarkdown
                  plugins={[gfm]}
                  children={this.state.content || ""}
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
  console.log(blogReducer)
  return {
    name: blogReducer?.name,
    content: blogReducer?.content,
    category: blogReducer?.category,
    status: blogReducer?.status,
    categories: catsReducer?.categories,
    statuses: catsReducer?.statuses
  };
};

export default compose(
  withRouter,
  connect(mapStateToprops, {
    fetchBlogApi,
    saveBlogApi,
    fetchRelationsApi,
  })
)(Blog);
