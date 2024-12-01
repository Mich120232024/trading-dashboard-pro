import { Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "./components/Layout/MainLayout";
import Dashboard from "./pages/Dashboard";
import Trades from "./pages/Trades";
import Analytics from "./pages/Analytics";

const App = () => {
  return (
    <MainLayout>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        
        {/* Trades routes */}
        <Route path="/trades">
          <Route index element={<Navigate to="/trades/active" replace />} />
          <Route path="*" element={<Trades />} />
        </Route>

        {/* Analytics routes */}
        <Route path="/analytics">
          <Route index element={<Navigate to="/analytics/performance" replace />} />
          <Route path="*" element={<Analytics />} />
        </Route>

        {/* Catch all route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </MainLayout>
  );
};

export default App;