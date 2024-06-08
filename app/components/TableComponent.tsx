"use client";

import React, { useEffect, useState } from "react";

interface Crypto {
  id: number;
  name: string;
  price: string;
  total_volume: string;
  market_cap_change_24h: number;
  price_change_percentage_1h_in_currency: number;
  market_cap_change_percentage_24h: number;
  ath_change_percentage: number;
}

const TableComponent = () => {
  const [coins, setCoins] = useState<Crypto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch("/api/markets", { method: "GET" });

      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();

      console.log("Fetched data:", data); // Log the entire response to inspect its structure

      // Adjust the extraction logic based on the actual structure of the response
      const coinsArray = data.market || []; // Update this line based on the actual structure

      if (Array.isArray(coinsArray)) {
        setCoins(coinsArray);
      } else {
        console.error("Data is not an array:", coinsArray);
        setError("Data is not an array");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      // setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="flex flex-col mt-9 border border-gray-100 rounded">
      <table className="w-full table-auto">
        <thead
          className="capitalize text-base text-gray-100 
            font-medium border-b border-gray-100
            "
        >
          <tr>
            <th className="py-1">asset</th>
            <th className="py-1">name</th>
            <th className="py-1">price</th>
            <th className="py-1">total volume</th>
            <th className="py-1">market cap change</th>
            <th className="py-1 lg:table-cell hidden">1H</th>
            <th className="py-1 lg:table-cell hidden">24H</th>
            <th className="py-1 lg:table-cell hidden">7D</th>
          </tr>
        </thead>
        <tbody>
          {coins.map((coin) => (
            <tr key={coin.id}>
              <td className="py-1">{coin.id}</td>
              <td className="py-1">{coin.name}</td>
              <td className="py-1">{coin.price}</td>
              <td className="py-1">{coin.total_volume}</td>
              <td className="py-1">{coin.market_cap_change_24h}</td>
              <td className="py-1 lg:table-cell hidden">
                {coin.price_change_percentage_1h_in_currency}
              </td>
              <td className="py-1 lg:table-cell hidden">
                {coin.market_cap_change_percentage_24h}
              </td>
              <td className="py-1 lg:table-cell hidden">
                {coin.ath_change_percentage}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableComponent;
