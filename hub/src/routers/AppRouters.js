import React from 'react';
import 'semantic-ui-css/semantic.min.css';
import CoverLetters from '../containers/coverLetters/CoverLetters';
import Letter from '../containers/coverLetters/Letter';
import Detail from '../containers/curriculum/Detail';
import Listing from '../containers/curriculum/Listing';
import Positions from '../containers/curriculum/Positions';
import Home from '../containers/Home';
import Layout from '../containers/Layout';
import Login from '../containers/Login';
import Portfolio from '../containers/portfolio/Portfolio';
import Project from '../containers/portfolio/Project';
import Relationships from '../containers/relationships/Relationships';
import PrivateRouter from './PrivateRouter';
import PublicRouter from './PublicRouter';
import Tracker from '../containers/tracker/Tracker'

import { Switch } from 'react-router-dom';

const AppRouter = () => (
    <Switch>
        <PublicRouter path="/login" component={Login} />
        <Layout>
            <PrivateRouter exact path="/" component={Home} />
            <PrivateRouter path="/cv" component={Listing} />
            <PrivateRouter path="/cv/positions" component={Positions} />
            <PrivateRouter path="/relationships" component={Relationships} />
            {/*<PrivateRouter path="/cv/languages" component={Cats} />*/}
            <PrivateRouter path="/cv/id=:id" component={Detail} />

            <PrivateRouter path="/portfolio" component={Portfolio} />
            <PrivateRouter path="/portfolio/project/id=:id" component={Project} />
            <PrivateRouter path="/coverletters" component={CoverLetters} />
            <PrivateRouter path="/coverletters/id=:id" component={Letter} />
            <PrivateRouter exact path="/tracker/" component={Tracker} />
        </Layout>
    </Switch>
);

export default AppRouter;