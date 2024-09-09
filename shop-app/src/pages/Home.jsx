import React from 'react'; // Import React library for defining the component
import { Link } from 'react-router-dom'; // Import Link component for navigation between routes
import hero1 from '../assets/hero1.jpg'; // Import hero image
import grocery from '../assets/grocery.jpg'; // Import grocery category image
import furniture from '../assets/furniture.avif'; // Import furniture category image
import { Bars } from 'react-loader-spinner'; // Import spinner component for loading state
import useFetch from './useFetch'; // Import custom hook for fetching data
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // Import FontAwesomeIcon component
import { faTruck, faCreditCard, faHeadphones, faUndo } from '@fortawesome/free-solid-svg-icons'; // Import specific FontAwesome icons
import './Home.css'; // Import CSS file for styling

const Home = () => {
  // Use the useFetch hook to fetch data from the API
  const { data: allProducts, loading, error } = useFetch("https://dummyjson.com/products");

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
  const products = allProducts?.products || [];

  // Filter the products to include only those with a rating of 4 or higher
  const popularProducts = products.filter(product => product.rating >= 4);

  return (
    <div>
      {/* Main container for the home page */}
      <div className='home-page'>
        {/* Hero section with a large image and promotional text */}
        <img className='hero-img' src={hero1} alt="Hero" />

        <div className='heading'>
          <p>KEEP CALM</p>
          <p>AND</p>
          <p>GO</p>
          <p>SHOPPING.</p>
          {/* Link to the ShopNow page with a styled button */}
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

        {/* Section showcasing grocery and furniture categories */}
        <div className='groc-fur'>
          {/* Grocery category with an image and a link */}
          <div className='grocery'>
            <img src={grocery} alt="Grocery" />
            <Link to="/Grocery" style={{ textDecoration: "none" }}>
              <button>Shop Grocery</button>
            </Link>
          </div>

          {/* Furniture category with an image and a link */}
          <div className='furniture'>
            <img src={furniture} alt="Furniture" />
            <Link to="/Furniture" style={{ textDecoration: "none" }}>
              <button>Shop Furniture</button>
            </Link>
          </div>
        </div>
      </div>

      {/* Section for popular products */}
      <h2 className='popular-products-heading'>Popular Products</h2>
      {popularProducts.length > 0 ? (
        <ul className='popular-products-list'>
          {/* Map through the popular products and display them */}
          {popularProducts.map(product => (
            <li key={product.id} className='popular-product-item'>
              {/* Link to the product detail page */}
              <Link to={`/product/${product.id}`} className='product-link'>
                <h3 className='popular-product-title'>{product.title}</h3>
                {/* Display product image */}
                <img src={product.images[0]} alt={product.title} className='popular-product-image' />  
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
