import logo from '../eCommerce-logo.jpg';
import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import '../styles.css';
import SearchBar from './SearchBar'

function Navbar() {
  const { user, logoutUser } = useContext(AuthContext);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
    console.log(user.email);
    console.log(localStorage.getItem('authTokens'))
  
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-dark">
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarTogglerDemo03"
        aria-controls="navbarTogglerDemo03"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <Link className="navbar-brand" to="/dashboard">
        <img src={logo} alt="Logo" className="navbar-logo" style={{ width: '60px', height: '100%' }} />
      </Link>

      <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
        <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
          {user && (
            <>
              <li className="nav-item">
                <Link className="nav-link text-light" to="/dashboard">Dashboard</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-light" to="/products">View All Products</Link>
              </li>
              <SearchBar/>
              {/* Search form with alignment */}
              {/* <form className="form-inline my-2 my-lg-0 ml-auto d-flex align-items-center">
                <input
                  className="form-control mr-sm-2"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                />
                <button className="btn btn-outline-success my-2 my-sm-0" type="submit">
                  Search
                </button>
              </form> */}
            </>
          )}
        </ul>

        <ul className="navbar-nav ml-auto">
          {user ? (
            <>
              <li className="nav-item dropdown ml-auto">
                <button
                  className="btn btn-outline-secondary rounded-circle profile-button"
                  onClick={toggleDropdown}
                  style={{ position: 'relative', float: 'right' }}
                >
                  {user.email ? user.email.charAt(0).toUpperCase() : 'U'}
                </button>

                {dropdownOpen && (
                  <div className="dropdown-menu dropdown-menu-right show" style={{ position: 'absolute', right: 0 }}>
                    <span className="dropdown-item-text">
                      Welcome, {user.email || 'User'} 
                    </span>
                    <div className="dropdown-divider"></div>
                    <button className="dropdown-item text-danger" onClick={logoutUser}>Logout</button>
                  </div>
                )}
              </li>
            </>
          ) : (
            <>
              <li className="nav-item">
                <Link className="nav-link text-light" to="/">Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-light" to="/login">Login</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-light" to="/register">Register</Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
