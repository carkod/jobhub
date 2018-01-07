/* eslint-disable */

import React, { Component } from 'react';
import {Helmet} from "react-helmet";
import { connect } from 'react-redux';

import { saveCV, fetchCVs } from '../actions/cv';


class MainCV extends Component {
    
    constructor(props) {
    super(props);
    const {cv} = this.props;
    this.state = {
      cv: cv,
    };
    
  }

  componentDidMount = () => {
    this.props.fetchCVs();
  }
  
  componentWillReceiveProps = (props) => {
    const {cv} = props;
    this.setState({ cv })
    console.log(props)
  }
  
  render() {
    return (
      <div id="mainCV" className="container">
        <Helmet>
          <title>Carlos Wu - Professional Profile</title>
          <meta charSet="utf-8" />
          <meta name="description" content="Web developer, Business analyst, Project Manager"/>
          <link rel="canonical" href="http://carloswu.xyz/" />
        </Helmet>
        
        <main className="cvContent">
            <h1>Carlos Wu - Front-end Developer</h1>
            <section id="summary">
                
                <p className="details">First name: {'whatever data'}</p>
                <p className="details">Last name: {'whatever data'}</p>
                <p className="details">Nationality: {'whatever data'}</p>
                <p className="details">Address: {'whatever data'}</p>
            </section>
            
            <section id="work">
                
                <div className="left">
                    <div className="work-date">
                        
                    </div>    
                    
                    <div className="position">
                        
                    </div>
                    
                    <div className="workplace">
                        
                    </div>
                    
                    <div className="work-desc"></div>
                    
                    
                </div>
                
                <div className="right">
                
                </div>
                
            </section>
            
            <section id="education">
                <p className="details">Education 1: {'whatever data'}</p>
                <p className="details">Education 1: {'whatever data'}</p>
                <p className="details">Education 1: {'whatever data'}</p>
                <p className="details">Education 1: {'whatever data'}</p>
            </section>
            
            <section id="languages">
                <p className="details">First name: {'whatever data'}</p>
                <p className="details">Last name: {'whatever data'}</p>
                <p className="details">Nationality: {'whatever data'}</p>
                <p className="details">Address: {'whatever data'}</p>
            </section>
            
            <section id="skills">
                <p className="details">First name: {'whatever data'}</p>
                <p className="details">Last name: {'whatever data'}</p>
                <p className="details">Nationality: {'whatever data'}</p>
                <p className="details">Address: {'whatever data'}</p>
            </section>
            
            <section id="it-skills">
                <p className="details">First name: {'whatever data'}</p>
                <p className="details">Last name: {'whatever data'}</p>
                <p className="details">Nationality: {'whatever data'}</p>
                <p className="details">Address: {'whatever data'}</p>
            </section>
            
            <section id="others">
                <p className="details">First name: {'whatever data'}</p>
                <p className="details">Last name: {'whatever data'}</p>
                <p className="details">Nationality: {'whatever data'}</p>
                <p className="details">Address: {'whatever data'}</p>
            </section>
            
        </main>
        
      </div>
    );
  }
}


const mapStateToProps = (state, props) => {
    
  if (state.cvs[0]._id) {
    const cv = state.cvs.find(item => item._id === props.match.params.id);
    console.log(state.cvs)
    return {
      cv: cv,
      detail: state.detail
    }
  } else {
    return { 
      cv: state.cvs[0],
      detail: state.detail
    }    
  }
  
}


export default connect(mapStateToProps, { saveCV, fetchCVs })(MainCV);