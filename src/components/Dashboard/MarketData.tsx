import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowUp, ArrowDown } from 'lucide-react';

interface MarketQuote {
  symbol: string;
  bid: number;
  ask: number;
  last: number;
  change: number;
  volume: number;
}

const MarketData: React.FC = () => {
  const [quotes, setQuotes] = useState<MarketQuote[]>([
    {
      symbol: 'EUR/USD',
      bid: 1.0998,
      ask: 1.1000,
      last: 1.0999,
      change: 0.05,
      volume: 1250000
    },
    {
      symbol: 'GBP/USD',
      bid: 1.2648,
      ask: 1.2650,
      last: 1.2649,
      change: -0.12,
      volume: 980000
    },
    {
      symbol: 'USD/JPY',
      bid: 147.85,
      ask: 147.87,
      last: 147.86,
      change: 0.23,
      volume: 1120000
    }
  ]);

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setQuotes(prevQuotes => 
        prevQuotes.map(quote => ({
          ...quote,
          bid: quote.bid + (Math.random() - 0.5) * 0.001,
          ask: quote.ask + (Math.random() - 0.5) * 0.001,
          last: quote.last + (Math.random() - 0.5) * 0.001,
          change: quote.change + (Math.random() - 0.5) * 0.01,
          volume: quote.volume + Math.floor(Math.random() * 1000)
        }))
      );
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Market Data</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="px-4 py-2 text-left">Symbol</th>
                <th className="px-4 py-2 text-right">Bid</th>
                <th className="px-4 py-2 text-right">Ask</th>
                <th className="px-4 py-2 text-right">Last</th>
                <th className="px-4 py-2 text-right">Change</th>
                <th className="px-4 py-2 text-right">Volume</th>
              </tr>
            </thead>
            <tbody>
              {quotes.map((quote) => (
                <tr key={quote.symbol} className="border-b hover:bg-gray-50/5">
                  <td className="px-4 py-2 font-medium">{quote.symbol}</td>
                  <td className="px-4 py-2 text-right font-mono">
                    {quote.bid.toFixed(4)}
                  </td>
                  <td className="px-4 py-2 text-right font-mono">
                    {quote.ask.toFixed(4)}
                  </td>
                  <td className="px-4 py-2 text-right font-mono">
                    {quote.last.toFixed(4)}
                  </td>
                  <td className="px-4 py-2 text-right">
                    <span 
                      className={`flex items-center justify-end ${
                        quote.change >= 0 ? 'text-green-500' : 'text-red-500'
                      }`}
                    >
                      {quote.change >= 0 ? (
                        <ArrowUp className="w-4 h-4 mr-1" />
                      ) : (
                        <ArrowDown className="w-4 h-4 mr-1" />
                      )}
                      {Math.abs(quote.change).toFixed(2)}%
                    </span>
                  </td>
                  <td className="px-4 py-2 text-right">
                    {quote.volume.toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};

export default MarketData;