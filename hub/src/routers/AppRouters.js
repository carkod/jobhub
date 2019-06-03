import React from 'react';
import 'semantic-ui-css/semantic.min.css';
import CoverLetters from '../components/coverLetters/CoverLetters';
import Letter from '../components/coverLetters/Letter';
import Detail from '../components/curriculum/Detail';
import Listing from '../components/curriculum/Listing';
import Positions from '../components/curriculum/Positions';
import Layout from '../components/Layout';
import Login from '../components/Login';
import Portfolio from '../components/portfolio/Portfolio';
import Project from '../components/portfolio/Project';
import Relationships from '../components/relationships/Relationships';
import PrivateRouter from './PrivateRouter';
import PublicRouter from './PublicRouter';
import Home from '../components/Home';

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