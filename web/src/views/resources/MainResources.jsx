import React, { Component } from "react";
import shortid from "shortid";
import { fetchProjects } from "../../actions/res";
import HtmlText from "../../components/HtmlText";
import Documents from "./Documents";
import Links from "./Links";
import Metatags from "../../components/Metatags";

class MainResources extends Component {
  constructor(props) {
    super(props);
    this.state = { portfolio: [], loading: true };
  }

  async componentDidMount() {
    const { position, language } = this.props.match.params;
    try {
      const allProjects = await fetchProjects();
      const filtered = (allProjects || []).filter((cv) => {
        const matchPos = cv.cats && cv.cats.position && cv.cats.position.toLowerCase() === position;
        const matchStatus = cv.cats && cv.cats.status && cv.cats.status.toLowerCase() === "public";
        const matchLang = cv.cats && cv.cats.locale === language;
        return matchPos && matchStatus && matchLang;
      });
      this.setState({ portfolio: filtered, loading: false });
    } catch (e) {
      console.warn("Could not load portfolio:", e.message);
      this.setState({ portfolio: [], loading: false });
    }
  }

  render() {
    const { portfolio, loading } = this.state;
    const { position } = this.props.match.params;
    const title = position || "Professional Profile";

    if (loading) return <div className="ed-loading">Loading…</div>;

    return (
      <div className="ed-portfolio">
        <Metatags title={`${title} | Portfolio`} description={`Portfolio and projects by Carlos Wu — ${title}`} />
        <h1>{title} Projects</h1>
        {portfolio.length === 0 ? (
          <p className="ed-empty">No projects found.</p>
        ) : (
          portfolio.map((project) => (
            <section key={project.id || shortid.generate()}>
              <h2>{project.name}</h2>
              {project.desc && <HtmlText text={project.desc} />}
              <Links links={project.links} />
              <Documents documents={project.documents} />
            </section>
          ))
        )}
      </div>
    );
  }
}

export default MainResources;
