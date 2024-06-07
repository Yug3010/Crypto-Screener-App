"use client";

import React, { useState, useEffect } from "react";
import "./TableComponent.css"; // Ensure correct import path

interface Crypto {
  id: string;
  image: string;
  name: string;
  price: number;
  total_volume: string;
  market_cap_change_24h: number;
  price_change_percentage_1h_in_currency: number;
  market_cap_change_percentage_24h: number;
  ath_change_percentage: number;
}

const defaultPrices: { [key: string]: number } = {
  bitcoin: 30000,
  ethereum: 2000,
  ripple: 0.5,
  // Add default prices for other coins as needed
};

const TableComponent: React.FC = () => {
  const [coins, setCoins] = useState<Crypto[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<string>("name");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [page, setPage] = useState<number>(1);
  const [perPage, setPerPage] = useState<number>(10);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${perPage}&page=${page}&price_change_percentage=1h&locale=en&precision=full`
        );
        const data: Crypto[] = await response.json();
        console.log(data);
        setCoins(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [page, perPage]);

  const handleSort = (criteria: string) => {
    if (criteria === sortBy) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(criteria);
      setSortOrder("asc");
    }
  };

  const sortedCoins = [...coins].sort((a, b) => {
    switch (sortBy) {
      case "name":
        return sortOrder === "asc"
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name);
      case "price":
        return sortOrder === "asc"
          ? (a.price || 0) - (b.price || 0)
          : (b.price || 0) - (a.price || 0);
      case "volume":
        let volumeA = 0;
        let volumeB = 0;

        if (typeof a.total_volume === "string") {
          volumeA = parseFloat(a.total_volume.replace(/[^0-9.-]+/g, ""));
        } else if (typeof a.total_volume === "number") {
          volumeA = a.total_volume;
        }

        if (typeof b.total_volume === "string") {
          volumeB = parseFloat(b.total_volume.replace(/[^0-9.-]+/g, ""));
        } else if (typeof b.total_volume === "number") {
          volumeB = b.total_volume;
        }

        return sortOrder === "asc" ? volumeA - volumeB : volumeB - volumeA;
      case "market_cap_change":
        return sortOrder === "asc"
          ? a.market_cap_change_24h - b.market_cap_change_24h
          : b.market_cap_change_24h - a.market_cap_change_24h;
      default:
        return 0;
    }
  });

  const filteredCoins = sortedCoins.filter((coin) =>
    coin.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container mx-auto p-4">
      <input
        type="text"
        placeholder="Search..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="border rounded p-2 mb-4 w-full custom-input"
      />
      <div className="flex justify-end mb-2 custom-input">
        <select
          onChange={(e) => handleSort(e.target.value)}
          value={sortBy}
          className="sort-select mr-2"
        >
          <option value="name">Sort by Name</option>
          <option value="price">Sort by Price</option>
          <option value="volume">Sort by Volume</option>
          <option value="market_cap_change">Sort by Market Cap Change</option>
        </select>
        <select
          onChange={(e) => setPerPage(parseInt(e.target.value))}
          value={perPage}
          className="sort-select mr-2"
        >
          <option value={10}>10 per page</option>
          <option value={20}>20 per page</option>
          <option value={50}>50 per page</option>
        </select>
        <select
          onChange={(e) => setPage(parseInt(e.target.value))}
          value={page}
          className="sort-select"
        >
          {Array(10)
            .fill(null)
            .map((_, index) => (
              <option key={index + 1} value={index + 1}>
                Page {index + 1}
              </option>
            ))}
        </select>
      </div>
      <div className="flex-cards">
        {filteredCoins.map((coin) => (
          <div
            key={coin.id}
            className="card rounded-lg shadow-md p-4"
          >
            <img
              src={coin.image}
              alt={coin.name}
              className="coin-image w-12 h-12 mx-auto mb-4"
            />
            <div className="text-center font-semibold text-lg text-gray-800">
              {coin.name}
            </div>
            <div className="text-center text-2xl font-bold text-gray-900">
              ${defaultPrices[coin.id] || "N/A"}
            </div>
            <div className="mt-4">
              <p className="text-sm text-gray-600">
                Total Volume: {coin.total_volume}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TableComponent;
