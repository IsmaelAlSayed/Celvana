
import React, { useState, useEffect } from "react";
import { auth, db } from "../firebase";
import { collection, doc, deleteDoc, getDocs, writeBatch } from "firebase/firestore";
import { useNavigate } from 'react-router-dom';
import '../styles/Cart.css';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const user = auth.currentUser;
  const cartCollection = user ? collection(db, "carts", user.uid, "items") : null;
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      getCartItems();
    } else {
      const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
      setCartItems(savedCart);
    }
  }, [user]);

  const handleRemoveSelected = async () => {
    try {
      if (user) {
        if (selectAll) {
          // If "Select All" is checked, delete all items
          const cartRef = collection(db, "carts", user.uid, "items");
          const querySnapshot = await getDocs(cartRef);
  
          const deletePromises = [];
          querySnapshot.forEach((doc) => {
            const itemRef = doc.ref; // Use doc.ref to get the DocumentReference
            deletePromises.push(deleteDoc(itemRef));
            navigate('/productlist');
          });
  
          await Promise.all(deletePromises);
        } else {
          // Delete selected items individually
          selectedItems.forEach(async (docId) => {
            const itemRef = doc(db, "carts", user.uid, "items", docId);
            await deleteDoc(itemRef);
          });
        }
  
        // Update the local state after deleting items
        const updatedCart = cartItems.filter((item) => !selectedItems.includes(item.id));
        setCartItems(updatedCart);
  
        // Update the local storage
        localStorage.setItem('cart', JSON.stringify(updatedCart));
  
        setSelectedItems([]);
      }
    } catch (error) {
      console.error("Error removing selected items: ", error);
    }
  };
  

  


  
  
  const getCartItems = async () => {
    try {
      if (cartCollection) {
        const querySnapshot = await getDocs(cartCollection);
        const cartData = [];

        querySnapshot.forEach((doc) => {
          cartData.push({
            id: doc.id,
            ...doc.data(),
          });
        });

        setCartItems(cartData);
        localStorage.setItem('cart', JSON.stringify(cartData));
      }
    } catch (error) {
      console.error("Error fetching cart items: ", error);
    }
  };

  const handleItemSelect = (docId) => {
    if (selectedItems.includes(docId)) {
      setSelectedItems(selectedItems.filter((id) => id !== docId));
    } else {
      setSelectedItems([...selectedItems, docId]);
    }
  };

  return (
    <div className="cart-container">
      <h2>Your Cart</h2>
      <label>
        <input
          type="checkbox"
          checked={selectAll}
          onChange={() => setSelectAll(!selectAll)}
        />
        Select All
      </label>
      <ul>
        {cartItems.map((item) => (
          <li key={item.id} className="cart-item">
            <label className="product-container">
              <input
                type="checkbox"
                checked={selectAll || selectedItems.includes(item.id)}
                onChange={() => handleItemSelect(item.id)}
              />
              <img src={item.productImage} alt={item.productName} className="product-image" />
              <div className="product-details">
                <p className="product-name">{item.productName}</p>
                <p className="product-price">Price: ${item.productPrice}</p>
                <p className="product-quantity">Quantity: {item.quantity}</p>
              </div>
            </label>
          </li>
        ))}
      </ul>
      <button onClick={handleRemoveSelected}>Remove Selected</button>
    </div>
  );
};

export default Cart;

