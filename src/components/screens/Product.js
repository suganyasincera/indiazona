import React from 'react';
import { useDispatch } from 'react-redux';
import { Addtocart, Addtowishlist, Addtobuynow } from '../redux/formslice';
import { useNavigate } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css'; // Import Font Awesome

const Product = ({ product }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleBuy = (product) => {
    dispatch(Addtobuynow(product));
    navigate('/BuyNow');
  };

  // Styles
  const productStyle = {
    border: '1px solid #ddd',
    borderRadius: '8px',
    padding: '16px',
    margin: '16px',
    maxWidth: '250px',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
    backgroundColor: '#fff',
    transition: 'transform 0.2s ease',
  };

  const buttonStyle = {
    padding: '8px 16px',
    margin: '10px 0',
    borderRadius: '4px',
    border: 'none',
    cursor: 'pointer',
    fontSize: '14px',
  };

  const addToCartButtonStyle = {
    ...buttonStyle,
    backgroundColor: '#f0ad4e',
    color: '#fff',
  };

  const addToWishlistButtonStyle = {
    ...buttonStyle,
    backgroundColor: '#5bc0de',
    color: '#fff',
  };

  const buyNowButtonStyle = {
    ...buttonStyle,
    backgroundColor: '#5cb85c',
    color: '#fff',
  };

  return (
    <div style={productStyle}>
      <h3>{product.name}</h3>
      <p>Price: ${product.price}</p>
      <button style={addToCartButtonStyle} onClick={() => dispatch(Addtocart(product))}>
        Add to Cart
      </button>
      <button style={addToWishlistButtonStyle} onClick={() => dispatch(Addtowishlist(product))}>
        Add to Wishlist
      </button>
      <button style={buyNowButtonStyle} onClick={() => handleBuy(product)}>
        Buy Now
      </button>
    </div>
  );
};

export default Product;
