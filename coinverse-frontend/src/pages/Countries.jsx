import { useState, useEffect } from "react";

export default function Countries() {
  const [countries, setCountries] = useState([]);
  const [search,    setSearch]    = useState("");
  const [loading,   setLoading]   = useState(true);

  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all?fields=name,flags,capital,region,population")
      .then(r => r.json())
      .then(data => { setCountries(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const filtered = countries.filter(c =>
    c.name.official.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return (
    <div className="text-center my-5">
      <div className="spinner-border text-primary" role="status" />
      <p className="mt-2">Loading countries...</p>
    </div>
  );

  return (
    <div className="container my-5">
      <h1 className="text-center mb-4">All Countries</h1>
      <input
        className="form-control mb-4"
        placeholder="Search countries..."
        value={search}
        onChange={e => setSearch(e.target.value)}
      />
      <div className="row">
        {filtered.map(country => (
          <div key={country.name.official} className="col-md-4 my-3">
            <div className="card h-100">
              <img src={country.flags.svg} height="200"
                className="card-img-top" style={{objectFit:"cover"}}
                alt={country.flags.alt || country.name.official} />
              <div className="card-body">
                <h5 className="card-title">{country.name.official}</h5>
              </div>
              <ul className="list-group list-group-flush">
                <li className="list-group-item">Region: {country.region}</li>
                <li className="list-group-item">Capital: {country.capital?.[0] ?? "N/A"}</li>
                <li className="list-group-item">
                  Population: {country.population.toLocaleString()}
                </li>
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}