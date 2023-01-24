import produce from "immer";
import React, { Component } from "react";
import ReactMarkdown from "react-markdown";
import { connect } from "react-redux";
import { compose } from "redux";
import remarkGfm from "remark-gfm";
import {
  Button,
  Dropdown,
  Grid,
  Header,
  Icon,
  Segment,
  TextArea
} from "semantic-ui-react";
import { fetchBlogApi, saveBlogApi } from "../../actions/blog";
import { fetchRelationsApi } from "../../actions/relations";
import { blogState } from "../../reducers/blog";
import { checkValue, formatDate, withRouter } from "../../utils";

function resetBlogForm() {
  return {
    type: "RESET_BLOG_FORM",
  };
}

class Blog extends Component {
  constructor(props) {
    super(props);
    this.state = blogState;
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

  componentDidUpdate = (props) => {
    if (this.props.blog !== props.blog) {
      this.setState(
        produce((d) => {
          d.blog.name = this.props.blog.name;
          d.blog.content = this.props.blog.content;
          d.blog.category = this.props.blog.category;
          d.blog.status = this.props.blog.status;
          d.blog.publishTolinkedin = this.props.blog.publishTolinkedin;
        })
      );
    }

    if (this.props.categories !== props.categories) {
      this.setState(
        produce((d) => {
          d.categories = this.props.categories;
        })
      );
    }

    if (this.props.statuses !== props.statuses) {
      this.setState(
        produce((d) => {
          d.statuses = this.props.statuses;
        })
      );
    }
  };

  handleTitle = (e) => {
    this.setState(
      produce((d) => {
        d.blog[e.target.name] = e.target.value;
      })
    );
  };

  handleChange = (e, { name, value }) => {
    this.setState(
      produce((d) => {
        d.blog[name] = value;
      })
    );
  };

  onSubmit = async (e) => {
    e.preventDefault();
    const { id } = this.props.router.params;
    let blogData = {
      id: id === "null" || !id ? undefined : id,
      name: this.state.blog.name,
      category: this.state.blog.category,
      status: this.state.blog.status,
      content: this.state.blog.content,
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
                defaultValue={this.state.blog.name}
              />
            </Header>
            <div className="section">
              <Header sub>META</Header>
              <Segment.Group horizontal>
                <Segment>
                  <strong>Created</strong>:{" "}
                  {formatDate(this.state.blog.createdAt || new Date())}
                </Segment>
                <Segment>
                  <strong>Updated</strong>:{" "}
                  {formatDate(this.state.blog.updatedAt || new Date())}
                </Segment>
              </Segment.Group>
              <div className="u-space-between">
                {checkValue(this.state.categories) && (
                  <Dropdown
                    onChange={this.handleChange}
                    name="category"
                    selection
                    search
                    options={this.state.categories}
                    value={this.state.blog.category}
                  />
                )}
                {checkValue(this.state.statuses) && (
                  <Dropdown
                    onChange={this.handleChange}
                    name="status"
                    selection
                    search
                    options={this.state.statuses}
                    value={this.state.blog.status}
                  />
                )}
              </div>
            </div>
          </div>

          <Grid id="editor" columns={2} divided doubling>
            <Grid.Row>
              <Grid.Column className="write">
                <h2 className="title">Write</h2>
                <TextArea
                  name="content"
                  placeholder="Write blog content here"
                  rows={20}
                  onChange={this.handleChange}
                  defaultValue={this.state.blog.content}
                />
              </Grid.Column>

              <Grid.Column className="preview">
                <h2 className="title">Preview</h2>
                <div className="md-renderer">
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    children={this.state.blog.content}
                  />
                </div>
              </Grid.Column>
            </Grid.Row>
          </Grid>

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
    blog: blogReducer,
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
    resetBlogForm,
  })
)(Blog);
