// NavBar.js
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import '../styles/NavBar.css';

function NavBar() {
  const [user, setUser] = useState(auth.currentUser);
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    // Handle search submission, you can navigate to a search page or perform a search action here
    console.log(`Searching for: ${searchTerm}`);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Link to="/" className="navbar-brand">My Store</Link>
      <button
        className={`navbar-toggler ${isNavOpen ? 'collapsed' : ''}`}
        type="button"
        onClick={toggleNav}
        aria-expanded={isNavOpen ? 'true' : 'false'}
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className={`collapse navbar-collapse ${isNavOpen ? 'show' : ''}`}>
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <Link to="/productlist" className="nav-link">Products</Link>
          </li>
          <li className="nav-item">
            <form className="form-inline" onSubmit={handleSearchSubmit}>
              <input
                className="form-control"
                type="search"
                placeholder="Search"
                aria-label="Search"
                value={searchTerm}
                onChange={handleSearchChange}
              />
              <button className="btn btn-outline-success" type="submit">Search</button>
            </form>
          </li>
          <li className="nav-item">
            <Link to="/cart" className="nav-link">
              <i className="fas fa-shopping-cart"></i> Cart
            </Link>
          </li>
          {user ? (
            <li className="nav-item">
              <Link to="/profile" className="nav-link">
                {user.displayName || 'User Profile'}
              </Link>
            </li>
          ) : (
            <li className="nav-item">
              <Link to="/signin" className="nav-link">Sign In</Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default NavBar;
