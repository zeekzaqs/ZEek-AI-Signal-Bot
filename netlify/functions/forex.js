exports.handler = async function(event) {
  const key = process.env.TWELVE_DATA_API_KEY;

  if (!key) {
    return {
      statusCode: 500,
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        error: "API key is not configured in Netlify."
      })
    };
  }

  const params = event.queryStringParameters || {};

  const allowedSymbols = new Set([
    "EUR/USD",
    "AUD/CHF",
    "GBP/USD",
    "AUD/USD",
    "USD/JPY",
    "GBP/JPY",
    "EUR/GBP"
  ]);

  const allowedIntervals = new Set([
    "1min",
    "5min",
    "15min"
  ]);

  const symbol = params.symbol || "EUR/USD";
  const interval = params.interval || "1min";

  if (
    !allowedSymbols.has(symbol) ||
    !allowedIntervals.has(interval)
  ) {
    return {
      statusCode: 400,
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        error: "Unsupported symbol or interval."
      })
    };
  }

  const url = new URL(
    "https://api.twelvedata.com/time_series"
  );

  url.searchParams.set("symbol", symbol);
  url.searchParams.set("interval", interval);
  url.searchParams.set("outputsize", "250");
  url.searchParams.set("apikey", key);

  try {
    const response = await fetch(url.toString());
    const data = await response.json();

    if (
      !response.ok ||
      data.status === "error" ||
      !Array.isArray(data.values)
    ) {
      return {
        statusCode: 502,
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          error:
            data.message ||
            data.code ||
            "Market-data provider error."
        })
      };
    }

    return {
      statusCode: 200,
      headers: {
        "content-type": "application/json",
        "cache-control": "no-store"
      },
      body: JSON.stringify({
        meta: data.meta || { symbol, interval },
        values: data.values
      })
    };
  } catch (error) {
    return {
      statusCode: 502,
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        error: "Unable to reach the market-data provider."
      })
    };
  }
};
