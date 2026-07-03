import "./Home.css";

function Home() {
  return (
    <div className="home-container">
      <div className="home-card">
        <h1 className="home-title">🍽️ Welcome to Food App 🍽️</h1>

        <p className="home-text">
          Fresh Vegetables 🥦 | Delicious Non-Veg 🍗 | Pure Milk Products 🥛
        </p>

        <button className="home-btn">🛒 Order Now</button>
      </div>
    </div>
  );
}

export default Home;