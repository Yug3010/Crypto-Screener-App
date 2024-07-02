"use client";
import React, { useEffect, useState } from "react";
import Logo from "../components/Logo";
import Navigation from "../components/Navigation";
import { useSession } from "next-auth/react";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../components/TableComponent.css";
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
  current_price: number;
}

interface PriceType {
  market_caps: Array<[number, number]>;
  prices: Array<[number, number]>;
  total_volumes: Array<[number, number]>;
}

const defaultPrices: { [key: string]: number } = {
  bitcoin: 30000,
  ethereum: 2000,
  ripple: 0.5,
  // Add default prices for other coins as needed
};

const page: React.FC = () => {
  const session = useSession();

  const [coinIds, setCoinIds] = useState<string>();
  const [coins, setCoins] = useState<Crypto[]>([]);
  const [likedAssets, setLikedAssets] = useState<string[]>([]);

  useEffect(() => {
    console.log("sessiondata in saved", session.data);
    if (session.data) {
      const assets = localStorage.getItem(session?.data?.user?.email!);
      if (assets) {
        setCoinIds(JSON.parse(assets).join(","));
        setLikedAssets(JSON.parse(assets));
      }
    }

    console.log("coinIds", coinIds);
  }, [session]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (coinIds) {
          const response = await fetch(
            `https://api.coingecko.com/api/v3/coins/markets?ids=${coinIds}&vs_currency=usd&order=market_cap_desc&per_page=20&page=1&price_change_percentage=1h&locale=en&precision=full`
          );
          const data: Crypto[] = await response.json();
          setCoins(data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [coinIds]);

  async function handleFavClick(coinId: string, isFav: number) {
    if (session.data) {
      const email = session?.data?.user?.email!;

      const existingValues = localStorage.getItem(email);
      let valuesToSet: string[] = [];

      if (existingValues) {
        valuesToSet = JSON.parse(existingValues) as string[];
      }

      if (isFav === 1) {
        if (!valuesToSet.includes(coinId)) {
          valuesToSet.push(coinId);
        }
      } else if (isFav === 0) {
        valuesToSet = valuesToSet.filter((id) => id !== coinId);
      }

      localStorage.setItem(email, JSON.stringify(valuesToSet));
      setLikedAssets(valuesToSet);
      setCoinIds(valuesToSet.join(","));
    }
  }

  return (
    <>
      <main
        className="w-full h-full flex flex-col first-letter:
    content-center items-center relative text-white font-nunito
    "
      >
        <div className="w-screen h-screen bg-gray-300 fixed -z-10" />
        <Logo />
        <Navigation />
        <div className="container mx-auto p-4">
          <div className="flex-cards">
            {coins?.map((coin) => (
              <div key={coin.id} className="card rounded-lg shadow-md p-4">
                {likedAssets.includes(coin.id) ? (
                  <FontAwesomeIcon
                    icon={faHeart}
                    style={{ color: "red" }}
                    onClick={() => handleFavClick(coin.id, 0)}
                  />
                ) : (
                  <FontAwesomeIcon
                    icon={faHeart}
                    onClick={() => handleFavClick(coin.id, 1)}
                  />
                )}
                <img
                  src={coin.image}
                  alt={coin.name}
                  className="coin-image w-12 h-12 mx-auto mb-4"
                />
                <div className="text-center font-semibold text-lg text-gray-800">
                  {coin.name}
                </div>
                <div className="text-center text-2xl font-bold text-gray-900">
                  ${coin.current_price.toFixed(2)}
                </div>
                <div className="mt-4">
                  <p className="text-sm text-black">
                    Total Volume: {coin.total_volume}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </>
  );
};

export default page;
