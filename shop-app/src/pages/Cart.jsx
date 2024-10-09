import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import './Cart.css';

const Cart = () => {
  // Retrieve cart items from the Redux store
  const cartItems = useSelector(state => state.cart.items);
  // Get the dispatch function to send actions to the Redux store
  const dispatch = useDispatch();

  const handleRemoveFromCart = (productId) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: productId });
  };

  const calculateTotalPrice = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2);
  };

  return (
    <div className="cart">
      <h1>Your Cart</h1>
      {cartItems.length === 0 ? (     // Check if the cart is empty
        <p>Your cart is empty.</p>
      ) : (
        <div>
          <ul className="cart-items">
            {cartItems.map(item => (
              <li key={item._id} className="cart-item">
                <div className="cart-item-info">
                  <img src={item.image} alt={item.title} className="cart-item-image" />
                  <div className="cart-item-details">
                    <h2 className="cart-item-title">{item.title}</h2>
                    <p className="cart-item-price">Price: ${item.price}</p>
                    <p className="cart-item-quantity">Quantity: {item.quantity}</p>
                  </div>
                </div>
                <button 
                  className="cart-item-remove" 
                  onClick={() => handleRemoveFromCart(item._id)}
                >
                  Remove One
                </button>
              </li>
            ))}
          </ul>
          <div className="cart-summary">
            <h2>Total: ${calculateTotalPrice()}</h2>
            <Link to="/checkout">
              <button className="checkout-button">Checkout</button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
