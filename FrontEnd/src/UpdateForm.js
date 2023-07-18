import React, { useState } from 'react';


const ProductUpdate = ({ product, onUpdate }) => {

  const [name, setName] = useState(product.name);
  const [unitPrice, setUnitPrice] = useState(product.unit_price);
  const [quantity, setQuantity] = useState(product.quantity);

  const updateProductSubmit = (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    // Retrieve the form values from the state variables
    const formData = {
      name: name,
      unitPrice: unitPrice,
      quantity: quantity
    };
    console.log(formData)
    onUpdate(formData);

    // Reset the form inputs
    setName('');
    setUnitPrice('');
    setQuantity('');
  };



  return (
    <div>


      <div>
        <h3>Update Product</h3>
        <form onSubmit={updateProductSubmit}>

          <input placeholder="Name" type="text" defaultValue={product.name} onChange={(e) => setName(e.target.value)} />
          <input placeholder="Unit Price" type="text" defaultValue={product.unit_price} onChange={(e) => { console.log(e.target.value); return setUnitPrice(e.target.value) }} />
          <input placeholder="Quantity" type="text" defaultValue={product.quantity} onChange={(e) => setQuantity(e.target.value)} />
          <button >Update</button>
        </form>
      </div>

    </div>
  );
};

export default ProductUpdate;