import React from "react";
import { Switch } from "react-router-dom";
import "semantic-ui-css/semantic.min.css";
import BlogList from "../containers/blog/BlogList";
import Blog from "../containers/blog/Blog";
import CoverLetters from "../containers/coverLetters/CoverLetters";
import Letter from "../containers/coverLetters/Letter";
import Detail from "../containers/curriculum/Detail";
import Listing from "../containers/curriculum/Listing";
import Positions from "../containers/curriculum/Positions";
import Home from "../containers/Home";
import Layout from "../containers/Layout";
import Login from "../containers/Login";
import Portfolio from "../containers/portfolio/Portfolio";
import Project from "../containers/portfolio/Project";
import Relationships from "../containers/relationships/Relationships";
import AddNewApplication from "../containers/tracker/AddNewApplication";
import EditApplication from "../containers/tracker/EditApplication";
import Jobs from "../containers/tracker/Jobs";
import Tracker from "../containers/tracker/Tracker";
import PrivateRouter from "./PrivateRouter";
import PublicRouter from "./PublicRouter";

const AppRouter = () => (
  <Switch>
    <PublicRouter path="/login" component={Login} />
    <Layout>
      <PrivateRouter exact path="/" component={Home} />
      <PrivateRouter exact path="/cv" component={Listing} />
      <PrivateRouter exact path="/cv/positions" component={Positions} />
      <PrivateRouter exact path="/relationships" component={Relationships} />
      <PrivateRouter exact path="/cv/id=:id" component={Detail} />
      <PrivateRouter exact path="/portfolio" component={Portfolio} />
      <PrivateRouter
        exact
        path="/portfolio/project/id=:id"
        component={Project}
      />
      <PrivateRouter exact path="/coverletters" component={CoverLetters} />
      <PrivateRouter exact path="/coverletters/id=:id" component={Letter} />
      <PrivateRouter exact path="/jobs" component={Jobs} />
      <PrivateRouter exact path="/tracker" component={Tracker} />
      <PrivateRouter exact path="/new-tracker" component={AddNewApplication} />
      <PrivateRouter exact path="/tracker/:id" component={EditApplication} />
      <PrivateRouter exact path="/blog/" component={BlogList} />
      <PrivateRouter exact path="/blog/:id" component={Blog} />
    </Layout>
  </Switch>
);

export default AppRouter;
