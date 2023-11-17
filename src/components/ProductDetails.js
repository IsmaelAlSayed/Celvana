// import React from 'react';
// import { useParams } from 'react-router-dom';
// import products from './Products';
// import '../styles/ProductDetails.css'; // Import the CSS file
// import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

// function ProductDetails() {
//   const { productId } = useParams();

//   // Use find to locate the product based on its ID
//   const product = products.find((p) => p.id === parseInt(productId));

//   if (!product) {
//     // Handle the case where the product doesn't exist
//     return <div>Product not found</div>;
//   }

//   // Now you can safely access the properties of the product
//   const { name, price, description, imageUrl } = product;

//   return (
//     <div className="container">
//       <h1 className="text-center mt-4">Product Details</h1>
//       <div className="row mt-4">
//         <div className="col-12 col-md-6">
//           <img src={imageUrl} alt={name} className="img-fluid product-details-image" />
//         </div>
//         <div className="col-12 col-md-6">
//           <h2 className="product-details-name">{name}</h2>
//           <p className="product-details-price">{price}</p>
//           <p className="product-details-description">{description}</p>
//           <button className="btn btn-primary product-details-button-buy">Buy</button>
//           <button className="btn btn-success product-details-button-cart mt-2">Add to Cart</button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default ProductDetails;



// ProductDetails.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';
import '../styles/ProductDetails.css';

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProductDetails = async () => {
      if (id === undefined) {
        console.error('Invalid URL or product not found');
        return;
      }

      try {
        const productDocRef = doc(db, 'products', id);
        const productSnapshot = await getDoc(productDocRef);
        if (productSnapshot.exists()) {
          const productData = productSnapshot.data();
          setProduct(productData);
        } else {
          console.error('Product not found');
        }
      } catch (error) {
        console.error('Error fetching product details: ', error);
      }
    };

    fetchProductDetails();
  }, [id]);

  return (
    <div className="product-details-container">
      {product ? (
        <div className="product-details-card">
          <img src={product.imageUrl} alt={product.productName} />
          <h2>{product.productName}</h2>
          <p>Price: ${product.price}</p>
          <p>Description: {product.description}</p>
        </div>
      ) : (
        <p>Loading product details...</p>
      )}
    </div>
  );
};

export default ProductDetails;



