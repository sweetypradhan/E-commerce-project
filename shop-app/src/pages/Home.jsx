import React from 'react';
import { Link } from 'react-router-dom';
import hero1 from '../assets/hero1.jpg';
import grocery from '../assets/grocery.jpg';
import furniture from '../assets/furniture.avif';
import { Bars } from 'react-loader-spinner';
import useFetch from './useFetch';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTruck, faCreditCard, faHeadphones, faUndo } from '@fortawesome/free-solid-svg-icons';
import './Home.css';

const Home = () => {
  const accessToken = localStorage.getItem('accessToken'); // Get access token 
  const { data, loading, error } = useFetch("http://localhost:5000/api/products", accessToken); 

  // Display a loading spinner while data is being fetched
  if (loading) {
    return (
      <div className="loader">
        <Bars
          visible={true}
          height="120"
          width="120"
          ariaLabel="dna-loading"
          wrapperStyle={{}}
          wrapperClass="dna-wrapper"
        />
      </div>
    );
  }

  // Display an error message if there's an issue fetching the data
  if (error) {
    return <p>Error: {error.message || 'An error occurred'}</p>;
  }

  // Extract the products array from the fetched data
  const products = data || [];

  // Filter the products to include only those with a rating of 4 or higher
  const popularProducts = products.filter(product => product.rating >= 4);

  return (
    <div>
      <div className='home-page'>
        <img className='hero-img' src={hero1} alt="Hero" />

        <div className='heading'>
          <p>KEEP CALM</p>
          <p>AND</p>
          <p>GO</p>
          <p>SHOPPING.</p>
          <Link to="/shopNow" style={{ textDecoration: "none" }}>
            <button>Shop Now</button>
          </Link>
        </div> 

        <div className='services'>
          <ul>
            <li><FontAwesomeIcon icon={faTruck} /> Free Shipping</li>
            <li><FontAwesomeIcon icon={faCreditCard} /> Secure Payment</li>
            <li><FontAwesomeIcon icon={faHeadphones} /> 24/7 Support</li>
            <li><FontAwesomeIcon icon={faUndo} /> Easy Returns</li>
          </ul>
        </div>

        <div className='groc-fur'>
          <div className='grocery'>
            <img src={grocery} alt="Grocery" />
            <Link to="/Grocery" style={{ textDecoration: "none" }}>
              <button>Shop Grocery</button>
            </Link>
          </div>

          <div className='furniture'>
            <img src={furniture} alt="Furniture" />
            <Link to="/Furniture" style={{ textDecoration: "none" }}>
              <button>Shop Furniture</button>
            </Link>
          </div>
        </div>
      </div>

      <h2 className='popular-products-heading'>Popular Products</h2>
      {popularProducts.length > 0 ? (
        <ul className='popular-products-list'>
          {popularProducts.map(product => (
            <li key={product._id} className='popular-product-item'>
              <Link to={`/product/${product._id}`} className='product-link'>
                <h3 className='popular-product-title'>{product.title}</h3>
                <img src={product.images} alt={product.title} className='popular-product-image' />
                <p className='popular-product-description'>{product.description}</p>
                <p className='popular-product-price'>Price: ${product.price}</p>
                <p className='popular-product-rating'>Rating: {product.rating}</p>
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p>No popular products found.</p>
      )}
    </div>
  );
};

export default Home;
