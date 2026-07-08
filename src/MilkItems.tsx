import { useContext } from "react";
import type { Product } from "./Interface/Product";
import { CartContext } from "./ContextApi/CartContext";
import "./MilkItems.css";

function MilkItems() {
  const { cart, addToCart, increaseQuantity, decreaseQuantity } = useContext(CartContext);

  const milkItems: Product[] = [
    {
      id: 301,
      name: "Butter",
      imageUrl: "images/milk/butter.webp",
      price: 50,
      description: "Creamy rich butter churned from pure cow milk",
    },
    {
      id: 302,
      name: "Cheese",
      imageUrl: "images/milk/cheese.jpg",
      price: 60,
      description: "Grated cheddar cheese made from premium buffalo milk",
    },
    {
      id: 303,
      name: "Curd",
      imageUrl: "images/milk/curd.webp",
      price: 70,
      description: "Thick probiotic curd fermented naturally",
    },
    {
      id: 304,
      name: "Ice Cream",
      imageUrl: "images/milk/icecreams.jpg",
      price: 80,
      description: "Classic rich vanilla ice cream made with real dairy cream",
    },
    {
      id: 305,
      name: "Milk",
      imageUrl: "images/milk/milk.png",
      price: 90,
      description: "Pasteurized farm-fresh full cream milk",
    },
    {
      id: 306,
      name: "Yogurt",
      imageUrl: "images/milk/yogurt.jpg",
      price: 100,
      description: "Silky greek yogurt with pure cow milk goodness",
    },
  ];

  return (
    <div className="milk-page">
      <div className="category-header">
        <h1 className="milk-heading">🥛 Fresh Milk Products 🧈</h1>
        <p className="category-subtitle">Nutritious and pure dairy essentials sourced from standard organic farms.</p>
      </div>

      <div className="milk-grid">
        {milkItems.map((item) => {
          const cartItem = cart.find((x) => x.id === item.id);
          return (
            <div key={item.id} className="milk-item-card">
              <div className="card-image-container">
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className="milk-image"
                />
                <span className="card-badge dairy">100% Pure</span>
              </div>

              <div className="card-details-box">
                <div className="item-meta">
                  <div className="food-indicator veg">
                    <span className="dot"></span>
                  </div>
                </div>
                <h2 className="milk-name">{item.name}</h2>
                <p className="milk-description">
                  {item.description}
                </p>

                <div className="card-footer">
                  <h3 className="milk-price">₹{item.price}</h3>

                  <div className="action-container">
                    {cartItem ? (
                      <div className="quantity-controller">
                        <button className="qty-btn dec" onClick={() => decreaseQuantity(item.id)}>−</button>
                        <span className="qty-val">{cartItem.quantity}</span>
                        <button className="qty-btn inc" onClick={() => increaseQuantity(item.id)}>+</button>
                      </div>
                    ) : (
                      <button className="add-btn" onClick={() => addToCart(item)}>
                        ADD <span className="plus">+</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default MilkItems;