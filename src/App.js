import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import ProductList from './component/ProductList';
import CreateProduct from './component/CreateProduct';

function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li><Link to="/">View Products</Link></li>
            <li><Link to="/create">Create Product</Link></li>
          </ul>
        </nav>
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/create" element={<CreateProduct />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
