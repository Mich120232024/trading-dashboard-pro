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
        <a href="#">Dashboard</a>
        <a href="#">Analytics</a>
        <a href="#">Trades</a>
      </div>
      <div className="main-content">
        {/* Top Metrics */}
        <div className="dashboard-metric">
          <h3>Portfolio Value</h3>
          <p>$1,234,567</p>
          <span>+2.5%</span>
        </div>
        <div className="dashboard-metric">
          <h3>Daily P&L</h3>
          <p>$12,345</p>
          <span>+1.2%</span>
        </div>
        <div className="dashboard-metric">
          <h3>Active Trades</h3>
          <p>23</p>
          <span>5 pending</span>
        </div>

        {/* Charts */}
        <div className="chart-group">
          <div className="chart-card">
            <h2>Performance Chart</h2>
            <PerformanceChart data={samplePerformanceData} />
          </div>
          <div className="chart-card">
            <h2>Drawdown Chart</h2>
            <DrawdownChart data={sampleDrawdownData} />
          </div>
          <div className="chart-card">
            <h2>Volatility Surface Chart</h2>
            <VolatilitySurfaceChart />
          </div>
        </div>

        {/* Trade List */}
        <div className="table-container">
          <h2>Trade List</h2>
          <TradeList trades={sampleTrades} onTradeSelect={() => {}} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
