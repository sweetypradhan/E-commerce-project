import React from 'react';
import useFetch from './useFetch';
import './Furniture.css'; // Import the CSS file for styling
import { Link } from 'react-router-dom'; // For navigation
import { Bars } from 'react-loader-spinner';

const Furniture = () => {
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

  // Assuming 'allProducts' contains a 'products' array and a 'category' field
  const products = allProducts?.products || [];

  // Filter products by category 
  const furnitureProducts = products.filter(product => product.category === 'furniture');

  return (
    <div className="furniture-page">
      <h1>Furniture Products</h1>
      {furnitureProducts.length > 0 ? (
        <ul className="products-list">
          {furnitureProducts.map(product => (
            <li key={product.id} className="product-item">
              
              <Link to={`/product/${product.id}`} className="product-link">
                <img src={product.images[0]} alt={product.title} className="product-image" />
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
