import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, getDocs, doc, setDoc, deleteDoc, onSnapshot } from 'firebase/firestore';
import { storage } from '../firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import '../styles/ProductDashboard.css';
import { useNavigate } from 'react-router-dom';

const ProductDashboard = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [editingProductId, setEditingProductId] = useState(null);
  const [editedProduct, setEditedProduct] = useState({});
  const [newImage, setNewImage] = useState(null);

  var time = new Date();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'products'));
        const productData = [];
        querySnapshot.forEach((doc) => {
          productData.push({ id: doc.id, ...doc.data() });
        });
        setProducts(productData);
      } catch (error) {
        console.error('Error fetching products: ', error);
      }
    };

    // Attach a real-time listener to the products collection
    const unsubscribe = onSnapshot(collection(db, 'products'), () => {
      // This will trigger the fetchData function when a product is added or edited
      fetchData();
    });

    // Don't forget to unsubscribe from the listener when the component unmounts
    return () => {
      unsubscribe();
    };
  }, []); // An empty dependency array ensures this effect runs once when the component mounts

  const handleEdit = (product) => {
    setEditingProductId(product.id);
    setEditedProduct({ ...product });
    setNewImage(null);
  };
  const handleSaveEdit = async () => {
    if (editedProduct.id) {
      try {
        if (newImage) {
          const storageRef = ref(storage, `productImages/${newImage.name} + ${time}`);
          await uploadBytes(storageRef, newImage);
          const imageUrl = await getDownloadURL(storageRef);
          editedProduct.imageUrl = imageUrl;
        }

        const productDocRef = doc(db, 'products', editedProduct.id);
        await setDoc(productDocRef, editedProduct);
        setEditingProductId(null);
        setEditedProduct({});
        navigate('/product-dashboard');
        time = new Date();
      } catch (error) {
        console.error('Error editing product: ', error);
      }
    }
  };

  const handleCancelEdit = () => {
    setEditingProductId(null);
    setEditedProduct({});
    setNewImage(null);
  };

  const handleRemove = async (productId) => {
    if (window.confirm('Are you sure you want to remove this product?')) {
      try {
        const productDocRef = doc(db, 'products', productId);
        await deleteDoc(productDocRef);
        navigate('/product-dashboard');
      } catch (error) {
        console.error('Error removing product: ', error);
      }
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setNewImage(file);
  };

  return (
    <div className="product-dashboard-container">
      <h2>Product Management Dashboard</h2>
      <ul className='dashboard-style'>
        {products.map((product) => (
          <li key={product.id} className="product-card">
            {editingProductId === product.id ? (
              <>
                <input
                  type="text"
                  value={editedProduct.productName}
                  onChange={(e) =>
                    setEditedProduct({ ...editedProduct, productName: e.target.value })
                  }
                />
                <input
                  type="number"
                  value={editedProduct.price}
                  onChange={(e) => setEditedProduct({ ...editedProduct, price: e.target.value })}
                />
                <textarea
                  value={editedProduct.description}
                  onChange={(e) =>
                    setEditedProduct({ ...editedProduct, description: e.target.value })
                  }
                />
                <input type="file" accept="image/*" onChange={handleImageChange} />
                <button className="save-button" onClick={handleSaveEdit}>
                  Save
                </button>
                <button className="cancel-button" onClick={handleCancelEdit}>
                  Cancel
                </button>
              </>
            ) : (
              <>
                <img src={product.imageUrl} alt={product.productName} className="product-image" />
                <h3>{product.productName}</h3>
                <p>Price: ${product.price}</p>
                <p>Description: {product.description}</p>
                <button className="edit-button" onClick={() => handleEdit(product)}>
                  Edit
                </button>
                <button className="remove-button" onClick={() => handleRemove(product.id)}>
                  Remove
                </button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductDashboard;

