import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import './BuyNow.css';  // Importing CSS for the BuyNow page

const BuyNow = () => {
  const productToBuy = useSelector((state) => state.form.addtobuynow[0]); // Get the first product to buy now
  const navigate = useNavigate();

  // If no product is selected for Buy Now, redirect to home page
  if (!productToBuy) {
    navigate('/');
    return null;
  }

  const handleCheckout = () => {
    // Add logic for handling checkout here
    alert('Proceeding to Checkout!');
    navigate('/');
  };

  return (
    <div className="buy-now-page">
      <div className="buy-now-header">
        <h2>Buy Now</h2>
      </div>
      <div className="product-details">
        <h3>{productToBuy.name}</h3>
        <p className="product-price">Price: ${productToBuy.price}</p>
        <img className="product-image" src={productToBuy.image} alt={productToBuy.name} />
      </div>
      <div className="checkout-section">
        <button className="checkout-btn" onClick={handleCheckout}>
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default BuyNow;
