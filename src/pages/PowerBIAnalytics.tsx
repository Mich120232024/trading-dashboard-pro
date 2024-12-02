import React from 'react';
import PowerBIDashboard from '../components/PowerBI/PowerBIDashboard';

const PowerBIAnalytics: React.FC = () => {
  // This will be replaced with actual Azure configuration
  const powerBIConfig = {
    settings: {
      navContentPaneEnabled: false,
      filterPaneEnabled: true
    },
    refreshInterval: 30
  };

  return (
    <PowerBIDashboard config={powerBIConfig} />
  );
};

export default PowerBIAnalytics;