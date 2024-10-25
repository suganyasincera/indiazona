import React, { useState, useEffect } from 'react';
import './Cart.css'; // Optional for styling
import { useSelector, useDispatch } from 'react-redux';
import { Removefromcart, UpdateQuantity } from '../redux/formslice'; // Assuming UpdateQuantity action exists to update individual item quantity
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const navigate = useNavigate();
  const cart = useSelector((state) => state.form.addtocart);
  const dispatch = useDispatch();
  const [quantityById, setQuantityById] = useState({}); // Store quantities per item

  useEffect(() => {
    // Initialize quantity by ID
    const initialQuantities = {};
    cart.forEach((item) => {
      initialQuantities[item.id] = item.quantity || 1; // Use the existing quantity in the cart
    });
    setQuantityById(initialQuantities);
  }, [cart]);

  // Handle quantity change
  const handleQuantityChange = (id, quantity) => {
    const newQuantity = parseInt(quantity, 10);
    if (newQuantity > 0) {
      setQuantityById((prev) => ({
        ...prev,
        [id]: newQuantity,
      }));
      // Dispatch updated quantity to Redux store
      dispatch(UpdateQuantity({ id, quantity: newQuantity, location: 'cart' }));
    }
  };

  // Remove item from cart
  const handleRemoveItem = (id) => {
    dispatch(Removefromcart(id));
  };

  // Calculate total price
  const getTotalPrice = () => {
    return cart.reduce((total, item) => {
      const price = parseFloat(item.price);
      const quantity = item.quantity;
      if (!isNaN(price) && !isNaN(quantity)) {
        return total + price * quantity;
      }
      return total;
    }, 0).toFixed(2); // Ensure total is a fixed decimal
  };

  return (
    <div className="cart-page">
      {/* Cart Title */}
      <h1>Shopping Cart</h1>

      {/* Cart Table */}
      <table className="cart-table">
        <thead>
          <tr>
            <th>Product</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Subtotal</th>
          </tr>
        </thead>
        <tbody>
          {cart.map((item) => (
            <tr key={item.id}>
              <td>
                {/* Product Image with Remove Icon */}
                <div className="product-info">
                  <img src={item.image} className="product-image" alt={item.name} />
                  <div className="product-name">{item.name}</div>
                </div>
              </td>
              <td>₹{item.price}</td>
              <td>
                <input
                  type="number"
                  value={quantityById[item.id] || item.quantity} // Show updated quantity or fallback to initial quantity
                  onChange={(e) => handleQuantityChange(item.id, e.target.value)}
                  min="1"
                  className="quantity-input"
                />
              </td>
              <td>
                ₹{(item.price * (quantityById[item.id] || item.quantity)).toFixed(2)}{' '}
                <button className="remove-icon" onClick={() => handleRemoveItem(item.id)}>
                  &times; {/* Simple "X" for remove icon */}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Coupon and Total */}
      <div className="cart-actions">
        <div className="cart-total">
          <h3>Order Summary</h3>
          <p>Subtotal: ₹{getTotalPrice()}</p>
          <p>Shipping: Free</p>
          <p>Total: ₹{getTotalPrice()}</p>
          <button className="checkout-btn" onClick={() => navigate('/Checkout')}>
            Proceed to Checkout
          </button>
        </div>
      </div>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-info">
          <div className="footer-column">
            <h4>Exclusive</h4>
            <p>Subscribe to get our latest updates!</p>
          </div>
          <div className="footer-column">
            <h4>Support</h4>
            <p>Email: support@shop.com</p>
            <p>Phone: 123-456-7890</p>
          </div>
          <div className="footer-column">
            <h4>Account</h4>
            <a href="#">Login / Register</a>
            <a href="#">Wishlist</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Cart;
