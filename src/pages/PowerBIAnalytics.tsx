import React, { useState } from 'react';
import PowerBIEmbed from '../components/PowerBI/PowerBIEmbed';
import { Card, CardContent } from '@/components/ui/card';
import { Filter, RefreshCw, Settings, Download } from 'lucide-react';

const PowerBIAnalytics: React.FC = () => {
  const [loading, setLoading] = useState(false);

  // This will be replaced with actual Azure config
  const powerBIConfig = {
    settings: {
      navContentPaneEnabled: false,
      filterPaneEnabled: true
    }
  };

  const refreshData = () => {
    setLoading(true);
    // Will implement actual refresh logic with Azure
    setTimeout(() => setLoading(false), 1000);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Controls */}
      <div className="flex justify-between items-center bg-gray-800/50 p-4 rounded-lg shadow-lg backdrop-blur-sm">
        <div className="text-xl font-bold">PowerBI Analytics Dashboard</div>
        
        <div className="flex space-x-4">
          <button className="flex items-center space-x-2 px-4 py-2 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors duration-200">
            <Filter className="w-4 h-4" />
            <span>Filters</span>
          </button>
          
          <button 
            onClick={refreshData}
            className="flex items-center space-x-2 px-4 py-2 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors duration-200"
            disabled={loading}
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            <span>Refresh</span>
          </button>
          
          <button className="flex items-center space-x-2 px-4 py-2 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors duration-200">
            <Download className="w-4 h-4" />
            <span>Export</span>
          </button>
          
          <button className="flex items-center space-x-2 px-4 py-2 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors duration-200">
            <Settings className="w-4 h-4" />
            <span>Settings</span>
          </button>
        </div>
      </div>

      {/* Main PowerBI Report */}
      <PowerBIEmbed 
        config={powerBIConfig}
        className="h-[calc(100vh-12rem)]"
      />

      {/* Placeholder for future Azure integration status */}
      <Card className="bg-gray-800/50">
        <CardContent className="p-4">
          <div className="flex justify-between items-center text-sm text-gray-400">
            <span>Azure Connection Status: Ready for configuration</span>
            <span>Last Refresh: --</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PowerBIAnalytics;