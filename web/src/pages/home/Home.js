/* eslint-disable */

import React, { Component } from 'react';
import { Helmet } from "react-helmet";
import { connect } from 'react-redux';
import { fetchCVs } from '../../actions/cv';
import { fetchCats } from '../../actions/cats';
import Quick from './Quick';
import Explore from './Explore';

class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount = () => {
    this.props.fetchCVs();
    this.props.fetchCats();
  }

  componentWillReceiveProps = (props) => {
    this.setState({ cvs: props.value })
  }

  render() {
    const { cvs, positions, location } = this.props;
    return (
      <div id="home" className="container">
        <Helmet>
          <title>Carlos Wu - Professional Profile</title>
          <meta charSet="utf-8" />
          <meta name="description" content="Web developer, Business analyst, Project Manager" />
          <link rel="canonical" href="http://carloswu.xyz/" />
        </Helmet>

        <div className="ui grid">
          <div className="sixteen wide mobile eight wide computer column ">
            <Quick cvs={cvs} location={location} positions={positions} />
          </div>
          <div className="eight wide computer column sixteen wide mobile">
            <Explore cvs={cvs} positions={positions} />
          </div>
        </div>
        <div className="home-details">
          <div className="ui grid equal width stackable">
            <div id="revealer" className="equal width row">


              <div className={this.state.revealDetail ? "pad-left column cover revealed" : "pad-left column cover"} onClick={() => this.setState({ revealDetail: !this.state.revealDetail })} >
                <div className="ui list">
                  <div className="item">
                    <i className="id card icon" />
                    <div className="content">Carlos Wu </div>
                  </div>
                  <div className="item">
                    <i className="briefcase icon" />
                    <div className="content">Minsait, Indra Sistemas</div>
                  </div>
                  <div className="item">
                    <i className="marker icon" />
                    <div className="content">Madrid, Spain</div>
                  </div>
                </div>
              </div>


              <div className={this.state.revealDetail ? "pad-right column" : "pad-right column revealed"} onClick={() => this.setState({ revealDetail: !this.state.revealDetail })} >
                <div className="ui list">
                  <div className="item">
                    <i className="mail icon" />
                    <div className="content"><a href="mailto:carkodesign@gmail.com">carkodesign@gmail.com</a></div>
                  </div>
                  <div className="item">
                    <i className="linkedin square icon" />
                    <div className="content"><a href="https://www.linkedin.com/in/carkod/" title="https://www.linkedin.com/in/carkod/" target="_blank">LinkedIn</a></div>
                  </div>
                  <div className="item">
                    <i className="github icon" />
                    <div className="content"><a href="http://github.com/carkod/jobhub" title="http://github.com/carkod/jobhub" target="_blank">Github</a></div>
                  </div>
                  <div className="item">
                    <i className="stack overflow icon" />
                    <div className="content"><a href="https://stackoverflow.com/users/2454059/carkod" title="https://stackoverflow.com/users/2454059/carkod" target="_blank">StackOverflow</a></div>
                  </div>
                </div>
              </div>


            </div>
          </div>
        </div>
      </div>
    );
  }
}


const mapStateToProps = (state, props) => {
  const { cvs, cats } = state;
  if (cvs) {
    const cvsExplore = [];
    const newArray = cvs.filter(e => {

      if (e.cats.status === 'public') {
        cvsExplore.push({
          key: e._id,
          text: e.name,
          value: e.slug,
          quickUrl: e.pdf.find(x => x.value === 'q').link
        })
        return true
      }
      return false
    });
    return {
      cvs: newArray,
      cats: cats.data,
      positions: cvsExplore
    }
  }
}


export default connect(mapStateToProps, { fetchCVs, fetchCats })(Home);