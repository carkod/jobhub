/* eslint-disable */
import React, {Component} from 'react';
import { Link, Route, IndexRoute, Router, Switch, BrowserRouter, withRouter } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

import Home from './home/Home';
import About from './About';
import Layout from './Layout';
import MainCV from './cv/MainCV';
import MainResources from './resources/MainResources';
import FourOFour from './FourOFour';
import ProjectDetail from './portfolio/ProjectDetail';

const RenderRoute = ({ component: Component, layout: Layout, ...rest }) => (
  <Route {...rest} render={props => (
    <Layout>
      <Component {...props}/>
    </Layout>
  )}/>
);

const App = (props) => {
  const timeout = { enter: 300, exit: 200 }
  const currentKey = props.location.pathname || '/';
  return (
  <TransitionGroup component="main">
    <CSSTransition key={currentKey} timeout={timeout} classNames="slide" appear>
      <Switch location={props.location}>
        <RenderRoute layout={Layout} exact path="/" component={Home} />
        <RenderRoute layout={Layout} exact path="/about" component={About} />
        <RenderRoute layout={Layout} exact path="/cv/:language/:id" component={MainCV} />
        <RenderRoute layout={Layout} exact path="/portfolio/:language/:id" component={ProjectDetail} />
        <RenderRoute layout={Layout} exact path="/resources/:language/:id" component={MainResources} />
        <Route component={FourOFour} />
      </Switch>
    </CSSTransition>
  </TransitionGroup>
  )
}

export default withRouter(App);