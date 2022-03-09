import produce from "immer";
import React, { Component } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { Button, Icon } from "semantic-ui-react";
import { fetchCV, fetchCVs, saveCvApi } from "../../actions/cv";
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
    this.state = {
      cats: null,
      locales: null,
      positions: null,
      statuses: null,
      name: null,
      navName: null,
      summary: null,
      workExp: null,
      persdetails: null,
      educ: null,
      langSkills: null,
      webdevSkills: null,
      itSkills: null,
    };
  }

  componentDidMount = () => {
    this.props.fetchCV(this.props.router.params.id);
    this.props.fetchRelationsApi();
  };

  componentDidUpdate = (props) => {
    if (this.props.navName !== props.navName) {
      this.setState({
        cats: {
          locale: this.props.cats.locale,
          position: this.props.cats.position,
          status: this.props.cats.status,
        },
        navName: this.props.navName,
        name: this.props.name,
        summary: this.props.summary,
        workExp: this.props.workExp,
        persdetails: this.props.persdetails,
        educ: this.props.educ,
        langSkills: this.props.langSkills,
        webdevSkills: this.props.webdevSkills,
        itSkills: this.props.itSkills,
      });
    }
  };

  summaryChange = (e) => {
    this.setState({ summary: e });
  };

  metaChange = (e, element) => {
    if (checkValue(e.target.name)) {
      this.setState({ [e.target.name]: e.target.value });
    } else {
      this.setState(
        produce((draft) => {
          draft.cats[element.name] = element.value;
        })
      );
    }
  };

  pdChange = (e) => {
    this.setState({
      persdetails: {
        ...this.state.persdetails,
        [e.target.name]: e.target.value,
      },
    });
  };

  skillsChange = ({ langSkills, webdevSkills, itSkills, workExp, educ }) => {
    if (checkValue(langSkills)) {
      this.setState({ langSkills: langSkills });
    }
    if (checkValue(webdevSkills)) {
      this.setState({ webdevSkills: webdevSkills });
    }
    if (checkValue(itSkills)) {
      this.setState({ itSkills: itSkills });
    }
    if (checkValue(workExp)) {
      this.setState({ workExp: workExp });
    }
    if (checkValue(educ)) {
      this.setState({ educ: educ });
    }
  };

  cvName = (e) => {
    this.setState({ name: e.target.value });
  };

  savePdf = (id) => async (e) => {
    e.preventDefault();
    const response = await this.props.generatePdfApi(pdfType, id, this.state.cats.locale);
    const blob = new Blob([response], { type: "application/pdf" });
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.download = `Carlos-Wu-${this.state.name}.pdf`;
    link.click();
  };

  onSubmit = async (e) => {
    e.preventDefault();
    if (this.props.router.params.id) {
      this.setState({ _id: this.props.router.params.id }, () =>
        this.props.saveCvApi(this.state)
      );
    } else {
      this.props.saveCvApi(this.state);
    }
  };

  render() {
    return (
      <div id="detail">
        <form onSubmit={this.onSubmit}>
          {this.state.cats && (
            <Metainfo
              meta={this.state.cats}
              name={this.state.name}
              navName={this.state.navName}
              locales={this.props.locales || null}
              positions={this.props.positions || null}
              statuses={this.props.statuses || null}
              onChange={this.metaChange}
            />
          )}
          <div className="container">
            {this.state.summary && (
              <Summary
                summary={this.state.summary}
                onChange={this.summaryChange}
              />
            )}
            {this.state.persdetails && (
              <PD
                persdetails={this.state.persdetails}
                onChange={this.pdChange}
              />
            )}

            {this.state.workExp && (
              <WorkRepeater
                workExp={this.state.workExp}
                update={this.skillsChange}
              />
            )}
            {this.state.educ && (
              <Education educ={this.state.educ} update={this.skillsChange} />
            )}

            {this.state.langSkills && (
              <LangSkills
                langSkills={this.state.langSkills}
                update={this.skillsChange}
              />
            )}
            {this.state.webdevSkills && (
              <WebdevSkills
                webdevSkills={this.state.webdevSkills}
                update={this.skillsChange}
              />
            )}
            {this.state.itSkills && (
              <ItSkills
                itSkills={this.state.itSkills}
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
    ...cvReducer,
    ...catsReducer,
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
  })
)(Detail);
