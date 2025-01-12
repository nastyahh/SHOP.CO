import React from "react";
import { Route, Routes } from "react-router";
import "./App.css";
import { Home } from "./pages/Home/Home";
import Layout from "./Layout";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
      </Route>
    </Routes>
  );
}

export default App;
