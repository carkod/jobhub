import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

// const isAuthenticated = JSON.parse(localStorage.getItem('token'))

export const PublicRoute = ({ isAuthenticated, component: Component, ...rest }) => (
    <Route {...rest} component={(props) => { console.log(props); return (
      isAuthenticated ? <Redirect to="/home" /> : <Component {...props} /> 
    )} }/>
  );

const mapStateToProps = state => {
    console.log(state);
    return ({
        isAuthenticated: JSON.parse(localStorage.getItem('hubToken')) ? true : false,
    });
} 

export default connect(mapStateToProps)(PublicRoute);