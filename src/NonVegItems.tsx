import "./NonVegItems.css";

interface NonVegItem {
  id: number;
  name: string;
  img: string;
  price: number;
  description: string;
}

function NonVegItems() {
  const nonVegItems: NonVegItem[] = [
    { id: 1, name: "Bread Egg", img: "images/nonveg/breadegg.avif", price: 500, description: "Fresh Bread Egg" },
    { id: 2, name: "Chicken", img: "images/nonveg/chicken.avif", price: 600, description: "Fresh Chicken" },
    { id: 3, name: "Chicken Biryani", img: "images/nonveg/chickenbiriyani.jpg", price: 800, description: "Fresh Chicken Biryani" },
    { id: 4, name: "Chicken Pizza", img: "images/nonveg/chickenpizza.avif", price: 700, description: "Fresh Chicken Pizza" },
    { id: 5, name: "Crab", img: "images/nonveg/crab.webp", price: 900, description: "Fresh Crab" },
    { id: 6, name: "Fish", img: "images/nonveg/fish.jpg", price: 1000, description: "Fresh Fish" },
    { id: 7, name: "Mutton", img: "images/nonveg/mutton.webp", price: 750, description: "Fresh Mutton" },
    { id: 8, name: "Prawns", img: "images/nonveg/prawns.webp", price: 850, description: "Fresh Prawns" },
  ];

  return (
    <div className="nonveg-page">

      <h1 className="nonveg-heading">🍗 Fresh Non-Vegetarian Items 🍤</h1>

      <ul className="nonveg-grid">
        {nonVegItems.map((item) => (
          <li key={item.id} className="nonveg-item-card">

            <img
              src={item.img}
              alt={item.name}
              className="nonveg-image"
            />

            <h2 className="nonveg-name">{item.name}</h2>

            <p className="nonveg-description">
              {item.description}
            </p>

            <h3 className="nonveg-price">₹ {item.price}</h3>

            <button className="nonveg-btn">
              🛒 Purchase
            </button>

          </li>
        ))}
      </ul>

    </div>
  );
}

export default NonVegItems;