import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import UserProfile from './components/UserProfile';
import Cart from './components/Cart';
import SignIn from './components/auth/SignIn';
import SignUp from './components/auth/SignUp';
import ProductList from './components/ProductList';
import ProductDetails from './components/ProductDetails';
import AddProduct from './components/AddProduct';
import ProductDashboard from './components/ProductDashboard';

function App() {
  // User authentication state (you can replace with your authentication logic)
  const [user, setUser] = useState(null);

   // Shopping cart state
   const [cart, setCart] = useState([]); // Initialize cart as an empty array

   // Function to add a product to the cart
   const addToCart = (product) => {
     setCart([...cart, product]);
   };
 

  // Function to remove a product from the cart
  const removeFromCart = (product) => {
    const updatedCart = cart.filter((item) => item.id !== product.id);
    setCart(updatedCart);
  };

  return (
    <Router>
      <div className="App">
        <NavBar user={user} setUser={setUser} cart={cart} /> {/* Pass user, setUser, and cart as props */}
        <Routes>
          <Route path="/addproduct" element={<AddProduct />} />
          <Route path="/product-dashboard" element={<ProductDashboard />} />
          <Route path="/profile" element={<UserProfile userId={user?.id} />} />
          <Route path="/" element={<Home user={user} />} />
          <Route path="/signin" element={<SignIn setUser={setUser} />} /> {/* Pass setUser as a prop */}
          <Route path="/signup" element={<SignUp setUser={setUser} />} /> {/* Pass setUser as a prop */}
          <Route path="/productlist" element={<ProductList addToCart={addToCart} user={user} />} /> {/* Pass addToCart as a prop */}
          <Route
            path="/cart"
            element={<Cart cart={cart} onRemoveFromCart={removeFromCart} />}
          />{" "}      
          <Route path="/product/:index" element={<ProductDetails />} />
        </Routes>
      </div>
    </Router>
  );
}

// Example Home component (you can replace it with your own)
function Home(user) {
  return (
    <div>
      console.log('User Status:' + user)
      <h1>Welcome to our store!</h1>
      <p>Explore our products and start shopping.</p>
    </div>
  );
}

export default App;
