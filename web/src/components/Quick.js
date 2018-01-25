/* eslint-disable */

import React, { Component } from 'react';

class Quick extends Component {
    
    constructor(props) {
        super(props);
        this.state = {};
    }
    
    render() {
        const {cvs} = this.props;
        return (
            <div id="quick">
              <div className="box-title">
                <h2 className="title">No time for browsing?</h2>
                <p className="text">Download short version of my CV</p>
              </div>
              <div className={this.state.quickOpen ? 'cv-dropdown ui fluid dropdown  selection active visible':'cv-dropdown ui fluid dropdown selection'} onClick={() => this.setState({ quickOpen: !this.state.quickOpen })}>
                <div className="default text">Select Role</div>
                <i className={this.state.quickOpen ? 'cloud download icon':'file pdf outline icon'}></i>
                <div className={this.state.quickOpen ? 'menu transition visible':'menu transition hidden'}>
                
                  {cvs !== undefined && cvs[0] !== undefined ? cvs.map((c,i) => 
                    <div className="menutem" key={c._id} data-value={c.slug} >
                      <a href={c.pdf.find(p=>p.value === 'q').link}>{c.cats.position}</a>
                    </div>
                  ) : ''}
                </div>
              </div>
            </div>
        );
    }
}

export default Quick;