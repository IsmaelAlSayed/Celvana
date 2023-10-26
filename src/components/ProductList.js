import React from 'react';
import '../styles/ProductList.css'; // Import the CSS file
import ring from '../images/1.png';

function ProductList() {
  // Sample product data
  const products = [
    {
      id: 1,
      name: 'Product 1',
      price: '$19.99',
      description: 'This is the description of Product 1.',
      imageUrl: ring,
    },
    {
      id: 2,
      name: 'Product 2',
      price: '$24.99',
      description: 'This is the description of Product 2.',
      imageUrl: ring,
    },
    {
      id: 3,
      name: 'Product 3',
      price: '$24.99',
      description: 'This is the description of Product 3.',
      imageUrl: ring,
    },
    {
      id: 4,
      name: 'Product 4',
      price: '$24.99',
      description: 'This is the description of Product 4.',
      imageUrl: ring,
    },
    {
      id: 5,
      name: 'Product 5',
      price: '$24.99',
      description: 'This is the description of Product 5.',
      imageUrl: ring,
    },
    {
      id: 6,
      name: 'Product 6',
      price: '$24.99',
      description: 'This is the description of Product 6.',
      imageUrl: ring,
    },
    {
      id: 7,
      name: 'Product 7',
      price: '$24.99',
      description: 'This is the description of Product 7.',
      imageUrl: ring,
    },
    {
      id: 8,
      name: 'Product 8',
      price: '$24.99',
      description: 'This is the description of Product 8.',
      imageUrl: ring,
    },
    // Add more products here
  ];

  return (
    <div className="product-list">
      {products.map((product) => (
        <div className="product" key={product.id}>
          <img src={product.imageUrl} alt={product.name} />
          <h3>{product.name}</h3>
          <p>{product.price}</p>
          <p>{product.description}</p>
          <button>Add to Cart</button>
        </div>
      ))}
    </div>
  );
}

export default ProductList;
