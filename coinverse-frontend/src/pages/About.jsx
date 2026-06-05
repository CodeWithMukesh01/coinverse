export default function About() {
  return (
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
          <p>Whether you're interested in trading, investing, or learning about
            blockchain, our platform supports your journey every step of the way.</p>
          <p>Join us today and be part of the digital revolution! 🚀</p>
        </div>
      </div>
    </div>
  );
}