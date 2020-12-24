import React from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import About from "./About";
import MainCV from "./cv/MainCV";
import FourOFour from "./FourOFour";
import Home from "./home/Home";
import Layout from "./Layout";
import ProjectDetail from "./portfolio/ProjectDetail";
import MainResources from "./resources/MainResources";

const RenderRoute = ({ component: Component, layout: Layout, ...rest }) => (
  <Route
    {...rest}
    render={(props) => (
      <Layout>
        <Component {...props} />
      </Layout>
    )}
  />
);

const App = (props) => {
  const timeout = { enter: 300, exit: 200 };
  const currentKey = props.location.pathname || "/";
  return (
    <TransitionGroup component="main">
      <CSSTransition
        key={currentKey}
        timeout={timeout}
        classNames="slide"
        appear
      >
        <Switch location={props.location}>
          <RenderRoute layout={Layout} exact path="/" component={Home} />
          <RenderRoute layout={Layout} exact path="/about" component={About} />
          <RenderRoute
            layout={Layout}
            exact
            path="/cv/:language/:id"
            component={MainCV}
          />
          <RenderRoute
            layout={Layout}
            exact
            path="/portfolio/:language/:position"
            component={ProjectDetail}
          />
          <RenderRoute
            layout={Layout}
            exact
            path="/resources/:language/:id"
            component={MainResources}
          />
          <Route component={FourOFour} />
        </Switch>
      </CSSTransition>
    </TransitionGroup>
  );
};

export default withRouter(App);
