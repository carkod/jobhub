import produce from "immer";
import React, { Component } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { Button, Icon } from "semantic-ui-react";
import { editClApi, fetchClApi } from "../../actions/cover-letter";
import { generatePdfApi } from "../../actions/generate-pdf";
import { fetchRelationsApi } from "../../actions/relations";
import Editor from "../../components/Editor";
import Metainfo from "../../components/Metainfo";
import { clState } from "../../reducers/cl";
import { checkValue, withRouter } from "../../utils";

const pdfType = "cover-letter";

class Letter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cl: clState,
      cats: [],
    };
  }

  componentDidMount = () => {
    const { id } = this.props.router.params;
    if (id) {
      this.props.fetchClApi(id);
    } else {
      this.props.resetCl();
    }

    this.props.fetchRelationsApi();
  };

  componentDidUpdate = (props) => {
    if (this.props.cl !== props.cl) {
      this.setState(
        produce((d) => {
          d.cl.name = this.props.cl.name;
          d.cl.navName = this.props.cl.navName;
          d.cl.slug = this.props.cl.slug;
          d.cl.createdAt = this.props.cl.createdAt;
          d.cl.desc = this.props.cl.desc;
          d.cl.image = this.props.cl.image;
          d.cl.status = this.props.cl.status;
          d.cl.cats.locale = this.props.cl.cats.locale;
          d.cl.cats.position = this.props.cl.cats.position;
          d.cl.cats.cvCountry = this.props.cl.cvCountry;
        })
      );
    }

    if (this.props.cats !== props.cats) {
      this.setState(
        produce((d) => {
          d.cl.cats = this.props.cats;
        })
      );
    }
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

  descChange = (v) => {
    this.setState(
      produce((draft) => {
        draft.desc = v;
      })
    );
  };

  handleName = (e) => {
    this.setState(
      produce((draft) => {
        draft[e.target.name] = e.target.value;
      })
    );
  };

  handleChange = ({ links }) => {
    this.setState({ links: links });
  };

  handleFiles = (docs) => {
    const { cl } = this.state;
    this.state.cl.documents = docs.documents;
    this.setState({ cl });
  };

  onSubmit = (e) => {
    e.preventDefault();
    this.props.editClApi(this.state);
  };

  savePdf = (id) => async (e) => {
    e.preventDefault();
    const response = await this.props.generatePdfApi(
      pdfType,
      id,
      this.state.cl.locale
    );
    const blob = new Blob([response], { type: "application/pdf" });
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.download = `Carlos-Wu-${this.state.cl.name}-CoverLetter.pdf`;
    link.click();
  };

  render() {
    return (
      <div id="cl">
        <form onSubmit={this.onSubmit} name="cl">
          {this.state.cl && this.state.cats && (
            <Metainfo
              cv={this.state.cl}
              cats={this.state.cats}
              onChange={this.metaChange}
            />
          )}
          <div className="container">
            {this.state.cl.desc && (
              <Editor value={this.state.cl.desc} onChange={this.descChange} />
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
  const { clReducer, catsReducer } = state;
  return {
    cl: clReducer,
    cats: catsReducer,
  };
};

export default compose(
  withRouter,
  connect(mapStateToProps, {
    fetchClApi,
    fetchRelationsApi,
    editClApi,
    generatePdfApi,
  })
)(Letter);
