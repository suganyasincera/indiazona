import React from 'react';
import Product from './Product';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import '@fortawesome/fontawesome-free/css/all.min.css'; // Import Font Awesome

const ListofProducts = () => {
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.form.addtocart);
  const wishItems = useSelector((state) => state.form.addtowishlist);
  const products = [
    { id: 1, name: 'Laptop', price: 1000 },
    { id: 2, name: 'Smartphone', price: 500 },
    { id: 3, name: 'Headphones', price: 100 },
    { id: 4, name: 'Tablet', price: 300 },
  ];

  // Styles
  const topBarStyle = {
    display: 'flex',
    justifyContent: 'flex-end',
    padding: '10px',
    backgroundColor: '#f8f8f8',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
    position: 'sticky',
    top: 0,
    zIndex: 1000,
  };

  const iconStyle = {
    fontSize: '24px',
    position: 'relative',
    cursor: 'pointer',
    padding: '10px',
    backgroundColor: '#fff',
    borderRadius: '50%',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)',
  };

  const badgeStyle = {
    position: 'absolute',
    top: '-8px',
    right: '-8px',
    backgroundColor: 'red',
    color: 'white',
    borderRadius: '50%',
    padding: '4px 6px',
    fontSize: '12px',
  };

  return (
    <div className="App">
      <h1 style={{ textAlign: 'center', margin: '20px 0' }}>E-commerce Store</h1>
      <div style={topBarStyle}>
        {/* Cart Icon */}
        <span style={iconStyle} onClick={() => navigate('/Cart')}>
          <i className="fas fa-shopping-cart"></i>
          <span style={badgeStyle}>{cartItems.length}</span>
        </span>
        {/* Wishlist Icon */}
        <span style={iconStyle} onClick={() => navigate('/Wishlist')}>
          <i className="fas fa-heart"></i>
          <span style={badgeStyle}>{wishItems.length}</span>
        </span>
      </div>

      <div className="products" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around' }}>
        {products.map((product) => (
          <Product key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ListofProducts;
