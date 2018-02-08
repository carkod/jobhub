/* eslint-disable */
import React, { Component } from 'react';

class Quick extends Component {
    
    constructor(props) {
        super(props);
        this.state = {};
        // this.listing = this.listing.bind(this);
        this.getPDF = this.getPDF.bind(this)
    }
    
    componentWillReceiveProps = props => {
      this.setState({quickOpen: props.quickOpen})
    }
    
    /*listing(positions, cvs) {
      const host = window.location.origin;
      let renderList;
      if (positions) {
      const getPDF = (role) => { 
        console.log(role)
        const getCV = cvs.find(i => { i.cats.position.toLowerCase() === role.value});
        
        console.log(role.value)
        const Qpdf = getCV.pdf.find(pdf => pdf.value === 'q');
        return Qpdf.link;
      }
        renderList = positions.map((p, i) => 
          <div className="menutem" key={p.key} >
            <a href={`${getPDF(p)}`}>{p.text}</a>
          </div>
        )
        
      } else {
        renderList = <div className="menutem"/>;
      }
      return renderList;
    }*/
    
    getPDF (p, cvs) {
      const getCV = cvs.find(i => {
        return i.cats.position.toLowerCase() === p.value
      });
      
      if (getCV !== undefined) {
        const Qpdf = getCV.pdf.find(pdf => {
          return pdf.value === 'q'
        });
        return Qpdf.link;
        
      } else {
        // console.log('not matched')
      }
      
    }
    
 
    render() {
        const {cvs, positions} = this.props;
        let renderList;
        if (positions) {
          renderList = positions.map((p, i) => 
          <div className="menutem" key={p.key} >
            <a href={this.getPDF(p, cvs)}>{p.text}</a>
          </div>
        )} else {
          renderList = <div className="menutem"/>;
        }
        return (
            <div id="quick">
              <div className="box-title">
                <h2 className="title">No time for browsing?</h2>
                <p className="text">Download short version of my CV</p>
              </div>
              <div className={this.state.quickOpen ? 'cv-dropdown ui fluid dropdown selection active visible':'cv-dropdown ui fluid dropdown selection'} onClick={() => this.setState({ quickOpen: !this.state.quickOpen })}>
                <div className="default text">Select Role</div>
                <i className={this.state.quickOpen ? 'cloud download icon':'file pdf outline icon'}></i>
                <div className={this.state.quickOpen ? 'menu transition visible':'menu transition hidden'}>
                
                  {renderList}
                  
                </div>
              </div>
            </div>
        );
    }
}

export default Quick;