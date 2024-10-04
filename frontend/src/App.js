import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './utils/PrivateRoute';
import Homepage from './views/Homepage';
import Registerpage from './views/Registerpage';
import Loginpage from './views/Loginpage';
import Dashboard from './views/Dashboard';
import CategoryProducts from './views/CategoryProducts';
import Navbar from './components/Navbar';
import './styles.css'; 
import 'bootstrap/dist/css/bootstrap.min.css'; // Bootstrap styles
import Products from './components/Products'
import ProductDetails from './components/ProductDetails'
import SearchResults from './components/SearchResults';


function App() {
  return (
    <Router>
      <AuthProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/login" element={<Loginpage />} />
          <Route path="/register" element={<Registerpage />} />
          <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
          <Route path="/categories/:id" element={<PrivateRoute><CategoryProducts /></PrivateRoute>} />
          <Route path="/products/:id" element={<ProductDetails />} /> 
          <Route path="/products" element={<Products />} />
          <Route path="/search/:query" element={<SearchResults />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
