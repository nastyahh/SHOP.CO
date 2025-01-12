import React from "react";
import { Header } from "./ui-components/Header/Header";
import { Outlet } from "react-router";

const Layout = () => {
  return (
    <div className="app-wrapper">
      <Header />
      <Outlet />
    </div>
  );
};

export default Layout;
