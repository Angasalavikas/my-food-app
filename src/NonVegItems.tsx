import { useContext } from "react";
import type { Product } from "./Interface/Product";
import { CartContext } from "./ContextApi/CartContext";
import "./NonVegItems.css";

function NonVegItems() {
  const { cart, addToCart, increaseQuantity, decreaseQuantity } = useContext(CartContext);

  const nonVegItems: Product[] = [
    { id: 201, name: "Bread Egg", imageUrl: "images/nonveg/breadegg.avif", price: 50, description: "Toasted bread with layered fluffy eggs" },
    { id: 202, name: "Chicken", imageUrl: "images/nonveg/chicken.avif", price: 200, description: "Fresh tender chicken cuts ready to cook" },
    { id: 203, name: "Chicken Biryani", imageUrl: "images/nonveg/chickenbiriyani.jpg", price: 200, description: "Aromatic basmati rice cooked with succulent chicken" },
    { id: 204, name: "Chicken Pizza", imageUrl: "images/nonveg/chickenpizza.avif", price: 70, description: "Cheese-loaded crust topped with spicy grilled chicken" },
    { id: 205, name: "Crab", imageUrl: "images/nonveg/crab.webp", price: 100, description: "Freshly sourced crabs perfect for curry" },
    { id: 206, name: "Fish", imageUrl: "images/nonveg/fish.jpg", price: 100, description: "Fresh water fish rich in healthy Omega-3" },
    { id: 207, name: "Mutton", imageUrl: "images/nonveg/mutton.webp", price: 750, description: "Premium quality tender boneless mutton pieces" },
    { id: 208, name: "Prawns", imageUrl: "images/nonveg/prawns.webp", price: 550, description: "Freshly cleaned and deveined marine prawns" },
  ];

  return (
    <div className="nonveg-page">
      <div className="category-header">
        <h1 className="nonveg-heading">🍗 Fresh Non-Vegetarian Items 🍤</h1>
        <p className="category-subtitle">Delectable, protein-rich seafood and meat items prepared fresh for your cravings.</p>
      </div>

      <div className="nonveg-grid">
        {nonVegItems.map((item) => {
          const cartItem = cart.find((x) => x.id === item.id);
          return (
            <div key={item.id} className="nonveg-item-card">
              <div className="card-image-container">
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className="nonveg-image"
                />
                <span className="card-badge premium">Chef's Choice</span>
              </div>

              <div className="card-details-box">
                <div className="item-meta">
                  <div className="food-indicator non-veg">
                    <span className="dot"></span>
                  </div>
                </div>
                <h2 className="nonveg-name">{item.name}</h2>
                <p className="nonveg-description">
                  {item.description}
                </p>

                <div className="card-footer">
                  <h3 className="nonveg-price">₹{item.price}</h3>

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

export default NonVegItems;