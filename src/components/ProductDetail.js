import React from 'react';

const ProductDetail = ({ product }) => {
  return (
    <div>
      <h1>{product.name}</h1>
      <img src={product.image} alt={product.name} />
      <p>{product.description}</p>
      <p>{product.price}</p>
      <button onClick={() => /* Handle Buy */}>Buy</button>
      <button onClick={() => /* Handle Add to Cart */ }>Add to Cart</button>
    </div>
  );
};

export default ProductDetail;
