// // App.js
// import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import ProductList from './components/ProductList';
// // import ProductDetail from './components/ProductDetail';
// import SignUp from './components/auth/SignUp';
// import SignIn from './components/auth/SignIn';
// import AuthDetails from './components/AuthDetails';

// function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/signin" element={<SignIn />} />
//         <Route path="/" element={<SignUp />} />
//         <Route path="/productlist" element={<ProductList />} />
//       </Routes>
//     </Router>

//   );

// }

// export default App;



// src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import UserProfile from './components/UserProfile';
import Cart from './components/Cart';
import SignIn from './components/auth/SignIn';
import { AuthProvider } from './components/AuthContext';
import ProductList from './components/ProductList';


function App() {
  // User authentication state (you can replace with your authentication logic)
  const [user, setUser] = useState(null);

  // Shopping cart state
  const [cart, setCart] = useState([]);
  
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
  <AuthProvider>
     <Router>
       <div className="App">
        <NavBar user={user} cart={cart} />
         <Routes>
          <Route path="/profile" element={<UserProfile user={user} />} />
         <Route path="/cart" element={<Cart cart={cart} onRemoveFromCart={removeFromCart} />} />
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/productlist" element={<ProductList />} />
         </Routes>
      </div>
    </Router>
</AuthProvider>
  );
}

// Example Home component (you can replace it with your own)
function Home() {
  return (
    <div>
      <h1>Welcome to our store!</h1>
      <p>Explore our products and start shopping.</p>
    </div>
  );
}

export default App;


// App.js
// import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import NavBar from './components/NavBar';
// import SignIn from './components/auth/SignIn';
// import { AuthProvider } from './components/AuthContext';

// function App() {
//   return (
//     <AuthProvider>
//       <Router>
//         <Routes>
//           <Route path="/signin" element={<SignIn />} />
//           <Route path="/" element={<NavBar />} />
//         </Routes>
//       </Router>
//     </AuthProvider>
//   );
// }

// export default App;
