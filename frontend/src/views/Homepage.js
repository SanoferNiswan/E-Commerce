import React from 'react';
import { Link } from 'react-router-dom';
import '../styles.css';
 
function Homepage() {
  return (
    <div className="container text-center">
      <h1>Welcome to E-Commerce</h1>
      <p>Sign up or login to explore our products and categories.</p>
      <Link className="btn btn-primary" to="/register">Register</Link>
      <Link className="btn btn-secondary ml-2" to="/login">Login</Link>
    </div>
  );
}

export default Homepage;
