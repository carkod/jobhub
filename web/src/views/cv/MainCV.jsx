import { produce } from "immer";
import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchCV } from "../../actions/cv";
import { generatePdfApi } from "../../actions/generate-pdf";
import HtmlText from "../../components/HtmlText";
import Education from "./Education";
import IT from "./IT";
import Languages from "./Languages";
import PD from "./PD";
import WebDev from "./WebDev";
import Work from "./Work";
import { createExcerpt } from "../../utils";
import Metatags from "../../components/Metatags";

class MainCV extends Component {
  constructor(props) {
    super(props);
    this.state = { snackBar: null, cv: undefined, loading: false };
  }

  async componentDidMount() {
    const { id } = this.props.match.params;
    if (id) await this.loadCV(id);
  }

  async componentDidUpdate(prevProps) {
    const { id } = this.props.match.params;
    const prevId = prevProps.match.params.id;
    if (id && id !== prevId) await this.loadCV(id);
  }

  loadCV = async (id) => {
    const payload = await fetchCV(id);
    this.setState(produce((draft) => { draft.cv = payload.cv; }));
  };

  getPdf = async (e) => {
    e.preventDefault();
    const { id, language } = this.props.match.params;
    this.setState({ loading: true });
    try {
      const response = await this.props.generatePdfApi("curriculum-vitae", id, language);
      const blob = new Blob([response], { type: "application/pdf" });
      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      link.download = `Carlos-Wu-${this.state.cv.name}.pdf`;
      link.click();
    } finally {
      this.setState({ loading: false });
    }
  };

  render() {
    const { cv, loading } = this.state;
    return (
      <div id="mainCV" className="container">
        {cv ? (
          <div className="ed-cv">
            <Metatags title={cv.name} description={createExcerpt(cv.summary)} />
            <div className="ed-cv__header">
              <h1 className="ed-cv__title">
                Carlos Wu
                <span className="ed-cv__subtitle">{cv.name}</span>
              </h1>
              <button
                type="button"
                onClick={this.getPdf}
                className="ed-cv__download"
                disabled={loading}
                title="Download as PDF"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
                {loading ? "Generating…" : "Download PDF"}
              </button>
            </div>

            {cv.summary && (
              <section id="summary" className="ed-cv__section ed-cv__summary">
                <h2 className="ed-cv__section-title">Summary</h2>
                <div className="ed-cv__summary-body">
                  <HtmlText text={cv.summary} />
                </div>
              </section>
            )}

            <PD persdetails={cv.persdetails} />
            <Work workExp={cv.workExp} />
            <Education educ={cv.educ} />
            <Languages langSkills={cv.langSkills} />
            {cv.webdevSkills?.length > 0 && cv.webdevSkills[0].name !== "" && (
              <WebDev webdevSkills={cv.webdevSkills} />
            )}
            {cv.itSkills?.length > 0 && cv.itSkills[0].name !== "" && (
              <IT itSkills={cv.itSkills} />
            )}
          </div>
        ) : (
          <div className="ed-loading">Loading…</div>
        )}
      </div>
    );
  }
}

const map = (s) => {
  const { snackbarReducer } = s;
  return { snackBar: snackbarReducer };
};

export default connect(map, { generatePdfApi })(MainCV);
