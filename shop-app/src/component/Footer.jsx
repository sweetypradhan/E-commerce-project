import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faInstagram, faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import './Footer.css'; // Import the CSS file for footer styling

const Footer = () => {
  return (
    <footer className='footer'>
      <div className='footer-content'>
        <div className='footer-links'>
          <a href='/about'>About Us</a>
          <a href='/contact'>Contact</a>
          <a href='/privacy'>Privacy Policy</a>
          <a href='/terms'>Terms of Service</a>
        </div>
        <div className='footer-social'>
          <FontAwesomeIcon icon={faFacebook} className='social-icon' />
          <FontAwesomeIcon icon={faTwitter} className='social-icon' />
          <FontAwesomeIcon icon={faInstagram} className='social-icon' />
          <FontAwesomeIcon icon={faWhatsapp} className='social-icon' />
        </div>
        <div className='footer-info'>
          <p>&copy; {new Date().getFullYear()} Your Company Name. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
