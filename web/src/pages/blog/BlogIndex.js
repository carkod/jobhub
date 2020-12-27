import React, { Component, Fragment } from "react";
import { Helmet } from "react-helmet";
import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";
import { fetchBlogsApi } from "../../actions/blog";

export default class BlogIndex extends Component {
  constructor(props) {
    super(props);
    this.state = {
      blogs: [],
    };
  }
  async componentDidMount() {
    try {
      const blogs = await fetchBlogsApi();
      this.setState({ blogs: blogs });
    } catch (e) {
      throw e;
    }
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
          <h1>
            {`B-Logging`}
          </h1>
          {this.state.blogs.length > 0 &&
            this.state.blogs.map((b) => (
              <div key={b._id} className="row one column wide">
                <section id="blogs">
                  <h2 className="ui dividing header">
                    <a href={`/blog/${b._id}`}>{b.name}</a>
                  </h2>
                  <small>{b.category}</small>
                  <div>
                    <div className="description">
                      <ReactMarkdown
                        plugins={[gfm]}
                        children={b.content}
                        allowDangerousHtml
                      />
                    </div>
                    
                  </div>
                  <a className="btn" href={`/blog/${b._id}`}>Read more </a>
                </section>
              </div>
            ))}
        </main>
      </Fragment>
    );
  }
}
