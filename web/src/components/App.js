/* eslint-disable */
import React, {Component} from 'react';
import { Link, Route, IndexRoute, Router, Switch, BrowserRouter, withRouter } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

import Home from './Home';
import About from './About';
import Layout from './Layout';
import MainCV from './cv/MainCV';
import MainResources from './resources/MainResources';


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
  console.log(props)
  return (
  <TransitionGroup component="main">
    <CSSTransition key={currentKey} timeout={timeout} classNames="slide" appear>
      <Switch location={props.location}>
        <RenderRoute layout={Layout} exact path="/" component={Home} />
        <RenderRoute layout={Layout} path="/about" component={About} />
        <RenderRoute layout={Layout} exact strict path="/:language/:position/cv" component={MainCV} />
        <RenderRoute layout={Layout} exact strict path="/:language/:position/resources" component={MainResources} />
        {/*<Route component={404} />*/}
      </Switch>
    </CSSTransition>
  </TransitionGroup>
  )
}

export default withRouter(App);