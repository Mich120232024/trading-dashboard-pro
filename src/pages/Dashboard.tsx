import React from "react";
import VolatilitySurfaceChart from "../components/Dashboard/Charts/VolatilitySurfaceChart";
import PerformanceChart from "../components/Dashboard/Charts/PerformanceChart";
import DrawdownChart from "../components/Dashboard/Charts/DrawdownChart";
import TradeList from "../components/Dashboard/TradeList";

// Sample data
const samplePerformanceData = Array.from({ length: 30 }, (_, i) => ({
  date: new Date(Date.now() - i * 86400000).toLocaleDateString(),
  value: Math.round(Math.random() * 1000),
  benchmark: Math.round(Math.random() * 900),
}));

const sampleDrawdownData = Array.from({ length: 30 }, (_, i) => ({
  date: new Date(Date.now() - i * 86400000).toLocaleDateString(),
  value: Math.round(Math.random() * 200 - 100),
}));

const sampleTrades = Array.from({ length: 20 }, (_, i) => ({
  id: `TR-${i + 1}`,
  type: ["Market", "Limit", "Stop"][i % 3],
  status: ["Active", "Completed", "Pending"][i % 3],
  amount: Math.round(Math.random() * 10000),
  date: new Date().toISOString().split("T")[0],
}));

const Dashboard: React.FC = () => {
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
      <div className="main-content">
        <div className="dashboard-header">
          <h1>Dashboard</h1>
        </div>

        {/* Top Metrics */}
        <div className="dashboard-metric">
          <h3>Portfolio Value</h3>
          <p>$1,234,567</p>
          <p>+2.5%</p>
        </div>
        <div className="dashboard-metric">
          <h3>Daily P&L</h3>
          <p>$12,345</p>
          <p>+1.2%</p>
        </div>
        <div className="dashboard-metric">
          <h3>Active Trades</h3>
          <p>23</p>
          <p>5 pending</p>
        </div>

        {/* Charts */}
        <div className="chart-card">
          <h3>Performance Chart</h3>
          <PerformanceChart data={samplePerformanceData} />
        </div>
        <div className="chart-card">
          <h3>Drawdown Chart</h3>
          <DrawdownChart data={sampleDrawdownData} />
        </div>
        <div className="chart-card">
          <h3>Volatility Surface Chart</h3>
          <VolatilitySurfaceChart />
        </div>

        {/* Trade List */}
        <div className="table-container">
          <h3>Trade List</h3>
          <TradeList trades={sampleTrades} onTradeSelect={() => {}} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
