import React, { useState, useEffect } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';

function App() {

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(0);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts().then(productsResp => {
      setProducts(productsResp);
    })
  });


  return (
    <div className="form">
      <h1>Introducción</h1>
      <div className="form-group">
        <label>Nombre</label>
        <input value={name} onChange={(e) => setName(e.target.value)} className="d-block" type="text"></input>
      </div>
      <div className="form-group">
        <label>Descripción</label>
        <input value={description} onChange={(e) => setDescription(e.target.value)} className="d-block" type="text"></input>
      </div>
      <div className="form-group">
        <label>Precio</label>
        <input value={price} onChange={(e) => setPrice(e.target.value)} className="d-block" type="number"></input>
      </div>
      <button onClick={() => sendForm({ name, description, price })} className="btn btn-primary">Guardar</button>
      <h1 className="mt-3 mb-3">Listado</h1>
      <table className="table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Descripcion</th>
            <th>Precio</th>
          </tr>
        </thead>
        <thead>
          {
            products && products.map((product) =>
              <tr>
                <td>{product.name}</td>
                <td>{product.description}</td>
                <td>{product.price}</td>
              </tr>
            )
          }
        </thead>
      </table>
    </div>
  );
}

const sendForm = (data) => {
  fetch(`http://localhost:4000/product`, {
    method: 'POST',
    body: JSON.stringify(data), // data can be `string` or {object}!
    headers: {
      'Content-Type': 'application/json',
    }
  }).then(res => {
    console.log(res);
  })
    .catch(error => console.error('Error:', error))
}

const getProducts = () => {
  return fetch(`http://localhost:4000/products`)
    .then(res => {
      return res.json();
    })
    .then((products) => {
      return products;
    })
    .catch(error => console.error('Error:', error))
}

export default App;
