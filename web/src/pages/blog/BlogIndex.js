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
    const blogState = blogs.filter((x) => x.status === "public");
    this.setState({ blogs: blogState });
  }
  render() {
    return (
      <Fragment>
        <Helmet>
          <title>{`Carlos Wu - Blogs`}</title>
          <meta charSet="utf-8" />
          <title>Carlos Wu - Professional Profile | Blogs</title>
          <meta
            name="description"
            content="The server log of my life, a place where I jot down incoherent notes for preservation in eternity."
          />
          <link rel="canonical" href={process.env.REACT_APP_HOME_URL + "/blog"} />
        </Helmet>
        <main className="container">
          <div style={{marginBottom: "2rem"}}>
            <h1>{`B-Log`}</h1>
            <p>The server log of my life, a place where I jot down incoherent notes for preservation in eternity.</p>
          </div>
          <div className="u-block__wrapper">
          {this.state.blogs.length > 0
            ? this.state.blogs.map((b) => (
                <div key={b._id} className="u-block__item">
                  <section id="blogs" class="u-blog-header-section">
                    <h3 className="u-blog-index-header">
                      <a href={`/blog/${b._id}`}>{b.name}</a>
                    </h3>
                  </section>
                  <small>Category: {b.category}</small>
                </div>
              ))
            : "No logs yet"}
            </div>
        </main>
      </Fragment>
    );
  }
}
