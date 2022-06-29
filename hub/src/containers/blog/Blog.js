import React, { Component } from "react";
import ReactMarkdown from "react-markdown";
import { connect } from "react-redux";
import { compose } from "redux";
import remarkGfm from "remark-gfm";
import {
  Button, Dropdown,
  Header, Icon, Segment, TextArea
} from "semantic-ui-react";
import { fetchBlogApi, saveBlogApi } from "../../actions/blog";
import { fetchRelationsApi } from "../../actions/relations";
import { checkValue, formatDate, withRouter } from "../../utils";

function updateBlogState(name, value) {
  return {
    type: "UPDATE_BLOG_STATE",
    payload: {
      [name]: value,
    },
  };
}

function resetBlogForm() {
  return {
    type: "RESET_BLOG_FORM",
  };
}

class Blog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      content: "",
      category: "",
      status: "draft",
    };
  }

  componentDidMount = () => {
    const { id } = this.props.router.params;
    if (id) {
      this.props.fetchBlogApi(id);
    } else {
      this.props.resetBlogForm();
    }
    this.props.fetchRelationsApi();
  };

  handleTitle = (e) => {
    this.props.updateBlogState("name", e.target.value);
  };

  handleChange = (e, { name, value }) => {
    this.props.updateBlogState(name, value);
  };

  onSubmit = async (e) => {
    e.preventDefault();
    const { id } = this.props.router.params;
    let blogData = {
      id: id === "null" || !id ? undefined : id,
      name: this.props.name,
      category: this.props.category,
      status: this.props.status,
      content: this.props.content,
    };
    this.props
      .saveBlogApi(blogData)
      .then((x) => this.props.router.navigate(`/blog`));
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
                defaultValue={this.props.name}
              />
            </Header>
            <div className="section">
              <Header sub>META</Header>
              <Segment.Group horizontal>
                <Segment>
                  <strong>Created</strong>:{" "}
                  {formatDate(this.props.createdAt || new Date())}
                </Segment>
                <Segment>
                  <strong>Updated</strong>:{" "}
                  {formatDate(this.props.updatedAt || new Date())}
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
                    defaultValue={this.props.category || "dev"}
                  />
                )}
                {checkValue(this.props.statuses) && (
                  <Dropdown
                    onChange={this.handleChange}
                    name="status"
                    selection
                    search
                    options={this.props.statuses}
                    defaultValue={this.props.status || "draft"}
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
                onChange={this.handleChange}
                defaultValue={this.props.content}
              />
            </div>

            <div className="preview">
              <h2 className="title">Preview</h2>
              <div className="md-renderer">
                <ReactMarkdown remarkPlugins={[remarkGfm]} children={this.props.content} />
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
    name: blogReducer?.name,
    content: blogReducer?.content,
    category: blogReducer?.category,
    status: blogReducer?.status,
    categories: catsReducer?.categories,
    statuses: catsReducer?.statuses,
  };
};

export default compose(
  withRouter,
  connect(mapStateToprops, {
    fetchBlogApi,
    saveBlogApi,
    fetchRelationsApi,
    updateBlogState,
    resetBlogForm,
  })
)(Blog);
