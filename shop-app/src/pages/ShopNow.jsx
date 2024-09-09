import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import useFetch from './useFetch'; // Import your custom hook
import { Link } from 'react-router-dom'; // For navigation
import './ShopNow.css'; // Import the CSS file for styling
import { setSearchQuery } from '../redux/searchReducer'; // Import the action creator
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { Bars } from 'react-loader-spinner';

const ShopNow = () => {
  const dispatch = useDispatch();
  const searchQuery = useSelector(state => state.search.query); // Get the search query from the Redux store

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

  const products = allProducts?.products || [];

  // Filter products based on search query
  const filteredProducts = products.filter(product =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handle input changes for search
  const handleSearchChange = (event) => {
    dispatch(setSearchQuery(event.target.value));
  };

  return (
    <div className="shop-now-page">
      <div className="search-bar">
        <FontAwesomeIcon icon={faSearch} className="search-icon" />
        <input 
          type="text" 
          placeholder="Search..." 
          value={searchQuery} // Bind input value to the search query from Redux store
          onChange={handleSearchChange} 
        />
      </div>
      <h1>All Products</h1>
      {filteredProducts.length > 0 ? (
        <ul className='products-list'>
          {filteredProducts.map(product => (
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
        <p>No products found.</p>
      )}
    </div>
  );
};

export default ShopNow;
