import React, { useState } from 'react';
import './Checkout.css'; // Optional for styling
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2'; 
import { useNavigate } from 'react-router-dom';
const Checkout = () => {
  const cart = useSelector((state) => state.form.addtocart);
  const [billingDetails, setBillingDetails] = useState({
    firstName: '',
    lastName: '',
    streetAddress: '',
    apartment: '',
    city: '',
    phoneNumber: '',
    email: '',
    paymentMethod: 'cash',
  });
const navigate=useNavigate();
  const [couponCode, setCouponCode] = useState('');

  let total = 0;

  cart.forEach(item => {
    // Ensure price and quantity are numbers
    const price = parseFloat(item.price);
    const quantity = parseInt(item.quantity, 10);
  
    // Check if price and quantity are valid numbers
    if (!isNaN(price) && !isNaN(quantity)) {
      total += price * quantity;
    } else {
      console.error(`Invalid price or quantity for item:`, item);
    }
  });
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBillingDetails({ ...billingDetails, [name]: value });
  };

  const handlePlaceOrder = () => {
    // Implement order placement logic here
    Swal.fire({
        title: 'Order placed!',
        text: 'Your order has been placed successfully.',
        icon: 'success',
        confirmButtonText: 'Ok'
      }).then(() => {
        // Navigate to home page after clicking "Ok"
        navigate('/ListofProducts');
      });
  };

  return (
    <div className="checkout-page">
      {/* Checkout Title */}
      <h1>Checkout</h1>

      <div className="checkout-content">
        {/* Billing Details Form */}
        <div className="billing-details">
          <h2>Billing Details</h2>
          <form>
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={billingDetails.firstName}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={billingDetails.lastName}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="streetAddress"
              placeholder="Street Address"
              value={billingDetails.streetAddress}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="apartment"
              placeholder="Apartment, Suite, etc."
              value={billingDetails.apartment}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="city"
              placeholder="Town/City"
              value={billingDetails.city}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="phoneNumber"
              placeholder="Phone Number"
              value={billingDetails.phoneNumber}
              onChange={handleInputChange}
            />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={billingDetails.email}
              onChange={handleInputChange}
            />

            {/* Checkbox aligned with the text */}
            <div className="save-info-container">
              <input type="checkbox" name="saveInfo" />
              <span>Save this information for faster checkout next time</span>
            </div>
          </form>
        </div>

        {/* Cart Summary */}
        <div className="cart-summary">
          <h2>Order Summary</h2>
          <div className="cart-items">
            {cart.map((item) => (
              <div className="cart-item" key={item.id}>
                <img src={item.image} alt={item.name} className="product-image" />
                <p>{item.name}</p>
                <p>{item.price}</p>
              </div>
            ))}
          </div>

          <div className="cart-totals">
            <p>Subtotal: ₹{total.toFixed(2)}</p>
            <p>Shipping: Free</p>
            <p>Total: ₹{total.toFixed(2)}</p>
            
            {/* Payment Method */}
            <h4>Select Payment Method</h4>
            <div className="payment-method">
              <label>
                <input
                  type="radio"
                  name="paymentMethod"
                  value="cash"
                  checked={billingDetails.paymentMethod === 'cash'}
                  onChange={handleInputChange}
                />
                {' '}Cash on delivery
              </label>
              <label>
                <input
                  type="radio"
                  name="paymentMethod"
                  value="card"
                  onChange={handleInputChange}
                />
                {' '}Credit Card
              </label>
            </div>

            {/* Coupon and Place Order */}
            <input
              type="text"
              placeholder="Coupon Code"
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
            />
            <div className="checkout-actions">
              <button className="apply-coupon">Apply Coupon</button>
              <button className="place-order" onClick={handlePlaceOrder}>
                Place Order
              </button>
            </div>
          </div>
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

export default Checkout;
