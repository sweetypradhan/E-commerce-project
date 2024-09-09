import React, { useEffect, useState } from 'react'; // Import React and necessary hooks
import { useSelector } from 'react-redux'; // Import useSelector for accessing Redux state
import './ProductList.css'; // Import CSS for styling the component

const ProductList = () => {
  const [products, setProducts] = useState([]); // State to store the list of products
  const searchQuery = useSelector(state => state.search.query); // Access search query from Redux store
  const [filteredProducts, setFilteredProducts] = useState([]); // State to store products filtered by search query

  useEffect(() => {
    // Function to fetch products from API
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://dummyjson.com/products');
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const data = await response.json();
        setProducts(data.products); // Update the state with fetched products
      } catch (error) {
        console.error('Error fetching products:', error);
       
      }
    };

    fetchProducts(); // Fetch products on component mount
  }, []); // Empty dependency array means this effect runs once on mount

  useEffect(() => {
    // Filter products based on the search query
    if (searchQuery) {
      setFilteredProducts(
        products.filter(product =>
          product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.category.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    } else {
      setFilteredProducts(products); // If no search query, show all products
    }
  }, [searchQuery, products]); // Dependency array: re-run the effect if searchQuery or products change

  return (
    <div className="product-list">
      <h1>Product List</h1> {/* Page heading */}
      {filteredProducts.length === 0 ? (
        <p>No products found.</p> // Message if no products match the search query
      ) : (
        <ul>
          {filteredProducts.map(product => (
            <li key={product.id}>
              <a href={`/products/${product.id}`} className="product-link">
                <img src={product.images[0]} alt={product.title} /> {/* Product image */}
                <h2>{product.title}</h2> {/* Product title */}
                <p className="product-description">{product.description}</p> {/* Product description */}
                <p className="product-price">Price: ${product.price}</p> {/* Product price */}
                <p className="product-rating">Rating: {product.rating}</p> {/* Product rating */}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ProductList;
