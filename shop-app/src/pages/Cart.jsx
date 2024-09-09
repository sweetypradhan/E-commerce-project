import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import './Cart.css';

const Cart = () => {
  const cartItems = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  const handleRemoveFromCart = (productId) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: productId }); // Dispatch action object directly
  };

  const calculateTotalPrice = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2);
  };

  return (
    <div className="cart">
      <h1>Your Cart</h1>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          <ul className="cart-items">
            {cartItems.map(item => (
              <li key={item.id} className="cart-item">
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
                  onClick={() => handleRemoveFromCart(item.id)} // Dispatch action object directly
                >
                  Remove
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
