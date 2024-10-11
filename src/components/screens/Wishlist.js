import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Removefromwish } from '../redux/formslice';

const Wishlist = () => {
  const wishlist = useSelector((state) => state.form.addtowishlist);
  const dispatch = useDispatch();

  return (
    <div className="wishlist">
      <h2>Your Wishlist</h2>
      {wishlist.length === 0 ? (
        <p>Your wishlist is empty.</p>
      ) : (
        <ul>
          {wishlist.map((item) => (
            <li key={item.id}>
              {item.name} - ${item.price}
              <button onClick={() => dispatch(Removefromwish(item.id))}>
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Wishlist;
