
import React, { useState } from 'react';
import { storage, db } from '../firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { addDoc, collection } from 'firebase/firestore';
import '../styles/AddProduct.css';


const AddProduct = () => {
  const [productName, setProductName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState(''); // To display success or error message

  var time = new Date();

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  const handleAddProduct = async () => {
    if (!productName || !price || !description || !image) {
      setMessage('Please fill in all fields and select an image');
      return;
    }

    const storageRef = ref(storage, `productImages/${image.name}+${time}`);
    await uploadBytes(storageRef, image);
    const imageUrl = await getDownloadURL(storageRef);

    const productData = {
      productName,
      price,
      description,
      imageUrl,
    };

    try {
      await addDoc(collection(db, 'products'), productData);
      setMessage('Product added successfully');
    } catch (error) {
      console.error('Error adding product: ', error);
      setMessage('Unable to add the product. There was an issue.');
    }

    setProductName('');
    setPrice('');
    setDescription('');
    setImage(null);
    time = new Date();
  };

  return (
    <div className="add-product-container">
      <h2>Add Product</h2>
      <input
        type="text"
        placeholder="Product Name"
        value={productName}
        onChange={(e) => setProductName(e.target.value)}
      />
      <input
        type="number"
        placeholder="Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <input type="file" accept="image/*" onChange={handleImageUpload} />
      <button onClick={handleAddProduct}>Add Product</button>
      {message && <p className={message.includes('successfully') ? 'success' : 'error'}>{message}</p>}
    </div>
  );
};

export default AddProduct;

