import React, { useState } from 'react';
import useFetch from './useFetch'; // Import your custom hook
import { Link } from 'react-router-dom'; // For navigation
import './Makeup.css'; // Import the CSS file for styling
import { Bars } from 'react-loader-spinner';

const Makeup = () => {
  // Use the useFetch hook to fetch products
  const { data: allProducts, loading, error } = useFetch("https://dummyjson.com/products");

  const [sortCriteria, setSortCriteria] = useState('priceAsc');

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

  // Assuming `allProducts` contains a 'products' array
  const products = allProducts?.products || [];

  // Filter products for beauty category 
  const beautyProducts = products.filter(product => product.category === 'beauty');

  // Sort the products based on selected criteria
  const sortedProducts = beautyProducts.sort((a, b) => {
    switch (sortCriteria) {
      case 'priceAsc':
        return a.price - b.price;
      case 'priceDesc':
        return b.price - a.price;
      case 'ratingAsc':
        return a.rating - b.rating;
      case 'ratingDesc':
        return b.rating - a.rating;
      case 'nameAsc':
        return a.title.localeCompare(b.title);
      case 'nameDesc':
        return b.title.localeCompare(a.title);
      default:
        return 0;
    }
  });

  return (
    <div className="makeup-page">
      <h1>Beauty Products</h1>

      <div className="sort-options">
        <label htmlFor="sort">Sort by:</label>
        <select
          id="sort"
          value={sortCriteria}
          onChange={(e) => setSortCriteria(e.target.value)}
        >
          <option value="priceAsc">Price: Low to High</option>
          <option value="priceDesc">Price: High to Low</option>
          <option value="ratingAsc">Rating: Low to High</option>
          <option value="ratingDesc">Rating: High to Low</option>
          <option value="nameAsc">Name: A to Z</option>
          <option value="nameDesc">Name: Z to A</option>
        </select>
      </div>

      {sortedProducts.length > 0 ? (
        <ul className='products-list'>
          {sortedProducts.map(product => (
            <li key={product.id} className='product-item'>
              <Link to={`/product/${product.id}`} className='product-link'>
                <h3 className='product-title'>{product.title}</h3>
                <img src={product.images[0]} alt={product.title} className='product-image' />
                <p className='product-description'>{product.description}</p>
                <p className='product-price'>Price: ${product.price}</p>
                <p className='product-rating'>Rating: {product.rating}</p>
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p>No beauty products found.</p>
      )}
    </div>
  );
};

export default Makeup;
