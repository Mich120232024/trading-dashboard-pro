import React, { useCallback } from 'react';
import { useVirtual } from '@tanstack/react-virtual';
import { ArrowUpIcon, ArrowDownIcon } from '@heroicons/react/24/solid';

interface Trade {
  id: string;
  symbol: string;
  type: string;
  direction: 'buy' | 'sell';
  amount: number;
  openPrice: number;
  currentPrice: number;
  pnl: number;
  status: string;
  timestamp: string;
}

interface TradeListProps {
  trades: Trade[];
  onTradeSelect?: (trade: Trade) => void;
}

const TradeList: React.FC<TradeListProps> = ({ trades, onTradeSelect }) => {
  const parentRef = React.useRef<HTMLDivElement>(null);

  const rowVirtualizer = useVirtual({
    size: trades.length,
    parentRef,
    estimateSize: useCallback(() => 50, []),
    overscan: 5
  });

  return (
    <div ref={parentRef} className="h-[400px] overflow-auto">
      <table className="min-w-full divide-y divide-gray-700">
        <thead className="bg-gray-800 sticky top-0 z-10">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Time</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Symbol</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Type</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Direction</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Amount</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Price</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">P&L</th>
          </tr>
        </thead>
        <tbody className="bg-gray-900 divide-y divide-gray-700">
          {rowVirtualizer.virtualItems.map((virtualRow) => {
            const trade = trades[virtualRow.index];
            return (
              <tr
                key={trade.id}
                onClick={() => onTradeSelect?.(trade)}
                className="hover:bg-gray-800 cursor-pointer"
                style={{
                  height: `${virtualRow.size}px`,
                  transform: `translateY(${virtualRow.start}px)`
                }}
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  {new Date(trade.timestamp).toLocaleTimeString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">{trade.symbol}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">{trade.type}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <span className={`flex items-center ${trade.direction === 'buy' ? 'text-green-500' : 'text-red-500'}`}>
                    {trade.direction === 'buy' ? <ArrowUpIcon className="w-4 h-4 mr-1" /> : <ArrowDownIcon className="w-4 h-4 mr-1" />}
                    {trade.direction.toUpperCase()}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">{trade.amount.toLocaleString()}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">{trade.currentPrice.toFixed(4)}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <span className={trade.pnl >= 0 ? 'text-green-500' : 'text-red-500'}>
                    {trade.pnl >= 0 ? '+' : ''}{trade.pnl.toFixed(2)}
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default TradeList;