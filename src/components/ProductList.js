
import React, { useState, useEffect } from "react";
import { auth, db } from "../firebase";
import { collection, getDocs, doc, setDoc, getDoc } from "firebase/firestore";
import '../styles/ProductList.css';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const user = auth.currentUser;
  
  
  useEffect(() => {
    // Fetch product data from Firestore
    const fetchProducts = async () => {
      const productsCollection = collection(db, "products");
      const querySnapshot = await getDocs(productsCollection);
      const productsData = querySnapshot.docs.map((doc) => {
        return { id: doc.id, ...doc.data() };
      });
      setProducts(productsData);

      // Fetch user's cart data from Firestore if the user is logged in
      if (user) {
        console.log("User is logged in.1");
        const cartCollection = collection(db, "carts", user.uid, "items");
        const cartQuerySnapshot = await getDocs(cartCollection);
        const cartData = cartQuerySnapshot.docs.map((doc) => {
          return { id: doc.id, ...doc.data() };
        });
        setCart(cartData);
      }else {
        console.log("User is not logged in.2");
      }
    };
    fetchProducts();
  }, [user]);


  const addToCart = async (product) => {

    if (user) {
      const cartItemRef = doc(db, "carts", user.uid, "items", product.id);
  
      try {
        const cartItemDoc = await getDoc(cartItemRef);
  
        const productData1 = {
          productName: product.productName,
          productImage: product.imageUrl,
          productPrice: product.price, // Save product price
          quantity: 1, // Initialize quantity to 1
        };
  
        if (cartItemDoc.exists()) {
          // If the item already exists in the cart, update its quantity
          const currentQuantity = cartItemDoc.data().quantity || 0;
          productData1.quantity = currentQuantity + 1;
        }
  
        await setDoc(cartItemRef, productData1);
  
      } catch (error) {
        console.error("Error adding product to cart:", error);
      }
    } else {
      console.log("User is not logged in.");
    }
  };
  
  
  return (
    <div className="product-list-container">
      {products.map((product) => (
        <div className="product-card" key={product.id}>
          <img src={product.imageUrl} alt={product.productName} />
          <h3>{product.productName}</h3>
          <p>Price: ${product.price}</p>
          <p>Description: {product.description}</p>
          <button onClick={() => addToCart(product)}>Add to Cart</button>
          <button>Buy</button>
        </div>
      ))}
    </div>
  );
};

export default ProductList;





