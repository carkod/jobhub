import React from 'react';
import 'semantic-ui-css/semantic.min.css';
import CoverLetters from '../containers/coverLetters/CoverLetters';
import Letter from '../containers/coverLetters/Letter';
import Detail from '../containers/curriculum/Detail';
import Listing from '../containers/curriculum/Listing';
import Positions from '../containers/curriculum/Positions';
// import PublicRouter from './PublicRouter';
import Home from '../containers/Home';
import Layout from '../containers/Layout';
// import Login from '../containers/Login';
import Portfolio from '../containers/portfolio/Portfolio';
import Project from '../containers/portfolio/Project';
import Relationships from '../containers/relationships/Relationships';
import PrivateRouter from './PrivateRouter';

const AppRouter = () => (
    <Layout>
        <PrivateRouter exact path="/home" compoent={Home} />
        <PrivateRouter exact path="/cv" component={Listing} />
        <PrivateRouter exact path="/cv/positions" component={Positions} />
        <PrivateRouter exact path="/relationships" component={Relationships} />
        {/*<PrivateRouter exact path="/cv/languages" component={Cats} />*/}
        <PrivateRouter path="/cv/id=:id" component={Detail} />

        <PrivateRouter exact path="/portfolio" component={Portfolio} />
        <PrivateRouter exact path="/portfolio/project/id=:id" component={Project} />
        <PrivateRouter exact path="/coverletters" component={CoverLetters} />
        <PrivateRouter exact path="/coverletters/id=:id" component={Letter} />
        {/* <PrivateRoute exact path="/tracker/" component={Tracker} /> */}
    </Layout>
);

export default AppRouter;