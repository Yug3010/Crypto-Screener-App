"use client";

import React from 'react'

interface Crypto {
    id:number;
    name:string;
    price:string;
    total_volume:string;
    market_cap_change_24h:number;
    price_change_percentage_1h_in_currency:number;
    market_cap_change_percentage_24h:number;
    ath_change_percentage:number;
}

const TableComponent = async() => {
    const data=await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin&category=layer-1&order=market_cap_asc&per_page=10&page=3&price_change_percentage=1h&locale=en&precision=full',{next:{revalidate:10}});
    const coins:Crypto[]=await data.json();
    console.log(coins);
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
                            <td className="py-1 lg:table-cell hidden">{coin.price_change_percentage_1h_in_currency}</td>
                            <td className="py-1 lg:table-cell hidden">{coin.market_cap_change_percentage_24h}</td>
                            <td className="py-1 lg:table-cell hidden">{coin.ath_change_percentage}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
    </div>
  )
}

export default TableComponent