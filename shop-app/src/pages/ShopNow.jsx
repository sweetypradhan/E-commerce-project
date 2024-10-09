import React, { useState } from 'react';
import useFetch from './useFetch';
import { Bars } from 'react-loader-spinner';
import { Link } from 'react-router-dom';

export default function ShopNow() {
  const accessToken = localStorage.getItem('accessToken');
  const { data, loading, error } = useFetch("http://localhost:5000/api/products", accessToken);
  console.log("data----------", data);

  const [searchQuery, setSearchQuery] = useState('');

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

  // Filter products based on search query
  const filteredProducts = data.filter(product =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handle input changes for search
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <div>
      <h1>All Products</h1>
      <input 
        style={{marginLeft:"650px"}}
        type="text" 
        placeholder="Search products..." 
        value={searchQuery} 
        onChange={handleSearchChange} 
      />
      {filteredProducts.length > 0 ? (
        <ul className='products-list'>
          {filteredProducts.map(product => (
            <li key={product._id} className='product-item'>
              <Link to={`/product/${product._id}`} className='product-link'> 
                <h3 className='product-title'>{product.title}</h3>
                <img src={product.images} alt={product.title} className='product-image' />
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
}








