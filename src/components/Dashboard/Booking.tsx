import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface BookingFormData {
  tradeType: 'buy' | 'sell';
  symbol: string;
  quantity: string;
  price: string;
  orderType: 'market' | 'limit';
  tif: 'day' | 'gtc' | 'ioc';
  notes: string;
}

const Booking: React.FC = () => {
  const [formData, setFormData] = useState<BookingFormData>({
    tradeType: 'buy',
    symbol: '',
    quantity: '',
    price: '',
    orderType: 'market',
    tif: 'day',
    notes: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Booking trade:', formData);
    // Add API call here to submit the trade
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Trade Booking</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium">Trade Type</label>
              <select
                name="tradeType"
                value={formData.tradeType}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-md"
              >
                <option value="buy">Buy</option>
                <option value="sell">Sell</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium">Symbol</label>
              <input
                type="text"
                name="symbol"
                value={formData.symbol}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-md"
                placeholder="Enter symbol"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium">Quantity</label>
              <input
                type="number"
                name="quantity"
                value={formData.quantity}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-md"
                placeholder="Enter quantity"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium">Price</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-md"
                placeholder="Enter price"
                step="0.01"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium">Order Type</label>
              <select
                name="orderType"
                value={formData.orderType}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-md"
              >
                <option value="market">Market</option>
                <option value="limit">Limit</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium">Time in Force</label>
              <select
                name="tif"
                value={formData.tif}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-md"
              >
                <option value="day">Day</option>
                <option value="gtc">GTC</option>
                <option value="ioc">IOC</option>
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium">Notes</label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-md"
              rows={3}
              placeholder="Enter any additional notes"
            />
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Book Trade
            </button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default Booking;