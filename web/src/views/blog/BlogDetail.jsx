import React, { Component } from "react";
import { fetchBlogApi } from "../../actions/blog";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { createExcerpt } from "../../utils";
import Metatags from "../../components/Metatags";

export default class BlogDetail extends Component {
  constructor(props) {
    super(props);
    this.state = { blog: null, loading: true };
  }

  async componentDidMount() {
    const { id } = this.props.match.params;
    try {
      const blog = await fetchBlogApi(id);
      this.setState({ blog: blog.data, loading: false });
    } catch (e) {
      this.setState({ blog: null, loading: false });
    }
  }

  render() {
    const { blog, loading } = this.state;

    if (loading) return <div className="ed-loading">Loading…</div>;
    if (!blog) return <div className="ed-loading">Post not found.</div>;

    return (
      <article className="ed-blog-detail">
        <Metatags title={blog.name} description={createExcerpt(blog.content)} type="article" />
        {blog.category && <span className="ed-blog-detail__cat">{blog.category}</span>}
        <h1>{blog.name}</h1>
        <div className="ed-blog-detail__body">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {blog.content || ""}
          </ReactMarkdown>
        </div>
      </article>
    );
  }
}
