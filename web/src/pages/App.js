import React from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { About, AboutMe, AboutSite } from "./About";
import BlogDetail from "./blog/BlogDetail";
import BlogIndex from "./blog/BlogIndex";
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
            path="/about/me"
            component={AboutMe}
          />
          <RenderRoute
            layout={Layout}
            exact
            path="/about/site"
            component={AboutSite}
          />
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
          <RenderRoute
            layout={Layout}
            exact
            path="/blog"
            component={BlogIndex}
          />
          <RenderRoute
            layout={Layout}
            exact
            path="/blog/:id"
            component={BlogDetail}
          />
          <Route component={FourOFour} />
        </Switch>
      </CSSTransition>
    </TransitionGroup>
  );
};

export default withRouter(App);
