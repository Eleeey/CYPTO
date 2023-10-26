// import React, { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import { Layout, Typography, Space } from "antd";
import {
  CryptoCurrencies,
  CrptoDetails,
  Exchanges,
  Homepage,
  Nav,
  News,
} from "./components";
// import "bootstrap/dist/css/bootstrap.css";
const App = () => {
  
  return (
    <div className="app">
      <div className="navbar">
        <Nav />
      </div>
      <div className="main">
        <Layout>
          <div className="routes">
            <Routes>
              <Route path={"/"} element={<Homepage />} />
              <Route path={"/exchanges"} element={<Exchanges />} />
              <Route
                path={"/cryptocurrencies"}
                element={<CryptoCurrencies hidden={false} />}
              />
              <Route path="/crypto/:coinid" element={<CrptoDetails />} />
              <Route path="/news" element={<News hidden={false} />} />
            </Routes>
          </div>
        </Layout>
        <div className="footer">
          <Typography.Title
            level={5}
            style={{ color: "blue", textAlign: "center" }}
          >
            CYPTO <br />
            2023 All Rights Resevered
          </Typography.Title>
          <Space>
            <Link to={"/"}>Home</Link>
            <Link to={"/exchanges"}>Exchanges</Link>
            <Link to={"/news"}>News</Link>
          </Space>
        </div>
      </div>
      
    </div>
  );
};

export default App;
