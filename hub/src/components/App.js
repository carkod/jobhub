/* eslint-disable */

import React, { Component } from 'react';
import { Link, Route, IndexRoute, Router, Switch, BrowserRouter } from 'react-router-dom';
import { Sidebar, Button, Header, Segment, Menu } from 'semantic-ui-react';
import Nav from './Nav';

import 'semantic-ui-css/semantic.min.css';
import Home from './components/Home';
import Layout from './components/Layout';
import Listing from './components/curriculum/Listing';
import Detail from './components/curriculum/Detail';
import Positions from './components/curriculum/Positions';
import Portfolio from './components/portfolio/Portfolio';
import Project from './components/portfolio/Project';
import CoverLetters from './components/coverLetters/CoverLetters';
import Letter from './components/coverLetters/Letter';
import LinkedIn from './components/LinkedIn';
import Relationships from './components/relationships/Relationships';

const App = (props) => {
  
    return (
    <BrowserRouter>
      <Switch>
        <Layout>
          <Route exact path="/" component={Home} />
          <Route exact path="/cv" component={Listing} />
          <Route exact path="/cv/positions" component={Positions} />
          <Route exact path="/relationships" component={Relationships} />
          {/*<Route exact path="/cv/languages" component={Cats} />*/}
          <Route path="/cv/id=:id" component={Detail} />  
          
          <Route exact path="/portfolio" component={Portfolio} />
          <Route exact path="/portfolio/project/id=:id" component={Project} />
          
          <Route exact path="/coverletters" component={CoverLetters} />
          <Route exact path="/coverletters/id=:id" component={Letter} />
          
          <Route exact path="/jobs/linkedin/" component={LinkedIn} />
        </Layout>
      </Switch>
    </BrowserRouter>
    );
}

export default App;
