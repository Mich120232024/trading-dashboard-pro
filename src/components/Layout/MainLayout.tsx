import React from "react";
import { Outlet } from "react-router-dom";

const MainLayout: React.FC = () => {
  return (
    <div className="dashboard-container">
      <div className="sidebar">
        <a href="#dashboard">Dashboard</a>
        <a href="#analytics">Analytics</a>
        <a href="#trades">Trades</a>
        <a href="#active-trades">Active</a>
        <a href="#history">History</a>
        <a href="#pending">Pending</a>
        <a href="#performance">Performance</a>
        <a href="#risk">Risk</a>
        <a href="#portfolio">Portfolio</a>
      </div>
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
