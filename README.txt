ZEek AI Signal Bot V4 — Forex live-data starter
================================================

SECURITY
- Never put the Twelve Data API key in index.html or send it in chat.
- The key is read only by the Netlify server function from the environment variable TWELVE_DATA_API_KEY.

FILES
- index.html: dashboard with automatic RSI/EMA/MACD calculations from provider candles, CALL/PUT/NO TRADE, sound alert and local history.
- netlify/functions/forex.js: server-side proxy to Twelve Data.
- netlify.toml: tells Netlify where the function lives.

DEPLOYMENT NOTE
This package includes a Netlify Function. A simple Netlify Drop static drag-and-drop deploy may not publish server functions. Deploy via a Git-connected Netlify site or Netlify CLI.

Suggested Git deployment:
1. Put all files in a GitHub repository (keep this repository private if desired).
2. In Netlify, import/connect that repository as a new site.
3. In Netlify site configuration, add environment variable:
   Key: TWELVE_DATA_API_KEY
   Value: (paste your Twelve Data key privately into Netlify, not here)
4. Redeploy the site.
5. Open the site and click "Fetch latest candles & analyze".

LIMITS / SAFETY
- Check your Twelve Data account for current symbol, 1-minute interval, request quota, and plan restrictions.
- This connects regular Forex market data only. It does not connect to IQ Option and does not provide IQ Option OTC prices.
- Signals are educational rule-based outputs, not guarantees or financial advice. No trades are placed automatically.
- Review provider timestamp and candle status before relying on an output.
