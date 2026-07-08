import { BrowserRouter, NavLink, Route, Routes } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "./ContextApi/CartContext";
import MilkItems from "./MilkItems";
import Home from "./Home";
import VegItems from "./VegItems";
import NonVegItems from "./NonVegItems";
import Register from "./components/Register";
import Cart from "./components/Cart";
import { FiShoppingCart, FiUser, FiSearch } from "react-icons/fi";
import "./App.css";

function App() {
  const { cart } = useContext(CartContext);
  const totalQuantity = cart.reduce((acc, item) => acc + item.quantity, 0);
  const totalAmount = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <BrowserRouter>
      <div className="app-wrapper">
        <header className="main-header">
          <div className="header-container">
            <NavLink to="/home" className="logo-container">
              <span className="logo-icon">🍔</span>
              <span className="logo-text">Fresh<span className="accent-text">Food</span></span>
            </NavLink>

            <nav className="nav-links">
              <NavLink to="/home" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
                Home
              </NavLink>
              <NavLink to="/veg-items" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
                🥗 Veg
              </NavLink>
              <NavLink to="/non-veg-items" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
                🍗 Non-Veg
              </NavLink>
              <NavLink to="/milk-items" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
                🥛 Dairy
              </NavLink>
            </nav>

            <div className="header-actions">
              <div className="search-mock">
                <FiSearch className="search-icon" />
                <input type="text" placeholder="Search food..." disabled />
              </div>

              <NavLink to="/register" className={({ isActive }) => isActive ? "profile-btn active" : "profile-btn"}>
                <FiUser className="action-icon" />
                <span>Register</span>
              </NavLink>

              <NavLink to="/cart" className="cart-badge-btn">
                <div className="cart-icon-wrapper">
                  <FiShoppingCart className="action-icon" />
                  {totalQuantity > 0 && <span className="cart-count">{totalQuantity}</span>}
                </div>
                <div className="cart-price-info">
                  <span className="cart-label">Cart</span>
                  {totalQuantity > 0 && <span className="cart-subtotal">₹{totalAmount}</span>}
                </div>
              </NavLink>
            </div>
          </div>
        </header>

        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/veg-items" element={<VegItems />} />
            <Route path="/non-veg-items" element={<NonVegItems />} />
            <Route path="/milk-items" element={<MilkItems />} />
            <Route path="/register" element={<Register />} />
            <Route path="/cart" element={<Cart />} />
          </Routes>
        </main>

        <footer className="main-footer">
          <div className="footer-inner">
            <p>© 2026 BiteRush. Made with ❤️ for food lovers. Designed like Swiggy & Zomato.</p>
          </div>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
