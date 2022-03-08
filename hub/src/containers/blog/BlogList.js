import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { compose } from "redux";
import { Accordion, Button, Icon, Segment } from "semantic-ui-react";
import { deleteBlogApi, fetchBlogsApi } from "../../actions/blog";
import { formatDate, withRouter } from "../../utils";

const buttonDefaultStyles = {
  backgroundColor: "#fff",
  border: "none",
  cursor: "pointer",
  outline: "none",
};

const AddNewBlog = ({ router }) => (
  <button
    onClick={() => {
      router.navigate("/blog/null");
    }}
    style={buttonDefaultStyles}
    className="btn"
  >
    <Icon name="plus square" color="green" />
  </button>
);

class CoverLetters extends Component {
  constructor(props) {
    super(props);
    this.state = {
      blogList: [],
      activeIndex: 0,
    };
  }

  componentDidMount = () => {
    this.props.fetchBlogsApi();
  };

  componentDidUpdate = (props) => {
    if (this.props.blogList !== props.blogList) {
      this.setState({ blogList: this.props.blogList });
    }
  };

  handleDelete = (i) => (e) => {
    this.props.deleteBlogApi(this.state.blogList[i]._id).then((cv) => {
      this.props.fetchBlogsApi();
    });
  };

  render() {
    return (
      <div id="blogList" className="">
        <h1>
          Blog <AddNewBlog router={this.props.router} />
        </h1>
        <div className="listItem">
          {this.state.blogList && (
            <Accordion
              onTitleClick={(e, { index }) =>
                this.setState({
                  activeIndex: this.state.activeIndex === index ? -1 : index,
                })
              }
              panels={this.state.blogList.map((letter, i) => ({
                key: `panel-${letter._id}`,
                title: {
                  content: (
                    <span
                      color={
                        this.state.savedID === letter._id ? "red" : "inherit"
                      }
                    >
                      {letter.name}
                    </span>
                  ),
                },
                content: {
                  content: (
                    <div className="metadata">
                      <div className="meta-content">
                        <Segment.Group>
                          <Segment.Group horizontal>
                            <Segment>
                              <Icon fitted name="id card" />{" "}
                              {letter._id || "N/A"}
                            </Segment>
                            <Segment>
                              <Icon fitted name="checked calendar" />{" "}
                              {formatDate(letter.updatedAt || new Date())}
                            </Segment>
                            <Segment>
                              <Icon fitted name="clock" />{" "}
                              {formatDate(letter.createdAt || new Date())}
                            </Segment>
                          </Segment.Group>
                          <Segment.Group horizontal>
                            <Segment>
                              <Icon fitted name="briefcase" />{" "}
                              {letter.category ? letter.category : "N/A"}
                            </Segment>
                            <Segment>
                              <Icon fitted name="briefcase" />{" "}
                              {letter.status ? letter.status : "N/A"}
                            </Segment>
                          </Segment.Group>
                        </Segment.Group>
                      </div>
                      <br />
                      <div className="buttons">
                        <Link
                          className="ui primary button"
                          to={`/blog/${letter._id}`}
                        >
                          Edit/View
                        </Link>
                        <Button onClick={this.handleDelete(i)} negative>
                          Delete
                        </Button>
                      </div>
                    </div>
                  ),
                  key: letter._id,
                },
              }))}
              styled
              fluid
            />
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  const { blogsReducer } = state;
  return {
    blogList: blogsReducer,
  };
};

export default compose(
  withRouter,
  connect(mapStateToProps, { fetchBlogsApi, deleteBlogApi })
)(CoverLetters);
