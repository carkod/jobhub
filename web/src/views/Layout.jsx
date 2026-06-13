import React from "react";
import Header from "./Header";
import Notification from "../components/Notification";

function Layout({ children }) {
  return (
    <div className="ed-layout">
      <Notification />
      <Header />
      {children}
    </div>
  );
}

export default Layout;
