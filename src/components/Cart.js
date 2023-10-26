// src/components/Cart.js
import React from 'react';

const Cart = ({ cart, onRemoveFromCart }) => {
  return (
    <div>
      <h1>Shopping Cart</h1>
      <ul>
        {cart.map((product) => (
          <li key={product.id}>
            {product.name} - ${product.price}
            <button onClick={() => onRemoveFromCart(product)}>Remove</button>
          </li>
        ))}
      </ul>
      {/* Add options to select products and make a purchase here */}
    </div>
  );
};

export default Cart;
