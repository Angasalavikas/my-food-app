import "./MilkItems.css";

interface MilkItem {
  id: number;
  name: string;
  img: string;
  price: number;
  description: string;
}

function MilkItems() {
  const milkItems: MilkItem[] = [
    {
      id: 1,
      name: "Butter",
      img: "images/milk/butter.webp",
      price: 50,
      description: "Fresh butter made from cow milk",
    },
    {
      id: 2,
      name: "Cheese",
      img: "images/milk/cheese.jpg",
      price: 60,
      description: "Fresh cheese made from buffalo milk",
    },
    {
      id: 3,
      name: "Curd",
      img: "images/milk/curd.webp",
      price: 70,
      description: "Fresh curd made from cow milk",
    },
    {
      id: 4,
      name: "Ice Cream",
      img: "images/milk/icecreams.jpg",
      price: 80,
      description: "Fresh ice cream made from cow milk",
    },
    {
      id: 5,
      name: "Milk",
      img: "images/milk/milk.png",
      price: 90,
      description: "Fresh milk",
    },
    {
      id: 6,
      name: "Yogurt",
      img: "images/milk/yogurt.jpg",
      price: 100,
      description: "Fresh yogurt made from cow milk",
    },
  ];

  return (
    <div className="milk-page">

      <h1 className="milk-heading">
        🥛 Fresh Milk Products 🧈
      </h1>

      <ul className="milk-grid">
        {milkItems.map((item) => (
          <li key={item.id} className="milk-item-card">

            <img
              src={item.img}
              alt={item.name}
              className="milk-image"
            />

            <h2 className="milk-name">{item.name}</h2>

            <p className="milk-description">
              {item.description}
            </p>

            <h3 className="milk-price">
              ₹ {item.price}
            </h3>

            <button className="milk-btn">
              🛒 Purchase
            </button>

          </li>
        ))}
      </ul>

    </div>
  );
}

export default MilkItems;