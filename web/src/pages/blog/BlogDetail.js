import React, { Component } from "react";
import { Helmet } from "react-helmet";
import { fetchBlogApi } from "../../actions/blog";
import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";

/**
 * blog Detail page
 * Shows a list of blogs coming from the /blog endpoint
 */
export default class BlogDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      blog: {},
    };
  }

  async componentDidMount() {
    const { id } = this.props.match.params;
    try {
      const blog = await fetchBlogApi(id);
      this.setState({ blog: blog.data });
    } catch (e) {
      this.setState({ blog: {} });
    }
  }

  render() {
    const { blog } = this.state;
    const { id } = this.props.match.params;

    return (
      <div id="mainblog" className="container">
        <Helmet>
          <title>{`Carlos Wu - ${blog.name}`}</title>
          <meta property="og:title" content={`Carlos Wu ${blog.name}`} />
          <meta charSet="utf-8" />
          <link rel="canonical" href={`%PUBLIC_URL%/blog/${id}`} />
          <meta property="og:url" content={`%PUBLIC_URL%/blog/${id}`} />
        </Helmet>

        <main className="blogContent" style={{ marginLeft: "5.5rem", maxWidth: "800px" }}>
          <small>Category: {blog.category}</small>
          <h1 className="u-blog-header-divider">{blog.name}</h1>
          <div className="row one column wide">
            <section id="blog">
              <ReactMarkdown
                plugins={[gfm]}
                children={blog.content}
                allowDangerousHtml
                className="u-larger-p"
                style={{ wordWrap: "break-word" }}
              />
            </section>
          </div>
        </main>
      </div>
    );
  }
}
