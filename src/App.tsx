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
        <Route path="/trades" element={<Trades />}>
          <Route path="active" element={<Trades view="active" />} />
          <Route path="history" element={<Trades view="history" />} />
          <Route path="pending" element={<Trades view="pending" />} />
          <Route path="" element={<Navigate to="active" replace />} />
        </Route>
        <Route path="/analytics" element={<Analytics />}>
          <Route path="performance" element={<Analytics view="performance" />} />
          <Route path="risk" element={<Analytics view="risk" />} />
          <Route path="portfolio" element={<Analytics view="portfolio" />} />
          <Route path="" element={<Navigate to="performance" replace />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </MainLayout>
  );
};

export default App;