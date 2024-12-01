import React, { useCallback } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";

interface Trade {
  id: string;
  type: string;
  status: string;
  amount: number;
  date: string;
}

interface TradeListProps {
  trades: Trade[];
  onTradeSelect: (trade: Trade) => void;
}

const TradeList: React.FC<TradeListProps> = ({ trades, onTradeSelect }) => {
  const parentRef = React.useRef<HTMLDivElement>(null);

  const rowVirtualizer = useVirtualizer({
    count: trades.length,
    getScrollElement: () => parentRef.current,
    estimateSize: useCallback(() => 50, []),
    overscan: 5,
  });

  return (
    <div ref={parentRef} className="h-[400px] overflow-auto">
      <table className="min-w-full">
        <thead className="bg-gray-800">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
              ID
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
              Type
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
              Status
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
              Amount
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
              Date
            </th>
          </tr>
        </thead>
        <tbody className="bg-gray-900 divide-y divide-gray-800">
          {rowVirtualizer.getVirtualItems().map((virtualRow) => {
            const trade = trades[virtualRow.index];
            return (
              <tr
                key={trade.id}
                onClick={() => onTradeSelect(trade)}
                className="hover:bg-gray-800 cursor-pointer"
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                  {trade.id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                  {trade.type}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                  {trade.status}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                  ${trade.amount}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                  {trade.date}
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
