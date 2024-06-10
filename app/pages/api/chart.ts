import { PriceType } from "@/app/components/TableComponent";
import { NextApiRequest, NextApiResponse } from "next";

interface queryProps {
  id?: string;
}

export async function handler(req: NextApiRequest, res: NextApiResponse) {
  const days = "30";
  const vs_currency = "usd";

  const { id }: queryProps = req.query;

  const chart = await fetch(
    `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=${vs_currency}&days=${days}&interval=daily`,
    {
      next: { revalidate: 60 }, // Revalidate every 60 seconds
    }
  );

  const data: PriceType = await chart.json();

  return res.status(200).json({ data });
}
