/* eslint-disable */

import React, { Component } from 'react';



class Explore extends Component {
    
    constructor(props) {
        super(props);
        this.state = {};
        this.listing = this.listing.bind(this);
    }
    
    componentWillReceiveProps = props => {
      this.setState({fullOpen: props.fullOpen})
    }
    
    listing(positions, location, cvs) {
      const host = window.location.origin;
      let renderList;
      if (positions) {
        renderList = positions.map((p, i) => 
          <div className="menutem" key={p.key} >
            <a href={`${host}/en_GB/${p.value}/cv`}>{p.text}</a>
          </div>
        )
        
      } else {
        renderList = <div className="menutem"/>;
      }
      return renderList;
    }
    
    render() {
        let {cvs, positions} = this.props;
        return (
            <div id="explore">
              <div className="box-title">
                <h2 className="title">Explore my background</h2>
                <p className="text">Proceed to extended CV</p>
              </div>
              <div className={this.state.fullOpen ? 'cv-dropdown ui fluid dropdown selection active visible':'cv-dropdown ui fluid dropdown selection'} onClick={() => this.setState({ fullOpen: !this.state.fullOpen })}>
                <div className="default text">Select Role</div>
                <i className={'linkify icon'} />
                <div className={this.state.fullOpen ? 'menu transition visible':'menu transition hidden'}>
               
               
                {this.listing(positions, location, cvs)}
               
                {/*cvs !== undefined && cvs[0] !== undefined ? cvs.map((c,i) => 
                  <div className="menutem" key={c._id} >
                    <a href={`${location.pathname}/${c.cats.position}/cv`}>{positions ? positions.find(i => i.value.toLowerCase() === c.cats.position.toLowerCase()).text : ''}</a>
                  </div>
                ) : ''*/}
                </div>
              </div>
            </div>
        );
    }
}

export default Explore;