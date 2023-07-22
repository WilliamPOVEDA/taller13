import { Link, Route, Routes } from "react-router-dom";
import "../css/App.css";
import Login from "./Login";
import Productos from "./Productos";
import ProductoDetalle from "./ProductoDetalle";

function App() {
  return (
    <div>
      <nav className="menu">
        <Link to='/'>Inicio</Link>
        <Link to='/productos'>Productos</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Login/>}></Route>
        <Route path="/productos" element={<Productos/>}></Route>
        <Route path="/productos/:prodID" element={<ProductoDetalle/>}></Route> 
      </Routes>
    </div>
  );
}

export default App;
