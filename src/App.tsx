import { Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "./components/Layout/MainLayout";
import Dashboard from "./pages/Dashboard";
import Trades from "./pages/Trades";
import Analytics from "./pages/Analytics";
import TimeSeriesAnalysis from "./pages/TimeSeriesAnalysis";
import FXPortfolio from "./pages/FXPortfolio";
import PowerBIAnalytics from "./pages/PowerBIAnalytics";

const App = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <MainLayout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/trades" element={<Trades />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/timeseries" element={<TimeSeriesAnalysis />} />
          <Route path="/fx-portfolio" element={<FXPortfolio />} />
          <Route path="/powerbi" element={<PowerBIAnalytics />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </MainLayout>
    </div>
  );
};

export default App;