import { useState, useEffect } from "react";

export default function TopCoins() {
  const [coins,   setCoins]   = useState([]);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState(null);

  useEffect(() => {
    fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd")
      .then(r => { if (!r.ok) throw new Error(); return r.json(); })
      .then(data => { setCoins(data); setLoading(false); })
      .catch(() => { setError("Failed to load data."); setLoading(false); });
  }, []);

  if (loading) return (
    <div className="text-center my-5">
      <div className="spinner-border text-primary" role="status" />
      <p className="mt-2">Loading coins...</p>
    </div>
  );

  if (error) return (
    <div className="alert alert-danger m-5">{error}</div>
  );

  return (
    <div className="container my-5">
      <h1 className="text-center mb-4">Top 100 Coins</h1>
      <div className="table-responsive">
        <table className="table table-striped table-hover">
          <thead className="table-dark">
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Symbol</th>
              <th>Low 24h</th>
              <th>High 24h</th>
              <th>Price</th>
              <th>Change 24h</th>
              <th>Volume</th>
            </tr>
          </thead>
          <tbody>
            {coins.map((coin, i) => (
              <tr key={coin.id}>
                <td>{i + 1}</td>
                <td>
                  <img src={coin.image} width="25"
                    alt={coin.name} className="me-2" />
                  {coin.name}
                </td>
                <td>{coin.symbol.toUpperCase()}</td>
                <td>${coin.low_24h?.toLocaleString()}</td>
                <td>${coin.high_24h?.toLocaleString()}</td>
                <td>${coin.current_price?.toLocaleString()}</td>
                <td className={coin.price_change_percentage_24h > 0
                  ? "text-success" : "text-danger"}>
                  {coin.price_change_percentage_24h?.toFixed(2)}%
                </td>
                <td>${coin.total_volume?.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}