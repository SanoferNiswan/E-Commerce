import React, { useEffect, useState, useContext } from 'react';
import AuthContext from '../context/AuthContext';
import '../styles.css';
import { Link } from 'react-router-dom';
 

const ProductCard = ({ productId }) => {
  const [productDetails, setProductDetails] = useState(null);
  const [error, setError] = useState(null);
  const { authTokens } = useContext(AuthContext);

  const fetchProductDetails = async () => {
    try {
      const token = authTokens?.access;
      const response = await fetch(`http://127.0.0.1:8000/api/products/${productId}/`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setProductDetails(data);
    } catch (error) {
      setError(`Error fetching product details: ${error.message}`);
    }
  };

  useEffect(() => {
    fetchProductDetails();
  }, [productId, authTokens]);

  if (error) {
    return <div>{error}</div>;
  }

  if (!productDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div className="product-card text-center">
      <img src={productDetails.image_url} alt={productDetails.product_name} />
      <h3>{productDetails.product_name}</h3>
      <p className="text-danger" style={{ textDecoration: 'line-through' }}>MRP: ₹{productDetails.mrp}</p> 
      <p style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Discounted Price: ₹{productDetails.discounted_price}</p> 
      <p>Available: {productDetails.product_count}</p>
      {/* <p>Category Name: {categoryName}</p> */}
      <Link to={`/products/${productId}`} className="btn btn-primary mt-2">View Details</Link>
    </div>
  );
};

export default ProductCard;
