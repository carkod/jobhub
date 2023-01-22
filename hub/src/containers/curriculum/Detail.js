import React, { Component } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { Button, Icon } from "semantic-ui-react";
import {
  fetchCV,
  fetchCVs,
  resetCVState,
  saveCvApi,
  setCVState,
} from "../../actions/cv";
import { generatePdfApi } from "../../actions/generate-pdf";
import { fetchRelationsApi } from "../../actions/relations";
import Metainfo from "../../components/Metainfo";
import { checkValue, withRouter } from "../../utils";
import Education from "./Education";
import ItSkills from "./ItSkills";
import LangSkills from "./LangSkills";
import PD from "./PD";
import Summary from "./Summary";
import WebdevSkills from "./WebdevSkills";
import WorkRepeater from "./WorkRepeater";

// Serves both as
// - title
// - path param for conditions
const pdfType = "curriculum-vitae";

class Detail extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount = () => {
    if (this.props.router.params.id) {
      this.props.fetchCV(this.props.router.params.id);
    } else {
      this.props.resetCVState();
    }
    this.props.fetchRelationsApi();
  };

  summaryChange = (e) => {
    this.props.setCVState({ summary: e });
  };

  metaChange = (e, element) => {
    if (checkValue(e.target.name)) {
      this.props.setCVState({ [e.target.name]: e.target.value });
    } else {
      this.props.setCVState({
        cats: {
          ...this.props.cv.cats,
          [element.name]: element.value,
        },
      });
    }
  };

  pdChange = (e) => {
    this.props.setCVState({
      persdetails: {
        ...this.props.cv.persdetails,
        [e.target.name]: e.target.value,
      },
    });
  };

  skillsChange = ({ langSkills, webdevSkills, itSkills, workExp, educ }) => {
    if (checkValue(langSkills)) {
      this.props.setCVState({ langSkills: langSkills });
    }
    if (checkValue(webdevSkills)) {
      this.props.setCVState({ webdevSkills: webdevSkills });
    }
    if (checkValue(itSkills)) {
      this.props.setCVState({ itSkills: itSkills });
    }
    if (checkValue(workExp)) {
      this.props.setCVState({ workExp: workExp });
    }
    if (checkValue(educ)) {
      this.props.setCVState({ educ: educ });
    }
  };

  cvName = (e) => {
    this.props.setCVState({ name: e.target.value });
  };

  savePdf = (id) => async (e) => {
    e.preventDefault();
    const response = await this.props.generatePdfApi(
      pdfType,
      id,
      this.props.cv.cats.locale
    );
    const blob = new Blob([response], { type: "application/pdf" });
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.download = `Carlos-Wu-${this.props.cv.name}.pdf`;
    link.click();
  };

  onSubmit = async (e) => {
    e.preventDefault();
    this.props.saveCvApi(this.props.cv);
  };

  render() {
    return (
      <div id="detail">
        <form onSubmit={this.onSubmit}>
          <Metainfo
            cv={this.props.cv}
            cats={this.props.cats}
            onChange={this.metaChange}
          />
          <div className="container">
            {this.props.cv.summary && (
              <Summary
                summary={this.props.cv.summary}
                onChange={this.summaryChange}
              />
            )}
            {this.props.cv.persdetails && (
              <PD
                persdetails={this.props.cv.persdetails}
                onChange={this.pdChange}
              />
            )}

            {this.props.cv.workExp && (
              <WorkRepeater
                workExp={this.props.cv.workExp}
                update={this.skillsChange}
              />
            )}
            {this.props.cv.educ && (
              <Education educ={this.props.cv.educ} update={this.skillsChange} />
            )}

            {this.props.cv.langSkills && (
              <LangSkills
                langSkills={this.props.cv.langSkills}
                update={this.skillsChange}
              />
            )}
            {this.props.cv.webdevSkills && (
              <WebdevSkills
                webdevSkills={this.props.cv.webdevSkills}
                update={this.skillsChange}
              />
            )}
            {this.props.cv.itSkills && (
              <ItSkills
                itSkills={this.props.cv.itSkills}
                update={this.skillsChange}
              />
            )}

            <br />

            <Button type="submit" color="green">
              <Icon name="save" />
              Save
            </Button>

            {this.props.router?.params?.id && (
              <Button
                type="button"
                onClick={this.savePdf(this.props.router.params.id)}
              >
                <Icon name="file pdf" />
                Generate
              </Button>
            )}
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  const { cvReducer, catsReducer } = state;
  return {
    cv: cvReducer,
    cats: catsReducer,
  };
};

export default compose(
  withRouter,
  connect(mapStateToProps, {
    saveCvApi,
    fetchCVs,
    fetchCV,
    fetchRelationsApi,
    generatePdfApi,
    setCVState,
    resetCVState,
  })
)(Detail);
