import React, { useState } from 'react';
import useFetch from './useFetch'; // Import your custom hook
import './Furniture.css'; // Import the CSS file for styling
import { Link } from 'react-router-dom'; // For navigation
import { Bars } from 'react-loader-spinner';

const Furniture = () => {
  const accessToken = localStorage.getItem('accessToken'); //  access token
  const { data, loading, error } = useFetch("http://localhost:5000/api/products", accessToken); 

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

  // Filter products for furniture category
  const furnitureProducts = products.filter(product => product.category.toLowerCase() === 'furniture');

  return (
    <div className="furniture-page">
      <h1>Furniture Products</h1>
      {furnitureProducts.length > 0 ? (
        <ul className="products-list">
          {furnitureProducts.map(product => (
            <li key={product._id} className="product-item">
              <Link to={`/product/${product._id}`} className="product-link">
                <img src={product.images} alt={product.title} className="product-image" />
                <h3 className="product-title">{product.title}</h3>
                <p className="product-description">{product.description}</p>
                <p className="product-price">Price: ${product.price}</p>
                <p className="product-rating">Rating: {product.rating}</p>
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p>No furniture products found.</p>
      )}
    </div>
  );
};

export default Furniture;
