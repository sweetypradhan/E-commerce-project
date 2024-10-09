import React from 'react';
import './Header.css';
import logo from '../assets/logo.jpg';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';

function Header() {
  // Access cart items from Redux store
  const cartItems = useSelector(state => state.cart.items);

  // Calculate the total quantity of items in the cart
  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className='navbar'>
      <nav>
        <div className='nav-logo'>
          <img src={logo} alt='logo' width='130px'/>
        </div>

        <div className="nav-menu">
          <ul>
            <Link to="/Home" style={{textDecoration:"none"}}>
              <li>Home</li>
            </Link>
            <Link to="/Makeup" style={{textDecoration:"none"}}>
              <li>Makeup</li>
            </Link>
            <Link to="/Fragrances" style={{textDecoration:"none"}}>
              <li>Fragrances</li>
            </Link>
          </ul>
        </div>

        <div className="nav-icon">
          <Link to="/" style={{textDecoration:"none", color:"black"}}>
            <FontAwesomeIcon icon={faUser} />
          </Link>
          <Link to="/Cart" style={{textDecoration:"none", color:"black"}}>
            <div className="cart-icon-container">
              <FontAwesomeIcon icon={faShoppingCart} />
              {totalQuantity > 0 && (
                <span className="cart-item-count">{totalQuantity}</span>
              )}
            </div>
          </Link>
        </div>
      </nav>
    </div>
  );
}

export default Header;
