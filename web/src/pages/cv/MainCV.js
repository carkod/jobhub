import produce from "immer";
import React, { Component } from "react";
import { Helmet } from "react-helmet";
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
    const start = typeof window !== 'undefined' ? document.documentElement.scrollTop : 0;
    this.state = {
      snackBar: null,
      cv: undefined,
      angle: -5,
      translatePosition: 3,
      lateralPosition: 10,
      scroll: start,
    };
  }

  async componentDidMount() {
    const { id } = this.props.match.params;
    const payload = await fetchCV(id);
    this.setState(
      produce((draft) => {
        draft.cv = payload.cv;
      })
    );

    window.addEventListener("scroll", this.listenScroll, true);
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.listenScroll);
  }

  getPdf = async (e) => {
    e.preventDefault();
    const { id, language } = this.props.match.params;
    const response = await this.props.generatePdfApi(
      "curriculum-vitae",
      id,
      language
    );
    if (!this.state.loading) {
      const blob = new Blob([response], { type: "application/pdf" });
      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      link.download = `Carlos-Wu-${this.state.cv.name}.pdf`;
      link.click();
    }
  };

  render() {
    const { cv } = this.state;
    return (
      <div id="mainCV" className="container">
        {cv ? (
          <div>
            <Metatags
              title={cv.name}
              description={createExcerpt(cv.summary)}
            />

            <main className="cvContent">
              <h1>
                Carlos Wu - <small>{cv.name}</small>
                <button
                  type="button"
                  onClick={(e) => this.getPdf(e)}
                  className="btn download"
                  disabled={
                    this.state.snackBar ? this.state.snackBar.loading : false
                  }
                  title="Download in pdf"
                >
                  <i className="file pdf outline icon" />
                </button>
              </h1>
              {cv.summary && (
                <section id="summary">
                  <h2>Summary and professional goals </h2>
                  <HtmlText text={cv.summary} />
                </section>
              )}

              <PD persdetails={cv.persdetails} />
              <Work workExp={cv.workExp} />
              <Education educ={cv.educ} />
              <Languages langSkills={cv.langSkills} />

              {/*Optional fields*/}
              {cv.webdevSkills.length > 0 && cv.webdevSkills[0].name !== "" ? (
                <WebDev webdevSkills={cv.webdevSkills} />
              ) : (
                ""
              )}
              {cv.itSkills.length > 0 && cv.itSkills[0].name !== "" ? (
                <IT itSkills={cv.itSkills} />
              ) : (
                ""
              )}
            </main>
          </div>
        ) : (
          "Loading..."
        )}
      </div>
    );
  }
}
const map = (s) => {
  const { snackbarReducer } = s;
  return {
    snackBar: snackbarReducer,
  };
};
export default connect(map, { generatePdfApi })(MainCV);
