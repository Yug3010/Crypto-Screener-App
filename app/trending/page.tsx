"use client";

// TrendingPage.tsx

import React, { useEffect, useState } from "react";
import Logo from "../components/Logo";
import Navigation from "../components/Navigation";
import Crypto from "../pages/Crypto"; // Ensure correct import path
import Image from "next/image";
import Link from "next/link";

interface Coin {
  id: string;
  name: string;
  symbol: string;
  thumb: string;
  data: {
    price: number;
    total_volume: string;
  };
}

interface TrendingResponse {
  coins: { item: Coin }[];
}

const TrendingPage: React.FC = () => {
  const [trendingCoins, setTrendingCoins] = useState<Coin[]>([]);

  useEffect(() => {
    const fetchTrendingCoins = async () => {
      try {
        const url = "https://api.coingecko.com/api/v3/search/trending";
        const options = {
          method: "GET",
          headers: {
            "x-cg-demo-api-key": "CG-JBYPLCZ5kfqDqgzonggcoLt5", // Replace with your actual API key
          },
        };

        const response = await fetch(url, options);
        if (!response.ok) {
          throw new Error("Failed to fetch trending coins");
        }
        const data: TrendingResponse = await response.json();
        const coins = data.coins.map((coin) => coin.item);
        setTrendingCoins(coins);
      } catch (error) {
        console.error("Error fetching trending coins:", error);
      }
    };

    fetchTrendingCoins();
  }, []);

  return (
    <>
      <main className="w-full h-full flex flex-col items-center relative text-white font-nunito">
        <div className="w-screen h-screen bg-gray-300 fixed -z-10" />
        <Logo />
        <Navigation />
        <h1 className="text-white m-4 text-xl">Trending Coins</h1>
        <div className="flex flex-wrap justify-center gap-4">
          {trendingCoins.map((coin) => (
            <div
              key={coin.id}
              className="card p-4 bg-white rounded"
              style={{
                maxWidth: "300px",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                transition: "transform 0.2s ease, box-shadow 0.2s ease",
                marginBottom: "1rem",
                flex: "1 1 45%", // Adjust for responsiveness
                minWidth: "300px", // Minimum width for two cards per row
              }}
            >
              <img
                src={coin.thumb}
                alt={coin.name}
                className="coin-image w-12 h-12 mb-2"
                style={{
                  transition: "transform 0.2s ease",
                }}
              />
              <h2
                className="text-gray-800"
                style={{
                  color: "#333",
                }}
              >
                {coin.name}
              </h2>
              <p
                className="text-gray-900"
                style={{
                  color: "#000",
                }}
              >
                Price: ${coin.data.price.toFixed(2)}
              </p>
              <p
                className="text-gray-600"
                style={{
                  color: "#666",
                }}
              >
                Total Volume: {coin.data.total_volume}
              </p>
            </div>
          ))}
        </div>
      </main>
    </>
  );
};

export default TrendingPage;

