import "./VegItems.css";

interface VegItem {
  id: number;
  name: string;
  img: string;
  price: number;
  description: string;
}

function VegItems() {
  const vegItems: VegItem[] = [
    { id: 1, name: "Avocado", img: "images/veg/avacado.jpg", price: 250, description: "Fresh Avocado" },
    { id: 2, name: "Brinjal", img: "images/veg/brinjal.png", price: 200, description: "Fresh Brinjal" },
    { id: 3, name: "Broccoli", img: "images/veg/broccoli.jpg", price: 150, description: "Fresh Broccoli" },
    { id: 4, name: "Cabbage", img: "images/veg/cabbage.jpg", price: 180, description: "Fresh Cabbage" },
    { id: 5, name: "Carrot", img: "images/veg/carrot.jpg", price: 220, description: "Fresh Carrot" },
    { id: 6, name: "Ladies Finger", img: "images/veg/ladies-finger.jpg", price: 300, description: "Fresh Ladies Finger" },
    { id: 7, name: "Tomato", img: "images/veg/tomato.jpg", price: 350, description: "Fresh Tomato" },
    { id: 8, name: "Onion", img: "images/veg/onions.jpg", price: 400, description: "Fresh Onion" }
  ];

  return (
    <div className="veg-page">

      <h1 className="veg-heading">🥦 Fresh Vegetables 🥕</h1>

      <ul className="veg-grid">
        {vegItems.map((item) => (
          <li key={item.id} className="veg-item-card">

            <img src={item.img} alt={item.name} className="veg-image" />

            <h2 className="veg-name">{item.name}</h2>

            <p className="veg-description">{item.description}</p>

            <h3 className="veg-price">₹ {item.price}</h3>

            <button className="veg-btn">🛒 Purchase</button>

          </li>
        ))}
      </ul>

    </div>
  );
}

export default VegItems;