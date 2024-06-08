import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  // const { id, days, vs_currency } = req.query;

  const result = await axios.get(
    `${process.env.COINGECKO_API_URL}/coins/bitcoin/market_chart?days=7&vs_currency=usd`,
    {
      //   headers: {
      //     'Content-Type': 'application/json',
      //     'API-Key': process.env.DATA_API_KEY,
      //   },
    }
  );

  console.log("in side API =?> ", result.data);
  return Response.json({ data: result.data });
}
