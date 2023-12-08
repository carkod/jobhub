import React from "react";
import { Navigate, Outlet, Route, Routes, useLocation } from "react-router-dom";
import Blog from "./containers/blog/Blog";
import BlogList from "./containers/blog/BlogList";
import CoverLetters from "./containers/coverLetters/CoverLetters";
import Letter from "./containers/coverLetters/Letter";
import Detail from "./containers/curriculum/Detail";
import Listing from "./containers/curriculum/Listing";
import Positions from "./containers/curriculum/Positions";
import Home from "./containers/Home";
import Layout from "./containers/Layout";
import Login from "./containers/Login";
import Portfolio from "./containers/portfolio/Portfolio";
import Project from "./containers/portfolio/Project";
import Relationships from "./containers/relationships/Relationships";
import AddNewApplication from "./containers/tracker/AddNewApplication";
import EditApplication from "./containers/tracker/EditApplication";
import Jobs from "./containers/tracker/Jobs";
import Tracker from "./containers/tracker/Tracker";
import { getToken } from "./utils";

function PrivateRoute() {
  const isAuthenticated = getToken();
  const location = useLocation();
  return isAuthenticated ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location.pathname }} replace />
  );
}

const AppRouter = () => (
  <Routes>
    <Route path="/login" element={<Login />} />
    <Route element={<Layout />}>
      <Route exact path="/" element={<PrivateRoute />}>
        <Route element={Home} />
        <Route exact path="/" element={<Tracker />} />
        <Route exact path="/tracker" element={<Tracker />} />
        <Route exact path="/tracker/:id" element={<EditApplication />} />
        <Route exact path="/new-tracker" element={<AddNewApplication />} />
        <Route exact path="/cv" element={<Listing />} />
        <Route exact path="/cv/positions" element={<Positions />} />
        <Route exact path="/relationships" element={<Relationships />} />
        <Route exact path="/cv/:id" element={<Detail />} />
        <Route exact path="/cv/new" element={<Detail />} />
        <Route exact path="/portfolio" element={<Portfolio />} />
        <Route exact path="/portfolio/project/id=:id" element={<Project />} />
        <Route exact path="/coverletters" element={<CoverLetters />} />
        <Route exact path="/coverletters/:id" element={<Letter />} />
        <Route exact path="/coverletters/new" element={<Letter />} />
        <Route exact path="/jobs" element={<Jobs />} />
        <Route exact path="/blog/" element={<BlogList />} />
        <Route exact path="/blog/new" element={<Blog />} />
        <Route exact path="/blog/:id" element={<Blog />} />
      </Route>
    </Route>
  </Routes>
);

export default AppRouter;
