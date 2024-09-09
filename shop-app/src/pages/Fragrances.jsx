import React from 'react';
import useFetch from './useFetch'; // Import your custom hook
import { Link } from 'react-router-dom'; // For navigation
import './Fragrances.css'; // Import the CSS file for styling
import { Bars } from 'react-loader-spinner';

const Fragrances = () => {
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

  // Assuming 'allProducts' contains a 'products' array
  const products = allProducts?.products || [];

  // Filter products for the 'fragrances' category
  const fragranceProducts = products.filter(product => product.category === 'fragrances');

  return (
    <div className="fragrances-page">
      <h1>Fragrances</h1>
      {fragranceProducts.length > 0 ? (
        <div className='products-grid'>
          {fragranceProducts.map(product => (
            <Link to={`/product/${product.id}`} key={product.id} className='product-card'>
              <img src={product.images[0]} alt={product.title} className='product-image' />
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
        <p>No fragrance products found.</p>
      )}
    </div>
  );
};

export default Fragrances;
