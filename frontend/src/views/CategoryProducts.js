import { useEffect, useState, useContext } from 'react';
import { useParams, Link } from 'react-router-dom'; 
import AuthContext from '../context/AuthContext';
import ProductCard from '../components/ProductCard';
import '../styles.css';

function CategoryProducts() {
  const { id } = useParams();
  const { authTokens } = useContext(AuthContext);
  const [products, setProducts] = useState([]);
  const [categoryName, setCategoryName] = useState('');
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);  // For pagination
  const productsPerPage = 3;  // Number of products per page

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/products/category/${id}/`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authTokens?.access}`
          }
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        console.log(response);
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
        setError(error.message);
      }
    };

    const fetchCategory = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/categories/${id}/`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authTokens?.access}`
          }
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const categoryData = await response.json();
        setCategoryName(categoryData.category_name);
      } catch (error) {
        console.error('Error fetching category:', error);
        setError(error.message);
      }
    };

    fetchProducts();
    fetchCategory();
  }, [id, authTokens]);

  // Get current products to display based on pagination
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  // Calculate total pages
  const totalPages = Math.ceil(products.length / productsPerPage);

  // Handle pagination click
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Function to render pagination
  const renderPagination = () => {
    const pages = [];
    const maxDisplayedPages = 5; // Max number of buttons to display
    let startPage, endPage;

    if (totalPages <= maxDisplayedPages) {
      startPage = 1;
      endPage = totalPages;
    } else {
      const middlePage = Math.ceil(maxDisplayedPages / 2);
      if (currentPage <= middlePage) {
        startPage = 1;
        endPage = maxDisplayedPages;
      } else if (currentPage + middlePage - 1 >= totalPages) {
        startPage = totalPages - maxDisplayedPages + 1;
        endPage = totalPages;
      } else {
        startPage = currentPage - middlePage + 1;
        endPage = currentPage + middlePage - 1;
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    const paginationButtons = [];

    if (startPage > 1) {
      paginationButtons.push(1);
      if (startPage > 2) paginationButtons.push("...");
    }

    paginationButtons.push(...pages);

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) paginationButtons.push("...");
      paginationButtons.push(totalPages);
    }

    return paginationButtons.map((page, index) => (
      <button
        key={index}
        onClick={() => paginate(page)}
        className={`btn mx-1 ${page === currentPage ? 'bg-green-500 text-black' : 'bg-white text-black hover:bg-gray-200'}`}>
        {page}
      </button>
    ));
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="container text-center"> 
      <h1>{categoryName}</h1>
      <div className="row justify-content-center"> 
        {currentProducts.map(product => (
          <div className="col-md-4 col-sm-6 mb-4" key={product.product_id}>
            <ProductCard productId={product.product_id} />
          </div>
        ))}
      </div>

      {/* Pagination controls */}
      <div className="flex justify-center mt-4">
        {renderPagination()}
      </div>
    </div>
  );
}

export default CategoryProducts;
