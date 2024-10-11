import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Removefromcart } from '../redux/formslice';

const Cart = () => {
  const cart = useSelector((state) => state.form.addtocart);
  const dispatch = useDispatch();

  return (
    <div className="cart">
      <h2>Your Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul>
          {cart.map((item) => (
            <li key={item.id}>
              {item.name} - ${item.price} (Quantity: {item.quantity})
              <button onClick={() => dispatch(Removefromcart(item.id))}>
                Remove 1
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Cart;
