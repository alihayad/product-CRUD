import React, { useEffect, useState } from 'react';
import api from './api';
import UpdateForm from './UpdateForm';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [name, setName] = useState('');
  const [unitPrice, setUnitPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = () => {
    api
      .get('api/products')
      .then(response => {
        setProducts(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  };

  const createProduct = () => {
    api
      .post('api/products', { name, unit_price: unitPrice, quantity })
      .then(response => {
        fetchProducts();
        setName('');
        setUnitPrice('');
        setQuantity('');
      })
      .catch(error => {
        console.error(error);
      });
  };

  const deleteProduct = id => {
    api
      .delete(`api/products/${id}`)
      .then(response => {
        fetchProducts();
      })
      .catch(error => {
        console.error(error);
      });
  };

  const toggleUpdateForm = product => {
    setSelectedProduct(product);
    setShowUpdateForm(!showUpdateForm);
  };

  const updateProduct = (id, updatedData) => {
    api
      .put(`api/products/${id}`,{ name:updatedData.name, unit_price: updatedData.unitPrice, quantity:updatedData.quantity })
      .then(response => {
        fetchProducts();
        setShowUpdateForm(false);
      })
      .catch(error => {
        console.error(error);
      });
  };

  return (
    <div>
      <h1>Product List</h1>
      <div>
        <h3>Add Product</h3>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Unit Price"
          value={unitPrice}
          onChange={e => setUnitPrice(e.target.value)}
        />
        <input
          type="text"
          placeholder="Quantity"
          value={quantity}
          onChange={e => setQuantity(e.target.value)}
        />
        <button onClick={createProduct}>Add</button>
      </div>
      {products.map(product => (
        <div key={product.id}>
          <h3>{product.name}</h3>
          <p>Unit Price: {product.unit_price}</p>
          <p>Quantity: {product.quantity}</p>
          <button onClick={() => deleteProduct(product.id)}>Delete</button>
          <button onClick={() => toggleUpdateForm(product)}>Update</button>
          {showUpdateForm && selectedProduct && selectedProduct.id === product.id && (
            <UpdateForm
              product={selectedProduct}
              onUpdate={updatedData => updateProduct(product.id, updatedData)}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default ProductList;
