import { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Import useNavigate
import AuthContext from '../context/AuthContext';
import '../styles.css';

function ProductDetails() {
  const { id } = useParams(); 
  const navigate = useNavigate(); // Initialize useNavigate
  const { authTokens } = useContext(AuthContext);
  const [productDetails, setProductDetails] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/products/${id}/`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${authTokens?.access}`,
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

    fetchProductDetails();
  }, [id, authTokens]);

  const handleBack = () => {
    navigate(-1); // Go back to the previous page
  };

  if (error) {
    return <div>{error}</div>;
  }

  if (!productDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container text-center">
      <h1>{productDetails.product_name}</h1>
      <img src={productDetails.image_url} alt={productDetails.product_name} />
      <p className="text-danger" style={{ textDecoration: 'line-through' }}>MRP: ₹{productDetails.mrp}</p>
      <p style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Discounted Price: ₹{productDetails.discounted_price}</p>
      <p>Available: {productDetails.product_count}</p>
      <p>Description: {productDetails.product_description}</p> 
      <p>Tags: {productDetails.tags}</p> 
      <button onClick={handleBack} className="btn btn-secondary ">Back</button> 
      <button className="btn btn-success">Add to Cart</button> 
    </div>
  );
}

export default ProductDetails;
