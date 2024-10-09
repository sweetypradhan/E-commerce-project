import React from 'react';
import useFetch from './useFetch'; // Import your custom hook
import { Link } from 'react-router-dom'; // For navigation
import './Makeup.css'; // Import the CSS file for styling
import { Bars } from 'react-loader-spinner';

const Makeup = () => {
  const accessToken = localStorage.getItem('accessToken'); // Get access token 
  const { data, loading, error } = useFetch("http://localhost:5000/api/products", accessToken); // Fetch products

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

  if (error) {
    return <p>Error: {error.message || 'An error occurred'}</p>;
  }

  // Log all products for debugging
  console.log("All Products:", data);

  // Assuming data is an array of products
  const products = data || [];

  // Filter products for the 'beauty' category
  const beautyProducts = products.filter(product => product.category.toLowerCase() === 'beauty');
  

  return (
    <div className="makeup-page">
      <h1>Beauty Products</h1>
      {beautyProducts.length > 0 ? (
        <div className='products-grid'>
          {beautyProducts.map(product => (
            <Link to={`/product/${product._id}`} key={product._id} className='product-card'>
              <img src={product.images} alt={product.title} className='product-image' />
              <div className='product-info'>
                <h3 className='product-title'>{product.title}</h3>
                <p className='product-description'>{product.description}</p>
                <p className='product-price'>Price: ${product.price}</p>
                <p className='product-rating'>Rating: {product.rating}</p>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <p>No beauty products found.</p>
      )}
    </div>
  );
};

export default Makeup;
