import React, { Component, Fragment } from "react";
import { Helmet } from "react-helmet";
import { fetchBlogsApi } from "../../actions/blog";

export default class BlogIndex extends Component {
  constructor(props) {
    super(props);
    this.state = {
      blogs: [],
    };
  }
  async componentDidMount() {
    const blogs = await fetchBlogsApi();
    blogs.filter((x) => x.status === "public");
    this.setState({ blogs: blogs });
  }
  render() {
    return (
      <Fragment>
        <Helmet>
          <title>{`Carlos Wu - Blogs`}</title>
          <meta charSet="utf-8" />
          <meta
            name="description"
            content={`Carlos Wu - Professional Profile | Blogs`}
          />
          <link rel="canonical" href={process.env.REACT_APP_HOME_URL} />
        </Helmet>
        <main className="container">
          <div>
            <h1>{`B-Log`}</h1>
            <p>The server log of my life, a place where I jot down incoherent notes for preservation in eternity.</p>
          </div>
          {this.state.blogs.length > 0
            ? this.state.blogs.map((b) => (
                <div key={b._id} className="row one column wide">
                  <section id="blogs" class="u-blog-header-section ">
                    <h3 className="u-blog-index-header">
                      <a href={`/blog/${b._id}`}>{b.name}</a>
                    </h3>
                    <small>Category: {b.category}</small>
                  </section>
                </div>
              ))
            : "No blogs yet"}
        </main>
      </Fragment>
    );
  }
}
