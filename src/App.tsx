import { BrowserRouter, Link, Route, Routes } from "react-router-dom"
import MilkItems from "./MilkItems"
import Home from "./Home"
import VegItems from "./VegItems"
import NonVegItems from "./NonVegItems"
import './App.css'
import { FcHome } from "react-icons/fc"


function App() {
  return (
    <>
     <BrowserRouter>
    <nav>
        <Link to="/home" ><FcHome/>Home</Link>
        <Link to="/veg-items">🥗 Vegetarian Items</Link>
        <Link to="/non-veg-items">🍗 Non-Vegetarian Items</Link>
        <Link to="/milk-items">🥛 Milk Items</Link>
    </nav>

    <div className="container">
        <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/veg-items" element={<VegItems />} />
            <Route path="/non-veg-items" element={<NonVegItems />} />
            <Route path="/milk-items" element={<MilkItems />} />
        </Routes>
    </div>
</BrowserRouter>
    </>
  )
}

export default App
