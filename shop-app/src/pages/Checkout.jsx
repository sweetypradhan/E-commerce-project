import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import './Checkout.css';

const Checkout = () => {
  // Retrieve the cart items from the Redux store
  const cartItems = useSelector(state => state.cart.items);

  // State to manage form data for checkout
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    paymentMethod: 'Credit Card',
    shippingOption: 'Standard'
  });

  // Handler for input field changes
  // Updates the corresponding field in formData state
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Placeholder function for handling order submission
  // Currently, it just logs the form data to the console
  const handleOrder = () => {
    console.log('Order placed:', formData);
  };

  // Function to calculate the total price of items in the cart
  // Uses reduce to sum up the price of each item multiplied by its quantity
  const calculateTotalPrice = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2);
  };

  return (
    <div className="checkout">
      <h1>Checkout</h1>
      {cartItems.length === 0 ? (
        // If there are no items in the cart, display a message
        <p>Your cart is empty. Add items to your cart before checking out.</p>
      ) : (
        <div>
          <h2>Order Summary</h2>
          <ul className="checkout-items">
            {/* Iterate over cart items to display each item */}
            {cartItems.map(item => (
              <li key={item._id} className="checkout-item">
                <img src={item.image} alt={item.title} className="checkout-item-image" />
                <div className="checkout-item-details">
                  <h3 className="checkout-item-title">{item.title}</h3>
                  <p className="checkout-item-price">Price: ${item.price}</p>
                  <p className="checkout-item-quantity">Quantity: {item.quantity}</p>
                </div>
              </li>
            ))}
          </ul>
          <div className="checkout-summary">
            <h2>Total: ${calculateTotalPrice()}</h2>
          </div>
          <form className="checkout-form">
            <h2>Billing Information</h2>
            <div className="form-group">
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="phone">Phone Number:</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="address">Address:</label>
              <textarea
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="paymentMethod">Payment Method:</label>
              <select
                id="paymentMethod"
                name="paymentMethod"
                value={formData.paymentMethod}
                onChange={handleChange}
              >
                <option value="Credit Card">Credit Card</option>
                <option value="PayPal">PayPal</option>
                <option value="Bank Transfer">Bank Transfer</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="shippingOption">Shipping Option:</label>
              <select
                id="shippingOption"
                name="shippingOption"
                value={formData.shippingOption}
                onChange={handleChange}
              >
                <option value="Standard">Standard</option>
                <option value="Express">Express</option>
                <option value="Overnight">Overnight</option>
              </select>
            </div>
            <button className="place-order-button" type="button" onClick={handleOrder}>
              Place Order
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Checkout;
