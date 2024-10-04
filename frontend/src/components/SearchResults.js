import React, { useEffect, useState, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import ProductCard from '../components/ProductCard'; 
import '../styles.css';
import Pagination from './Pagination';

const SearchResults = () => {
  const { query } = useParams();  // Get search query from URL parameters
  const { authTokens } = useContext(AuthContext);
  const [products, setProducts] = useState([]);
  //for pagination
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 3; // Number of products per page
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/search/?query=${query}&page=${currentPage}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authTokens?.access}`,
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        setProducts(data);  // Store the products retrieved from Solr search API
      } catch (error) {
        console.error('Error fetching products:', error);
        setError(error.message);
      }
    };

    fetchProducts();
  }, [query, currentPage, authTokens]);

  // Get current products for pagination
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  // Calculate total pages
  const totalPages = Math.ceil(products.length / productsPerPage);

  // Handle pagination click
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="container text-center">
      <h1>Search Results for "{query}"</h1>
      <div className="row justify-content-center">
        {currentProducts.map(product => (
          <div className="col-md-4 col-sm-6 mb-4" key={product.product_id}>
            <ProductCard productId={product.product_id} />
          </div>
        ))}
      </div>

      <Pagination 
        currentPage={currentPage} 
        totalPages={totalPages} 
        paginate={paginate} 
      />

      <div className="mt-4">
        <Link to="/dashboard" className="btn btn-secondary">Back to Dashboard</Link>
      </div>
    </div>
  );
};

export default SearchResults;
