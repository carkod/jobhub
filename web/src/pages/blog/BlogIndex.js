import React, { Component, Fragment } from "react";
import { Helmet } from "react-helmet";
import { fetchBlogsApi } from "../../actions/blog";
import Metatags from "../../components/Metatags";

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
        <Metatags
          title={"Blog"}
          description={"The server log of my life, a place where I jot down incoherent notes for preservation in eternity."}
          type="article"
        />
        
        <main className="container">
          <div style={{marginBottom: "2rem"}}>
            <h1>{`B-Log`}</h1>
            <p>The server log of my life, a place where I jot down incoherent notes for preservation in eternity.</p>
          </div>
          <div className="u-block__wrapper">
          {this.state.blogs.length > 0
            ? this.state.blogs.map((b) => (
                <div key={b._id} className="u-block__item">
                  <section id="blogs" className="u-blog-header-section">
                    <h3 className="u-blog-index-header">
                      <a href={`/blog/${b.slug ? b.slug : b._id}`}>{b.name}</a>
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
