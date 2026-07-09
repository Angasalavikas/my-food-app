import { useContext } from "react";
import type { Product } from "./Interface/Product";
import { CartContext } from "./ContextApi/CartContext";
import "./VegItems.css";

function VegItems() {
  const { cart, addToCart, increaseQuantity, decreaseQuantity } = useContext(CartContext);

  const vegItems: Product[] = [
    { id: 101, name: "Avocado", imageUrl: "images/veg/avacado.jpg", price: 200, description: "Fresh premium Avocado with rich nutrients" },
    { id: 102, name: "Brinjal", imageUrl: "images/veg/brinjal.png", price: 50, description: "Organic fresh Brinjal harvested daily" },
    { id: 103, name: "Broccoli", imageUrl: "images/veg/broccoli.jpg", price: 150, description: "Crisp green Broccoli rich in vitamins" },
    { id: 104, name: "Cabbage", imageUrl: "images/veg/cabbage.jpg", price: 100, description: "Fresh and clean local green Cabbage" },
    { id: 105, name: "Carrot", imageUrl: "images/veg/carrot.jpg", price: 80, description: "Sweet and crunchy farm-fresh Carrots" },
    { id: 106, name: "Ladies Finger", imageUrl: "images/veg/ladies-finger.jpg", price: 30, description: "Tender and high-quality Okra" },
    { id: 107, name: "Tomato", imageUrl: "images/veg/tomato.jpg", price: 50, description: "Juicy vine-ripened red Tomatoes" },
    { id: 108, name: "Onion", imageUrl: "images/veg/onions.jpg", price: 40, description: "Fresh red Onions direct from farmers" }
  ];

  return (
    <div className="veg-page">
      <div className="category-header">
        <h1 className="veg-heading">🥦 Fresh Vegetables 🥕</h1>
        <p className="category-subtitle">Farm-fresh, handpicked organic green selections delivered to your doorstep.</p>
      </div>

      <div className="veg-grid">
        {vegItems.map((item) => {
          const cartItem = cart.find((x) => x.id === item.id);
          return (
            <div key={item.id} className="veg-item-card">
              <div className="card-image-container">
                <img src={item.imageUrl} alt={item.name} className="veg-image" />
                <span className="card-badge bestseller">Bestseller</span>
              </div>

              <div className="card-details-box">
                <div className="item-meta">
                  <div className="food-indicator veg">
                    <span className="dot"></span>
                  </div>
                </div>
                <h2 className="veg-name">{item.name}</h2>
                <p className="veg-description">{item.description}</p>
                
                <div className="card-footer">
                  <h3 className="veg-price">₹{item.price}</h3>

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

export default VegItems;