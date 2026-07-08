import type { CSSProperties } from "react";
import { Link } from "react-router-dom";
import { FiArrowRight, FiPercent, FiTruck, FiShield } from "react-icons/fi";
import "./Home.css";

function Home() {
  const promos = [
    {
      id: 1,
      code: "EAT50",
      discount: "50% OFF",
      desc: "Up to ₹150 on your favorite meals",
      bg: "linear-gradient(135deg, #ff9966, #ff5e62)",
      icon: <FiPercent />
    },
    {
      id: 2,
      code: "FREEDEL",
      discount: "FREE DELIVERY",
      desc: "On all orders above ₹200",
      bg: "linear-gradient(135deg, #02aab0, #00cdac)",
      icon: <FiTruck />
    }
  ];

  const categories = [
    {
      id: 1,
      title: "🥗 Vegetarian Items",
      description: "Farm fresh vegetables and clean organic greens",
      count: "8 Items",
      link: "/veg-items",
      color: "#22c55e",
      image: "images/veg/broccoli.jpg"
    },
    {
      id: 2,
      title: "🍗 Non-Vegetarian Items",
      description: "Delicious and rich seafood, poultry and meats",
      count: "8 Items",
      link: "/non-veg-items",
      color: "#ef4444",
      image: "images/nonveg/chickenbiriyani.jpg"
    },
    {
      id: 3,
      title: "🥛 Milk & Dairy Items",
      description: "Pure butter, fresh cottage cheese, curd and cream",
      count: "6 Items",
      link: "/milk-items",
      color: "#0ea5e9",
      image: "images/milk/butter.webp"
    }
  ];

  return (
    <div className="home-page-container">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <span className="hero-badge">⚡ Fastest Delivery in Town</span>
          <h1 className="hero-title">
            Discover the best food & drinks in your town
          </h1>
          <p className="hero-subtitle">
            Freshly prepared meals, premium organic veggies, and pure dairy essentials delivered in 20 minutes.
          </p>

          <div className="hero-cta-group">
            <Link to="/veg-items" className="hero-btn primary">
              Order Veg Now <FiArrowRight />
            </Link>
            <Link to="/non-veg-items" className="hero-btn secondary">
              Explore Non-Veg
            </Link>
          </div>
        </div>
        <div className="hero-image-mock">
          {/* A visual representation of a food platter/bowl */}
          <div className="circle-bg"></div>
          <img
            src="images/nonveg/chickenbiriyani.jpg"
            alt="Delicious Biryani Platter"
            className="floating-food"
            onError={(e) => {
              // Fallback to high quality external image if local fails
              (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?q=80&w=600&auto=format&fit=crop";
            }}
          />
        </div>
      </section>

      {/* Promos Section */}
      <section className="promos-section">
        <h2 className="section-title">Exclusive Offers For You</h2>
        <div className="promos-grid">
          {promos.map((promo) => (
            <div
              key={promo.id}
              className="promo-card"
              style={{ background: promo.bg }}
            >
              <div className="promo-icon-wrapper">
                {promo.icon}
              </div>
              <div className="promo-text-wrapper">
                <span className="promo-badge-tag">LIMITED OFFER</span>
                <h3>{promo.discount}</h3>
                <p>{promo.desc}</p>
                <div className="promo-code-container">
                  Use Code: <span className="promo-code">{promo.code}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Categories Section */}
      <section className="categories-section">
        <h2 className="section-title">Browse by Category</h2>
        <p className="section-subtitle">Choose from our curated premium lists</p>

        <div className="categories-grid">
          {categories.map((cat) => (
            <Link to={cat.link} key={cat.id} className="category-card" style={{ '--accent-color': cat.color } as CSSProperties}>
              <div className="cat-img-box">
                <img src={cat.image} alt={cat.title} />
              </div>
              <div className="cat-content-box">
                <span className="cat-item-count" style={{ backgroundColor: `${cat.color}15`, color: cat.color }}>
                  {cat.count}
                </span>
                <h3>{cat.title}</h3>
                <p>{cat.description}</p>
                <span className="cat-link-btn" style={{ color: cat.color }}>
                  Explore Menu <FiArrowRight className="arrow-icon" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Features Trust Badges */}
      <section className="trust-section">
        <div className="trust-item">
          <FiTruck className="trust-icon" />
          <h4>Superfast Delivery</h4>
          <p>Delivered within 20 mins right to your doorstep</p>
        </div>
        <div className="trust-item">
          <FiShield className="trust-icon" />
          <h4>100% Safe & Hygenic</h4>
          <p>Zero contact packaging & daily staff temperature checks</p>
        </div>
        <div className="trust-item">
          <FiArrowRight className="trust-icon" style={{ transform: "rotate(-45deg)" }} />
          <h4>Live Order Tracking</h4>
          <p>Know exactly where your delivery agent is at all times</p>
        </div>
      </section>
    </div>
  );
}

export default Home;