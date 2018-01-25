/* eslint-disable */

import React, { Component } from 'react';

class Explore extends Component {
    
    constructor(props) {
        super(props);
        this.state = {};
    }
    
    render() {
        const {cvs} = this.props;
        return (
            <div id="explore">
              <div className="box-title">
                <h2 className="title">Explore my background</h2>
                <p className="text">Proceed to extended CV</p>
              </div>
              <div className={this.state.fullOpen ? 'cv-dropdown ui fluid dropdown selection active visible':'cv-dropdown ui fluid dropdown selection'} onClick={() => this.setState({ fullOpen: !this.state.fullOpen })}>
                <div className="default text">Select Role</div>
                <i className={'linkify icon'}></i>
                <div className={this.state.fullOpen ? 'menu transition visible':'menu transition hidden'}>
                
                {cvs !== undefined && cvs[0] !== undefined ? cvs.map((c,i) => 
                  <div className="menutem" key={c._id} data-value={c.slug} >
                    <a href={`${location.pathname}/${c.cats.position}/cv`}>{c.cats.position}</a>
                  </div>
                ) : ''}
                </div>
              </div>
            </div>
        );
    }
}

export default Explore;