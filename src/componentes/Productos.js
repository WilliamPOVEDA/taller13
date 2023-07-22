import React, { useEffect, useState } from "react";
import '../css/Productos.css';
import { Link } from "react-router-dom";

const Productos = () => {

  const [products, setProducts] = useState([]);
  const [categoriaFiltro, setCategoriaFiltro] = useState('');
  const [categorias, setCategorias] = useState([]);
  const [totalRegistros, setTotalRegistros] = useState(0);
  const [paginaActual, setPaginaActual] = useState(1);

  useEffect(() => {
    fetchData();
    fetchCategorias();
  }, [paginaActual, categoriaFiltro]);

  const fetchData = () => {
    const startPagina = (paginaActual -1)* 4;
    const endPagina = (startPagina +4);
    var url = 'https://64b03f8fc60b8f941af57685.mockapi.io/Productos';
    
    if(categoriaFiltro){
      url += `?categoria=${categoriaFiltro}`;
    }

    fetch(url)
      .then((Listado) => Listado.json())
      .then((Listado) => {
        const paginaData = Listado.slice(startPagina, endPagina);
        setProducts(paginaData);
        setTotalRegistros(Listado.length);
      });      
  }

  const sigPagina = () => {
    setPaginaActual(paginaActual+1);
  }

  const antPagina = () => {
    setPaginaActual(paginaActual-1);
  }

  const fetchCategorias = () => {
    fetch('https://64b03f8fc60b8f941af57685.mockapi.io/Productos')
    .then((datos) => datos.json())
    .then((datos) => {
      const catUnicas = [...new Set(datos.map((prod) => prod.categoria))];
      setCategorias(catUnicas);
    })
  }

  return (
    <div className="container1">
      <h2 className="titulop"> Listado de productos</h2>
      <div className="categorias">
        <div className="buscar1">
          Categoria:&#160;&#160;&#160;
          <select value={categoriaFiltro} onChange={(event) => setCategoriaFiltro(event.target.value)}>
            <option value=''>Todos</option>
            {categorias.map((cat, index) =>(
            <option key={index} value={cat}>{cat}</option>
            ))}
          </select>
        </div>        
        <input className="buscar2" type="tex" placeholder="Buscar" value={categoriaFiltro} onChange={(event) => setCategoriaFiltro(event.target.value)}>
        </input>
      </div>
      <div className="cardContainer1">
        {products.map( prod => (
          <div key={prod.id} className="card1"> 
            <h2 >
              <Link className="enlace" to={`/productos/${prod.id}`}>{prod.name}</Link>
            </h2>
            <br/>
            <span>
              ${prod.precio}
            </span>
            <br/><br/><br/>
            <img className="imagen1" src={prod.url} width="200px" height="200px" />
          </div>
        ))}
      </div>
      <p>Pagina {paginaActual} de {Math.ceil(totalRegistros/4)}</p>
      <button onClick={antPagina} disabled={paginaActual===1}>Anterior</button>
      <button onClick={sigPagina} disabled={paginaActual===Math.ceil(totalRegistros/4)}>Siguiente</button>
    </div>
  );
};

export default Productos;
