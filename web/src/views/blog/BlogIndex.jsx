import React, { Component } from "react";
import Link from "next/link";
import { fetchBlogsApi } from "../../actions/blog";
import Metatags from "../../components/Metatags";

export default class BlogIndex extends Component {
  constructor(props) {
    super(props);
    this.state = { blogs: [] };
  }

  async componentDidMount() {
    try {
      const blogs = await fetchBlogsApi();
      this.setState({ blogs: blogs.filter((x) => x.status === "public") });
    } catch (e) {
      console.warn("Could not load blogs:", e.message);
    }
  }

  render() {
    const { blogs } = this.state;
    const [featured, ...rest] = blogs;

    return (
      <div className="ed-blog-index">
        <Metatags
          title="Blog"
          description="Thoughts on development, technology, and building things that last."
          type="article"
        />

        <div className="ed-blog-index__hero">
          <h1>Writing</h1>
          <p>Thoughts on development, technology, and building things that last.</p>
          <div className="ed-blog-index__divider" />
        </div>

        {blogs.length === 0 && (
          <p className="ed-empty">No posts yet.</p>
        )}

        {featured && (
          <div className="ed-featured">
            <div className="ed-featured__bar" />
            <div className="ed-featured__body">
              <div className="ed-featured__meta">
                {featured.category && (
                  <span className="ed-featured__cat">{featured.category}</span>
                )}
              </div>
              <Link href={`/blog/${featured.slug || featured._id}`} className="ed-featured__title">
                {featured.name}
              </Link>
              {featured.content && (
                <p className="ed-featured__excerpt">
                  {featured.content.replace(/[#*`]/g, "").slice(0, 180)}…
                </p>
              )}
              <Link href={`/blog/${featured.slug || featured._id}`} className="ed-featured__read">
                Read more →
              </Link>
            </div>
            <div className="ed-featured__aside">
              <span>{(featured.category || "Blog").slice(0, 4)}</span>
            </div>
          </div>
        )}

        {rest.length > 0 && (
          <div className="ed-post-grid">
            {rest.map((b) => (
              <article key={b._id} className="ed-post-card">
                <div className="ed-post-card__meta">
                  {b.category && (
                    <>
                      <span className="ed-post-card__cat">{b.category}</span>
                      <span className="ed-post-card__dot">•</span>
                    </>
                  )}
                </div>
                <Link href={`/blog/${b.slug || b._id}`} className="ed-post-card__title">
                  {b.name}
                </Link>
                {b.content && (
                  <p className="ed-post-card__excerpt">
                    {b.content.replace(/[#*`]/g, "").slice(0, 120)}…
                  </p>
                )}
                <Link href={`/blog/${b.slug || b._id}`} className="ed-post-card__read">
                  Read article →
                </Link>
              </article>
            ))}
          </div>
        )}
      </div>
    );
  }
}
