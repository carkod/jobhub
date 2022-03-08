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
import { checkValue, withRouter } from "../../utils";

const pdfType = "cover-letter";

class Letter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cats: null,
      locales: null,
      positions: null,
      statuses: null,
      name: null,
    };
  }

  componentDidMount = () => {
    this.props.fetchClApi(this.props.router.params.id);
    this.props.fetchRelationsApi();
  };

  componentDidUpdate = (props) => {
    if (this.props !== props) {
      this.setState({ ...this.props });
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
    this.setState({ desc: v.toString("html") });
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
    const response = await this.props.generatePdfApi(pdfType, id, this.state.cats.locale);
    const blob = new Blob([response], { type: "application/pdf" });
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.download = `Carlos-Wu-${this.state.name}-CoverLetter.pdf`;
    link.click();
  };

  render() {
    return (
      <div id="cl">
        <form onSubmit={this.onSubmit} name="cl">
          {this.state.name && (
            <Metainfo
              name={this.state.name}
              meta={this.state.cats}
              navName={this.state.navName}
              locales={this.state.locales}
              positions={this.state.positions}
              statuses={this.state.statuses}
              onChange={this.metaChange}
            />
          )}
          <div className="container">
            {this.state.desc && (
              <Editor value={this.state.desc} onChange={this.descChange} />
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
    ...clReducer,
    ...catsReducer,
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
