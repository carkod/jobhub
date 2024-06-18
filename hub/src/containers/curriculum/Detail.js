import produce from "immer";
import React, { Component } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { Button, Icon } from "semantic-ui-react";
import {
  fetchCV,
  fetchCVs,
  resetCVState,
  saveCvApi,
  setCVState
} from "../../actions/cv";
import { generatePdfApi } from "../../actions/generate-pdf";
import { fetchRelationsApi } from "../../actions/relations";
import Metainfo from "../../components/Metainfo";
import { cvModel } from "../../reducers/cv";
import { checkValue, slugify, withRouter } from "../../utils";
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
      cv: cvModel,
      cats: {},
    };
  }

  componentDidMount = () => {
    if (this.props.router.params.id) {
      this.props.fetchCV(this.props.router.params.id);
    } else {
      this.props.resetCVState();
    }
    this.props.fetchRelationsApi();
  };

  componentDidUpdate = (props) => {
    if (this.props.cv !== props.cv) {
      let slug = this.props.cv.slug || "";
      if (!this.props.cv.slug || this.props.cv.slug === "") {
        slug = slugify(this.props.cv.name)
      }
      this.setState(
        produce((d) => {
          d.cv.slug = slug;
          d.cv.cats.locale = this.props.cv.cats.locale;
          d.cv.cats.position = this.props.cv.cats.position;
          d.cv.cats.status = this.props.cv.cats.status;
          d.cv.navName = this.props.cv.navName;
          d.cv.name = this.props.cv.name;
          d.cv.summary = this.props.cv.summary;
          d.cv.workExp = this.props.cv.workExp;
          d.cv.persdetails = this.props.cv.persdetails;
          d.cv.educ = this.props.cv.educ;
          d.cv.langSkills = this.props.cv.langSkills;
          d.cv.webdevSkills = this.props.cv.webdevSkills;
          d.cv.itSkills = this.props.cv.itSkills;
        })
      );
    }
  };

  summaryChange = (e) => {
    this.setState(produce(d => {
      d.cv.summary = e
    }));
  };

  descChange = (key, e, i) => {
    this.setState(produce((d) => {
      d.cv[key][i].desc = e;
    }));
  };

  metaChange = (e, element) => {
    if (checkValue(e.target.name)) {
      this.setState(produce(d => {
        d.cv[e.target.name] = e.target.value;
      }));
    } else {
      this.setState(produce(d => {
        d.cv.cats[element.name] = element.value;
      }));
    }
  };

  pdChange = (e) => {
    this.setState(produce(d => {
      d.cv.persdetails[e.target.name] = e.target.value;
    }));
  };

  skillsChange = (key, index, event) => {
    this.setState(
      produce((d) => {
        d.cv[key][index][event.target.name] = event.target.value;
      })
    );
  };

  removeSkill = (key, index) => {
    this.setState(
      produce((d) => {
        d.cv[key].splice(index, 1)
      })
    );
  }

  addSkillItem = (key, item) => {
    this.setState(
      produce((d) => {
        d.cv[key].unshift(item)
      })
    );
  }

  cvName = (e) => {
    this.setState(produce(d => {
      d.cv.name = e.target.value;
    }));
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
    link.download = `Carlos-Wu-${this.state.cv.name}.pdf`;
    link.click();
  };

  onSubmit = async (e) => {
    e.preventDefault();
    const { cv } = this.state;
    let cvObj = {...cv}
    if (!cvObj.slug || cvObj.slug === "") {
      cvObj.slug = slugify(cvObj.name)
    }
    if (this.props.router.params.id) {
      cvObj._id = this.props.router.params.id
    }
    this.props.saveCvApi(cvObj);
  };

  handleTitleBlur = (e) => {
    if (!this.state.cv.slug || this.state.cv.slug === "") {
      this.setState(produce(d => {
        d.cv.slug = slugify(e.target.value);
      }));
    }
  }

  render() {
    return (
      <div id="detail">
        <form onSubmit={this.onSubmit}>
          <Metainfo
            cv={this.state.cv}
            cats={this.props.cats}
            onChange={this.metaChange}
            onTitleBlur={this.handleTitleBlur}
          />
          <div className="container">
            {this.state.cv && (
              <>
                <Summary
                  summary={this.state.cv.summary}
                  onChange={this.summaryChange}
                />
                <PD
                  persdetails={this.state.cv.persdetails}
                  onChange={this.pdChange}
                />
                <WorkRepeater
                  workExp={this.state.cv.workExp}
                  update={this.skillsChange}
                  removeSkill={this.removeSkill}
                  addSkillItem={this.addSkillItem}
                  descChange={this.descChange}
                />
                <Education
                  educ={this.state.cv.educ}
                  update={this.skillsChange}
                  removeSkill={this.removeSkill}
                  addSkillItem={this.addSkillItem}
                  descChange={this.descChange}
                />
                <LangSkills
                  langSkills={this.state.cv.langSkills}
                  update={this.skillsChange}
                  removeSkill={this.removeSkill}
                  addSkillItem={this.addSkillItem}

                />
              </>
            )}
            {this.state.cv.webdevSkills.length > 0 && (
              <WebdevSkills
                webdevSkills={this.state.cv.webdevSkills}
                update={this.skillsChange}
                removeSkill={this.removeSkill}
                addSkillItem={this.addSkillItem}
              />
            )}
            {this.state.cv.itSkills.length > 0 && (
              <ItSkills
                itSkills={this.state.cv.itSkills}
                update={this.skillsChange}
                removeSkill={this.removeSkill}
                addSkillItem={this.addSkillItem}
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
};



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
