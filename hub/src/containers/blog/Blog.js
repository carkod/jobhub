import produce from "immer";
import React, { Component } from "react";
import ReactMarkdown from "react-markdown";
import { connect } from "react-redux";
import { compose } from "redux";
import remarkGfm from "remark-gfm";
import {
  Button,
  Checkbox,
  Dropdown,
  Grid,
  Header,
  Icon,
  Input,
  Segment,
  TextArea
} from "semantic-ui-react";
import { fetchBlogApi, saveBlogApi } from "../../actions/blog";
import { fetchRelationsApi } from "../../actions/relations";
import { blogState } from "../../reducers/blog";
import { checkValue, formatDate, withRouter, slugify } from "../../utils";

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
      let slug = this.props.blog.slug;
      if (!this.props.blog.slug) {
        slug = slugify(this.props.blog.name)
      }
      this.setState(
        produce((d) => {
          d.blog.name = this.props.blog.name;
          d.blog.slug = slug;
          d.blog.content = this.props.blog.content;
          d.blog.category = this.props.blog.category;
          d.blog.status = this.props.blog.status;
          d.blog.publishTolinkedin = this.props.blog.publishTolinkedin;
          d.blog.tags = this.props.blog.tags instanceof Array ? this.props.blog.tags.join(",") : this.props.blog.tags;
          d.blog.mediumLink = this.props.blog.mediumLink;
          if (this.props.blog.mediumLink) {
            d.postOnMedium = true;
          }
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

  handleTitleBlur = (e) => {
    if (!this.state.blog.slug || this.state.blog.slug === "") {
      this.setState(
        produce((d) => {
          d.blog.slug = slugify(this.state.blog.name);
        })
      );
    }
  }

  handleChange = (e, { name, value }) => {
    this.setState(
      produce((d) => {
        d.blog[name] = value;
      })
    );
  };

  handletags = (e) => {
    let { value } = e.target;
    if (value instanceof Array) {
      value = value.join(",");
    }
    this.setState(
      produce((d) => {
        d.blog.tags = value;
      })
    );
  };

  postOnMedium = () => {
    this.setState({
      postOnMedium: !this.state.postOnMedium
    });
  }

  onSubmit = async (e) => {
    e.preventDefault();
    const { id } = this.props.router.params;
    let blogData = {
      id: id === "null" || !id ? undefined : id,
      slug: this.state.blog.slug,
      name: this.state.blog.name,
      category: this.state.blog.category,
      status: this.state.blog.status,
      content: this.state.blog.content,
      tags: this.state.blog.tags ? this.state.blog.tags.split(",") : [],
    };
    this.props
      .saveBlogApi(blogData, this.state.postOnMedium)
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
                onBlurCapture={this.handleTitleBlur}
                defaultValue={this.state.blog.name}
              />
            </Header>
            <div className="section">
              <Header sub>META</Header>
                <br />
                <Grid>
                  <Grid.Row>
                    <Grid.Column>
                    <label htmlFor="slug"><strong>Slug</strong>:{" "}</label>
                    {" "}
                    <input
                      type="text"
                      name="slug"
                      className="default-input--extended"
                      onChange={this.handleSlug}
                      defaultValue={this.state.blog.slug}
                    />
                    </Grid.Column>
                  </Grid.Row>
                  {this.props.blog.mediumLink && (
                    <Grid.Row>
                      <Grid.Column>
                      <label htmlFor="medium-link"><strong>Medium link</strong>:{" "}</label>
                      {" "}
                      <input
                        type="text"
                        name="medium-link"
                        className="default-input--extended"
                        disabled={true}
                        defaultValue={this.props.blog.mediumLink}
                      />
                      </Grid.Column>
                  </Grid.Row>
                  )}
                </Grid>
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
                <Input
                  placeholder="Tags"
                  type="text"
                  name="tags"
                  onChange={this.handletags}
                  defaultValue={this.state.blog.tags}
                />
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
          <br />
          <br />
          <div className="u-top-margin">
            {!this.props.blog.mediumLink && (
              <Checkbox label='Post on Medium' onChange={this.postOnMedium}/>
            )}
            
            <br />
            <Button type="submit" color="green">
              <Icon name="save" />
              Save
            </Button>
            <Button color='linkedin' onClick={()=> window.open(`https://www.linkedin.com/sharing/share-offsite/?url=https://carlos.wf${this.props.router.location.pathname}&title=${this.state.blog.name}&source=http://carlos.wf/`, "_blank")}>
              <Icon name='linkedin' /> Share on LinkedIn
            </Button>
          </div>
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
