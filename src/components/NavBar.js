
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../components/AuthContext'; // Import the useAuth hook
import '../styles/NavBar.css';

function NavBar({ cart }) {
  const user = useAuth();

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Link to="/" className="navbar-brand">My Store</Link>
      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link to="/productlist" className="nav-link">Products</Link>
          </li>
        </ul>
        <div className="d-flex align-items-center ml-auto">
          <form className="form-inline w-70">
            <input className="form-control form-control-lg w-100" type="search" placeholder="Search" aria-label="Search" />
            <Link to="/search" className="btn btn-outline-success btn-lg ml-2">
              Search
            </Link>
          </form>
          <Link to="/cart" className="nav-link ml-2">
            <i className="fas fa-shopping-cart"></i> Cart ({cart.length})
          </Link>
          {user ? (
            // Render user-specific content when signed in
            <Link to="/profile" className="nav-link ml-2">
              <i className="fas fa-user"></i> User Profile
            </Link>
          ) : (
            // Render sign-in link when not signed in
            <Link to="/signin" className="nav-link ml-2">Sign In</Link>
          )}
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
