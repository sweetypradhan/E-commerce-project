import React from 'react';
import useFetch from './useFetch'; // Import your custom hook
import './Grocery.css'; // Import the CSS file for styling
import { Link } from 'react-router-dom'; // For navigation
import { Bars } from 'react-loader-spinner';

const Grocery = () => {
  const accessToken = localStorage.getItem('accessToken'); // Get access token
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

  // Filter products for the 'groceries' category
  const groceryProducts = products.filter(product => product.category.toLowerCase() === 'groceries');

  return (
    <div className="grocery-container">
      <h2>Grocery Products</h2>
      {groceryProducts.length > 0 ? (
        <ul className="grocery-product-list">
          {groceryProducts.map(product => (
            <li key={product._id} className="grocery-product-item">
              <Link to={`/product/${product._id}`} className='product-link'>
                <img src={product.images} alt={product.title} className="grocery-product-image" />
                <h3 className="grocery-product-title">{product.title}</h3>
                <p className="grocery-product-description">{product.description}</p>
                <p className="grocery-product-price">Price: ${product.price}</p>
                <p className="grocery-product-rating">Rating: {product.rating}</p>
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p>No grocery products found.</p>
      )}
    </div>
  );
};

export default Grocery;
