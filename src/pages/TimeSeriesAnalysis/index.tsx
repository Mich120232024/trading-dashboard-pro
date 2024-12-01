import React, { useState } from 'react';
import TimeSeries from './components/TimeSeries';
import AIAssistant from './components/AIAssistant';
import DataControls from './components/DataControls';
import AnalyticsDashboard from './components/AnalyticsDashboard';

const TimeSeriesAnalysis: React.FC = () => {
  const [activeDataset, setActiveDataset] = useState<string>('EUR/USD');
  const [timeRange, setTimeRange] = useState<string>('1D');
  const [analysisMode, setAnalysisMode] = useState<'basic' | 'advanced'>('basic');

  return (
    <div className="h-full flex flex-col gap-4 p-6">
      <DataControls
        activeDataset={activeDataset}
        setActiveDataset={setActiveDataset}
        timeRange={timeRange}
        setTimeRange={setTimeRange}
        analysisMode={analysisMode}
        setAnalysisMode={setAnalysisMode}
      />
      
      <div className="flex-1 grid grid-cols-3 gap-4">
        <div className="col-span-2 space-y-4">
          <TimeSeries 
            dataset={activeDataset}
            timeRange={timeRange}
            mode={analysisMode}
          />
          <AnalyticsDashboard 
            dataset={activeDataset}
            timeRange={timeRange}
          />
        </div>
        
        <div className="col-span-1">
          <AIAssistant 
            dataset={activeDataset}
            timeRange={timeRange}
          />
        </div>
      </div>
    </div>
  );
};

export default TimeSeriesAnalysis;