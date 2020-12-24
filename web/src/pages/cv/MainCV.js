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

class MainCV extends Component {
  constructor(props) {
    super(props);
    const start = window.pageYOffset || document.documentElement.scrollTop;
    this.state = {
      cv: undefined,
      angle: -5,
      translatePosition: 3,
      lateralPosition: 10,
      scroll: start
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

    window.addEventListener("scroll", this.listenScroll, true)
  };

  componentWillUnmount() {
    window.removeEventListener("scroll", this.listenScroll)
  }

  getPdf = async (e) => {
    e.preventDefault();
    const { id } = this.props.match.params;
    const response = await this.props.generatePdfApi("curriculum-vitae", id);
    if (response) {
      const blob = new Blob([response], { type: "application/pdf" });
      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      link.download = `Carlos-Wu-${this.state.name}.pdf`;
      link.click();
    }
    
  };

  listenScroll = (e) => {
    // const { translatePosition, angle, lateralPosition } = this.state;
    // const scroll = e.target.scrollTop;
    // const angleProportion = 0.030
    // const lateralMovement = 0.006
    // console.log(lateralPosition, scroll)
    // if (this.state.scroll - scroll > 0) {
    //   this.setState({
    //     translatePosition: translatePosition * 15,
    //     scroll: scroll,
    //     angle: angle + angleProportion,
    //     lateralPosition: lateralMovement
    //   })
    // } else {
    //   this.setState({
    //     translatePosition: translatePosition / 15,
    //     scroll: scroll,
    //     angle: angle - angleProportion,
    //     lateralPosition: lateralMovement
    //   })
    // }

    
  }

  render() {
    const { cv } = this.state;
    return (
      <div id="mainCV" className="container">
        {cv ? (
          <div >
            <Helmet>
              <title>{`Carlos Wu - ${cv.name}`}</title>
              <meta charSet="utf-8" />
              <meta
                name="description"
                content={`Carlos Wu - Professional Profile | ${cv.name}`}
              />
              <link rel="canonical" href={process.env.REACT_APP_HOME_URL} />
            </Helmet>

            <main className="cvContent" style={{
              // transform: `rotate(${this.state.angle}deg) translate(${this.state.lateralPosition}em, ${this.state.translatePosition}em)`,
              // width: `90%`
            }}>
              <h1>
                Carlos Wu - <small>{cv.name}</small>
                <button
                  type="button"
                  onClick={(e) => this.getPdf(e)}
                  className="btn download"
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
    snackBar: snackbarReducer
  }
}
export default connect(map, { generatePdfApi })(MainCV);
