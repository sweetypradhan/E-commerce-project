import React from 'react';
import useFetch from './useFetch';
import './Grocery.css'; 
import { Link } from 'react-router-dom';
import { Bars } from 'react-loader-spinner';

const Grocery = () => {
  // Use the useFetch hook to fetch products
  const { data: allProducts, loading, error } = useFetch("https://dummyjson.com/products");

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

  // Assuming `allProducts` contains a 'products' array and a 'category' field
  const products = allProducts?.products || [];

  // Filter products by category 
  const groceryProducts = products.filter(product => product.category === 'groceries');

  return (
    <div className="grocery-container">
      <h2>Grocery Products</h2>
      {groceryProducts.length > 0 ? (
        <ul className="grocery-product-list">
          {groceryProducts.map(product => (
           <Link to={`/product/${product.id}`} className='product-link'>
            <li key={product.id} className="grocery-product-item">
              <img src={product.images[0]} alt={product.title} className="grocery-product-image" />
              <h3 className="grocery-product-title">{product.title}</h3>
              <p className="grocery-product-description">{product.description}</p>
              <p className="grocery-product-price">Price: ${product.price}</p>
              <p className="grocery-product-rating">Rating: {product.rating}</p>
            </li>
            </Link>
          ))}
        </ul>
      ) : (
        <p>No grocery products found.</p>
      )}
    </div>
  );
};

export default Grocery;
