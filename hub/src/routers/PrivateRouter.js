import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

export const PrivateRouter = ({ isAuthenticated, component: Component, ...rest }) => {
    debugger;
    return (
    <Route {...rest} render={(props) => (
        isAuthenticated ? <Component {...props} /> : <Redirect to={{
            pathname: '/login',
            state: { from: props.location }
          }} />
    )} />
)};

const mapStateToProps = state => ({
    isAuthenticated: JSON.parse(localStorage.getItem('hubToken')) ? true : false,
});

export default connect(mapStateToProps)(PrivateRouter);