import React, { useState,useEffect } from 'react';
import './BuyNow.css'; // Assuming you have some styles defined
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Addtocart } from '../redux/formslice'; // Ensure you import your action correctly

const BuyNow = () => {
  const product = useSelector((state) => state.form.addtobuynow[0]);
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [color, setColor] = useState('green');
  const [wishlist, setWishlist] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState('');
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.form.addtocart);

  if (!product) {
    navigate('/');
    return null;
  }
const discount= (product.oldPrice - product.price)
  const handleCheckout = () => {
    // Add logic for handling checkout here
    alert('Proceeding to Checkout!');
    navigate('/Checkout');
  };

  // Quantity Handlers
  const handleIncrement = () => {
    setQuantity(quantity + 1);
    dispatch(Addtocart(product.price * (quantity + 1))); // Update for new quantity
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);
      dispatch(Addtocart(product.price * newQuantity)); // Update for new quantity
    }
  };

  // Add to Cart Handler
  const handleAddToCart = () => {
    const cartItem = { ...product, quantity };
    dispatch(Addtocart(product.price * quantity)); // Assuming this adds to cart with total price
    alert('Added to Cart!');
  };

  // Add to Wishlist Handler
  const handleAddToWishlist = () => {
    setWishlist([...wishlist, product]);
    alert('Added to Wishlist!');
  };

  // Payment Method Handler
  const handlePaymentMethodChange = (event) => {
    setPaymentMethod(event.target.value);
  };

  // Calculate total price dynamically
  const totalPrice = quantity * product.price;

  return (
    <div className="product-page">
      <h2>Select payment method</h2>
      {/* Product Image Section */}
      <div className="product-image">
        <img 
          src="path_to_your_image" 
          alt={product.name} 
          style={{ width: '400px' }}
        />
        {/* Thumbnails below the main image */}
        <div className="image-thumbnails">
          {/* Render other thumbnails */}
        </div>
      </div>

      {/* Product Details Section */}
      <div className="product-details">
        <h1>{product.name}</h1>
        <p style={{ color: 'green' }}>Made in India</p>

        <div className="pricing">
          <h2>{product.price}</h2>
          <span className="original-price">
          <strike><h2>{product.oldPrice}</h2></strike>
          </span>
          <span className="discount">{discount}%</span>
        </div>

        {/* Quantity Controls */}
        <div className="quantity-control">
          <button onClick={handleDecrement}>-</button>
          <span>{quantity}</span>
          <button onClick={handleIncrement}>+</button>
        </div>

        {/* Color Selector */}
        <div className="color-selector">
          <h4>Color</h4>
          {product.colorOptions && product.colorOptions.map((option) => (
            <button 
              key={option} 
              className={`color-circle ${color === option ? 'selected' : ''}`} 
              onClick={() => setColor(option)}
              style={{
                backgroundColor: option,
                width: '30px',
                height: '30px',
                borderRadius: '50%',
                margin: '0 10px',
                border: color === option ? '2px solid black' : 'none'
              }}
            />
          ))}
        </div>

        {/* Add to Cart and Wishlist Buttons */}
        <button className="add-to-cart" onClick={handleAddToCart}>
          <i className="fas fa-shopping-cart"></i> Add to Cart
        </button>
        <button className="wishlist" onClick={handleAddToWishlist}>
          <i className="fas fa-heart"></i>
        </button>

        {/* Payment Methods Section */}
        {/* <div className="payment-methods">
          <h4>Select Payment Method</h4>
          <select value={paymentMethod} onChange={handlePaymentMethodChange}>
            <option value="">-- Select Payment Method --</option>
            <option value="creditCard">Credit Card</option>
            <option value="debitCard">Debit Card</option>
            <option value="netBanking">Net Banking</option>
            <option value="upi">UPI</option>
          </select>
        </div> */}

        {/* Checkout Button */}
        <button 
          className="checkout" 
          onClick={handleCheckout}
          // disabled={!paymentMethod}
        >
          <i className="fas fa-check"></i> Proceed to Checkout
        </button>

        {/* Delivery Options Section */}
        <div className="delivery-options">
          {/* Delivery options code (like postal code input, etc.) */}
        </div>
      </div>
    </div>
  );
};

export default BuyNow;
