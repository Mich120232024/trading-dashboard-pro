import React, { useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

declare global {
  interface Window {
    TradingView: any;
  }
}

const TradingViewChart: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/tradingview/1.0.0/tv.js';
    script.async = true;
    script.onload = () => {
      if (containerRef.current) {
        new window.TradingView.widget({
          autosize: true,
          symbol: 'EURUSD',
          interval: 'D',
          timezone: 'Etc/UTC',
          theme: 'dark',
          style: '1',
          locale: 'en',
          toolbar_bg: '#f1f3f6',
          enable_publishing: false,
          allow_symbol_change: true,
          container_id: 'tradingview_chart',
          studies: [
            'MASimple@tv-basicstudies',
            'RSI@tv-basicstudies',
            'MACD@tv-basicstudies'
          ],
          disabled_features: [
            'use_localstorage_for_settings'
          ],
          enabled_features: [
            'study_templates',
            'hide_left_toolbar_by_default'
          ],
          overrides: {
            'mainSeriesProperties.style': 1,
            'symbolWatermarkProperties.color': '#241b52',
            'volumePaneSize': 'medium'
          },
          drawings: {
            enabled: true,
            tools: {
              Measure: { enabled: true },
              SelectionTool: { enabled: true }
            }
          }
        });
      }
    };
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return (
    <div className="p-6 space-y-6">
      <Card className="w-full h-[800px]">
        <CardHeader>
          <CardTitle>EUR/USD Live Chart</CardTitle>
        </CardHeader>
        <CardContent>
          <div 
            id="tradingview_chart" 
            ref={containerRef} 
            className="w-full h-full"
          />
        </CardContent>
      </Card>

      {/* Trading Controls */}
      <div className="grid grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Order Entry</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span>Current Price</span>
                <span className="font-mono text-lg">1.0921</span>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <button className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors">
                  Buy Market
                </button>
                <button className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors">
                  Sell Market
                </button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Technical Indicators</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>RSI (14)</span>
                <span className="text-yellow-500">56.78</span>
              </div>
              <div className="flex justify-between">
                <span>MACD</span>
                <span className="text-green-500">0.0012</span>
              </div>
              <div className="flex justify-between">
                <span>MA (200)</span>
                <span className="text-blue-500">1.0934</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Market Depth</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="grid grid-cols-3 text-sm text-gray-400">
                <span>Price</span>
                <span className="text-right">Size</span>
                <span className="text-right">Total</span>
              </div>
              {[...Array(5)].map((_, i) => (
                <div key={i} className="grid grid-cols-3 text-red-500">
                  <span>1.{0921 - i}</span>
                  <span className="text-right">{(Math.random() * 10).toFixed(2)}M</span>
                  <span className="text-right">{(Math.random() * 50).toFixed(2)}M</span>
                </div>
              ))}
              <div className="border-b border-gray-600 my-2" />
              {[...Array(5)].map((_, i) => (
                <div key={i} className="grid grid-cols-3 text-green-500">
                  <span>1.{0922 + i}</span>
                  <span className="text-right">{(Math.random() * 10).toFixed(2)}M</span>
                  <span className="text-right">{(Math.random() * 50).toFixed(2)}M</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TradingViewChart;