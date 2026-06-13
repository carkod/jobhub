"use client";

import React, { Component } from "react";
import shortid from "shortid";
import { fetchProjects } from "../../actions/res";
import HtmlText from "../../components/HtmlText";
import { checkValue } from "../../utils";
import Documents from "./Documents";
import Links from "./Links";
import Metatags from "../../components/Metatags";

function filterProjectsCriteria(portfolio, language, position) {
  return portfolio.filter((cv) => {
    const matchPos = cv.cats.position.toLowerCase() === position.toLowerCase();
    const matchStatus = checkValue(cv.cats.status)
      ? cv.cats.status.toLowerCase() === "public"
      : false;
    const matchLang = cv.cats.locale === language;
    return matchPos && matchStatus && matchLang;
  });
}

class ProjectDetail extends Component {
  constructor(props) {
    super(props);
    this.state = { portfolio: [], loading: true };
  }

  async componentDidMount() {
    const { position, language } = this.props.match.params;
    if (position && language) await this.loadProjects(position, language);
  }

  async componentDidUpdate(prevProps) {
    const { position, language } = this.props.match.params;
    const { position: prevPos, language: prevLang } = prevProps.match.params;
    if (
      position &&
      language &&
      (position !== prevPos || language !== prevLang)
    ) {
      await this.loadProjects(position, language);
    }
  }

  loadProjects = async (position, language) => {
    this.setState({ loading: true });
    try {
      const portfolio = await fetchProjects();
      const filteredProjects = filterProjectsCriteria(
        portfolio,
        language,
        position,
      );
      this.setState({ portfolio: filteredProjects, loading: false });
    } catch (e) {
      this.setState({ loading: false });
    }
  };

  render() {
    const { portfolio, loading } = this.state;
    const { position } = this.props.match.params;
    const title = position
      ? position.charAt(0).toUpperCase() + position.slice(1)
      : "Portfolio";

    return (
      <div id="mainportfolio" className="container">
        <Metatags title={title} description="Portfolio and projects" />
        <div className="ed-portfolio">
          <div style={{ marginBottom: "3rem" }}>
            <h1 className="ed-heading">{title}</h1>
          </div>

          {loading && <div className="ed-loading">Loading…</div>}

          {!loading && portfolio.length === 0 && (
            <p className="ed-empty">No projects found for this category.</p>
          )}

          {!loading &&
            portfolio.map((project) => (
              <article
                key={project.id || shortid.generate()}
                className="ed-project"
              >
                <h2 className="ed-project__name">{project.name}</h2>
                <div className="ed-project__grid">
                  <div className="ed-project__desc">
                    <HtmlText text={project.desc} />
                  </div>
                  <aside className="ed-project__aside">
                    <Links links={project.links} />
                    <Documents documents={project.documents} />
                  </aside>
                </div>
              </article>
            ))}
        </div>
      </div>
    );
  }
}

export default ProjectDetail;
