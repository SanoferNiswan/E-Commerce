import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import '../styles.css'; // Ensure you have the basic CSS

const Products = () => {
  const { authTokens } = useContext(AuthContext);
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1); // Pagination state
  const productsPerPage = 3; // Number of products per page
  const navigate = useNavigate();

  useEffect(() => {
    fetchCategories();
    fetchProducts(); // Fetch all products and categories initially
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/categories/', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authTokens?.access}`,
        },
      });
      if (!response.ok) throw new Error('Failed to fetch categories');
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      setError(error.message);
    }
  };

  const fetchProducts = async (category_id = '') => {
    try {
      const url = category_id
        ? `http://127.0.0.1:8000/api/products/category/${category_id}/`
        : 'http://127.0.0.1:8000/api/products/';

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authTokens?.access}`,
        },
      });
      if (!response.ok) throw new Error('Failed to fetch products');
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleCategoryChange = (event) => {
    const categoryId = event.target.value;
    setSelectedCategory(categoryId);
    setCurrentPage(1); // Reset to first page on category change
    fetchProducts(categoryId); // Fetch products filtered by selected category
  };

  const viewProductDetails = (productId) => {
    navigate(`/products/${productId}`);
  };

  // Pagination logic
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  const totalPages = Math.ceil(products.length / productsPerPage);

  const handleClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Pagination rendering logic

  const renderPagination = () => {
    const paginationButtons = [];
    const totalPages = Math.ceil(products.length / productsPerPage);
    const maxVisibleButtons = 2;
  
    // Add the first 2 page buttons
    for (let i = 1; i <= Math.min(2, totalPages); i++) {
      paginationButtons.push(
        <button
          key={i}
          onClick={() => handleClick(i)}
          className={`px-4 py-2 mx-1 border rounded-lg ${
            i === currentPage
              ? 'bg-green-500 text-black'
              : 'bg-white text-black hover:bg-gray-200'
          }`}
        >
          {i}
        </button>
      );
    }
  
    // Show ellipsis if there are pages between the first few and current page
    if (currentPage > maxVisibleButtons + 1) {
      paginationButtons.push(<span key="ellipsis1" className="mx-1">...</span>);
    }
  
    // Add buttons around the current page
    const start = Math.max(3, currentPage - 1);
    const end = Math.min(totalPages - 2, currentPage + 1);
  
    for (let i = start; i <= end; i++) {
      paginationButtons.push(
        <button
          key={i}
          onClick={() => handleClick(i)}
          className={`px-4 py-2 mx-1 border rounded-lg ${
            i === currentPage
              ? 'bg-green-500 text-black'
              : 'bg-white text-black hover:bg-gray-200'
          }`}
        >
          {i}
        </button>
      );
    }
  
    // Show ellipsis if there are pages between current page and the last few
    if (currentPage < totalPages - maxVisibleButtons) {
      paginationButtons.push(<span key="ellipsis2" className="mx-1">...</span>);
    }
  
    // Add the last 2 page buttons
    for (let i = totalPages - 1; i <= totalPages; i++) {
      if (i > 2) {
        paginationButtons.push(
          <button
            key={i}
            onClick={() => handleClick(i)}
            className={`px-4 py-2 mx-1 border rounded-lg ${
              i === currentPage
                ? 'bg-green-500 text-black'
                : 'bg-white text-black hover:bg-gray-200'
            }`}
          >
            {i}
          </button>
        );
      }
    }
  
    return paginationButtons;
  };

  return (
    <div className="container mx-auto px-4 py-6 mt-16">
      <h1 className="text-center mb-4">All Products</h1>
      <div className="filter-section mb-4 text-center">
        <label htmlFor="categoryFilter" className="mr-2">Filter by Category:</label>
        <select
          id="categoryFilter"
          value={selectedCategory}
          onChange={handleCategoryChange}
          className="p-2 border rounded-md"
        >
          <option value="">All Categories</option>
          {categories.map((category) => (
            <option key={category.category_id} value={category.category_id}>
              {category.category_name}
            </option>
          ))}
        </select>
      </div>

      <div className="row justify-content-center"> 
        {currentProducts.length > 0 ? (
          currentProducts.map((product) => (
            <div key={product.product_id} className="col-md-4 mb-4">
              <div className="product-card text-center"> 
                <img src={product.image_url} alt={product.product_name} className="product-img" />
                <h3>{product.product_name}</h3>
                <p className="text-danger" style={{ textDecoration: 'line-through' }}>
                  MRP: <del>₹{product.mrp}</del>
                </p>
                <p className="discounted-price">
                  Discounted Price: <strong>₹{product.discounted_price}</strong>
                </p>
                <p>Available: {product.product_count}</p>
                <button onClick={() => viewProductDetails(product.product_id)} className="btn btn-primary">View Details</button>
              </div>
            </div>
          ))
        ) : (
          <p>No products available for this category.</p>
        )}
      </div>

      {/* Pagination Controls */}
      <div className="pagination-controls mt-4 flex justify-center space-x-2">
        {renderPagination()}
      </div>
    </div>
  );
};

export default Products;

