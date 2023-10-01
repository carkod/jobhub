import React, { Component } from "react";
import { Helmet } from "react-helmet";
import shortid from "shortid";
import { fetchProjects } from "../../actions/res";
import HtmlText from "../../components/HtmlText";
import { checkValue } from "../../utils";
import Documents from "./Documents";
import Links from "./Links";
import Metatags from "../../components/Metatags";

/**
 * Filter projects
 * - status: public
 * @param {string} language Matches URL
 * @param {string} position Matches URL
 * @returns {array} Projects with the same structure
 */
function filterProjectsCriteria(portfolio, language, position) {
  return portfolio.filter((cv) => {
    const matchPos = cv.cats.position.toLowerCase() === position;
    const matchStatus = checkValue(cv.cats.status)
      ? cv.cats.status.toLowerCase() === "public"
      : false;
    const matchLang = cv.cats.locale === language;
    if (matchPos && matchStatus && matchLang) {
      return true;
    }
    return false;
  });
}

/**
 * Project Detail page
 * Shows a list of projects coming from the /portfolio endpoint
 */
class ProjectDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      portfolio: [],
    };
  }

  async componentDidMount() {
    const { position, language } = this.props.match.params;
    try {
      const portfolio = await fetchProjects();
      const filteredProjects = filterProjectsCriteria(
        portfolio,
        language,
        position
      );
      this.setState({ portfolio: filteredProjects });
    } catch (e) {
      throw e;
    }
  }

  componentDidUpdate = (props) => {
    if (this.props.portfolio !== props.portfolio) {
      const { portfolio } = props;
      this.setState({ portfolio: portfolio });
    }
  };

  render() {
    const { portfolio } = this.state;
    const { position } = this.props.match.params;

    const title = position || "Professional Profile";
    return (
      <div id="mainportfolio" className="container">
        <Metatags
          title={title}
          description="Portfolio and projects"
        />

        <main className="portfolioContent">
          <h1>{`You are viewing ${title} projects`}</h1>
          {portfolio.map((project, i) => (
            <div
              key={project.id || shortid.generate()}
              className="row one column wide"
            >
              <section id="project">
                <h2 className="ui dividing header">{project.name}</h2>
                <div className="u-grid-2">
                  <div
                    className="left column"
                    style={{ backgroundImage: project.imgURL }}
                  >
                    <HtmlText text={project.desc} />
                  </div>
                  <div className="right column">
                    <div className="description">
                      <Links links={project.links} />
                    </div>
                    <div className="description">
                      <Documents documents={project.documents} />
                    </div>
                  </div>
                </div>
              </section>
            </div>
          ))}
        </main>
      </div>
    );
  }
}

export default ProjectDetail;
