import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Home() {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd")
      .then(r => r.json())
      .then(data => { setCoins(data.slice(0, 5)); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  return (
    <>
      {/* Carousel */}
      <div id="carouselExampleCaptions" className="carousel slide" data-bs-ride="carousel">
        <div className="carousel-indicators">
          <button type="button" data-bs-target="#carouselExampleCaptions"
            data-bs-slide-to="0" className="active"></button>
          <button type="button" data-bs-target="#carouselExampleCaptions"
            data-bs-slide-to="1"></button>
          <button type="button" data-bs-target="#carouselExampleCaptions"
            data-bs-slide-to="2"></button>
        </div>

        <div className="carousel-inner">
          <div className="carousel-item active" data-bs-interval="2000">
            <img
              src="https://images.pexels.com/photos/7267489/pexels-photo-7267489.jpeg"
              className="d-block w-100" alt="Slide 1"
              style={{ height: "500px", objectFit: "cover" }} />
            <div className="carousel-caption d-none d-md-block">
              <h5>The Future of Digital Finance</h5>
              <p>Experience fast, transparent, and secure transactions.</p>
            </div>
          </div>

          <div className="carousel-item" data-bs-interval="2000">
            <img
              src="https://images.pexels.com/photos/29930930/pexels-photo-29930930.jpeg"
              className="d-block w-100" alt="Slide 2"
              style={{ height: "500px", objectFit: "cover" }} />
            <div className="carousel-caption d-none d-md-block">
              <h5>Start Your Crypto Journey Today</h5>
              <p>Explore top cryptocurrencies and track market trends.</p>
            </div>
          </div>

          <div className="carousel-item" data-bs-interval="2000">
            <img
              src="https://images.pexels.com/photos/227433/pexels-photo-227433.jpeg"
              className="d-block w-100" alt="Slide 3"
              style={{ height: "500px", objectFit: "cover" }} />
            <div className="carousel-caption d-none d-md-block">
              <h5>Unlock the World of Crypto</h5>
              <p>Discover innovative digital assets shaping global finance.</p>
            </div>
          </div>
        </div>

        <button className="carousel-control-prev" type="button"
          data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
          <span className="carousel-control-prev-icon"></span>
        </button>
        <button className="carousel-control-next" type="button"
          data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
          <span className="carousel-control-next-icon"></span>
        </button>
      </div>


      {/* Top 5 Coins Section */}
      <div className="container my-5">
        <h2 className="text-center mb-4">🔥 Top 5 Cryptocurrencies</h2>
        {loading ? (
          <div className="text-center">
            <div className="spinner-border text-primary" />
          </div>
        ) : (
          <div className="table-responsive">
            <table className="table table-striped table-hover">
              <thead className="table-dark">
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Price</th>
                  <th>Change 24h</th>
                  <th>Market Cap</th>
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
                    <td>${coin.current_price?.toLocaleString()}</td>
                    <td className={coin.price_change_percentage_24h > 0
                      ? "text-success" : "text-danger"}>
                      {coin.price_change_percentage_24h?.toFixed(2)}%
                    </td>
                    <td>${coin.market_cap?.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        <div className="text-center mt-3">
          <Link to="/top-coins" className="btn btn-primary px-5">
            View Top 100 Coins
          </Link>
        </div>
      </div>

      {/* About Section */}
      <div className="container my-5">
        <h1 className="display-1 text-center mb-5">About Us</h1>
        <div className="row align-items-center">
          <div className="col-md-4">
            <img className="img-fluid rounded"
              src="https://images.pexels.com/photos/6770521/pexels-photo-6770521.jpeg"
              alt="About CoinVerse" />
          </div>
          <div className="col-md-8">
            <h2>Empowering the Future of Digital Finance</h2>
            <p>Welcome to CoinVerse, your trusted gateway to the world of
              cryptocurrency and blockchain technology. Our mission is to make
              digital finance accessible, secure, and understandable for everyone.</p>
            <p>We provide real-time cryptocurrency information, market trends,
              educational resources, and investment guidance.</p>
            <p>Join us today and be part of the digital revolution! 🚀</p>
            <Link to="/about" className="btn btn-outline-primary px-4">
              Learn More
            </Link>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-dark text-light py-5 mt-5">
        <div className="container">
          <h2 className="text-center mb-5">Why Choose CoinVerse?</h2>
          <div className="row text-center">
            <div className="col-md-4 mb-4">
              <h1>📈</h1>
              <h5>Real-time Data</h5>
              <p>Live cryptocurrency prices and market trends updated instantly.</p>
            </div>
            <div className="col-md-4 mb-4">
              <h1>🌍</h1>
              <h5>Global Coverage</h5>
              <p>Track crypto adoption and data from countries worldwide.</p>
            </div>
            <div className="col-md-4 mb-4">
              <h1>🔒</h1>
              <h5>Secure Platform</h5>
              <p>Your data is safe with our secure and encrypted platform.</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}