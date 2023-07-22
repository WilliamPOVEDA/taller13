import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import '../css/ProductoDetalle.css'

const ProductoDetalle = () => {

    const {prodID} = useParams();
    const [ListadoProductos, setListadoProductos] = useState([]);

    useEffect(() => {
        fetch('https://64b03f8fc60b8f941af57685.mockapi.io/Productos')
        .then((Listado) => Listado.json())
        .then((Listado) => {setListadoProductos(Listado)})
    }, []);
    const prodinfo = ListadoProductos.find(product => product.id === prodID)

    if (!prodinfo) {
        return (
            <div>
                <h1> No hay productos</h1>
            </div>
        )
    }else {
        return (
            <div className='container2'>
                <h1 className='tituloProducto'> {prodinfo.name}</h1>
                <p className='precio'> $ {prodinfo.precio}</p>
                <h2 className='descripcion'>{prodinfo.descripcion}</h2>
                <img className='imagenPro' src={prodinfo.url} />
            </div>
          )
    }
  
}

export default ProductoDetalle