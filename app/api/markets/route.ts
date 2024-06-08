export async function GET() {
  const res = await fetch(
    "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin&category=layer-1&order=market_cap_asc&per_page=10&page=3&price_change_percentage=1h&locale=en&precision=full",
    {
      next: { revalidate: 10 },
    }
  );
  const market = await res.json();
  return Response.json({market});
}
