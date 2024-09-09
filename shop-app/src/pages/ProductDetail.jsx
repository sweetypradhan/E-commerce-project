import React, { useEffect, useState } from 'react'; // Import necessary hooks from React
import { useParams, useNavigate } from 'react-router-dom'; // Import hooks for routing
import { useDispatch } from 'react-redux'; // Import useDispatch hook for dispatching actions
import './ProductDetail.css'; // Import CSS for styling the component

const ProductDetail = () => {
  const { id } = useParams(); // Get the product ID from URL parameters
  const navigate = useNavigate(); // Hook for programmatic navigation
  const [product, setProduct] = useState(null); // State to hold the product details
  const [loading, setLoading] = useState(true); // State to track loading state
  const [error, setError] = useState(null); // State to track any errors during data fetching
  const dispatch = useDispatch(); // Hook to dispatch actions to the Redux store

  useEffect(() => {
    // Function to fetch product details from API
    const fetchProduct = async () => {
      try {
        const response = await fetch(`https://dummyjson.com/products/${id}`);
        if (!response.ok) {
          throw new Error('Product not found'); // Handle non-200 responses
        }
        const data = await response.json(); // Parse the JSON data
        setProduct(data); // Update the state with the product data
        setLoading(false); // Set loading to false after data is fetched
      } catch (error) {
        setError(error); // Update the state with the error
        setLoading(false); // Set loading to false even if there's an error
      }
    };

    fetchProduct(); // Call the fetchProduct function to get product details
  }, [id]); // Dependency array: re-fetch if `id` changes

  const handleAddToCart = () => {
    if (product) {
      const cartItem = {
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.images[0],
        quantity: 1, // Default quantity of the product
      };
      dispatch({ type: 'ADD_TO_CART', payload: cartItem }); // Dispatch action to add item to the cart
      navigate('/cart'); // Navigate to the cart page
    }
  };

  if (loading) {
    return <p>Loading product details...</p>; // Display loading message while fetching data
  }

  if (error) {
    return <p>Error: {error.message || 'An error occurred'}</p>; // Display error message if there's an issue
  }

  if (!product) {
    return <p>No product found.</p>; // Display message if no product data is available
  }

  return (
    <div className="product-detail">
      <h1>{product.title}</h1> {/* Display the product title */}
      <img src={product.images[0]} alt={product.title} className="product-detail-image" /> {/* Display the product image */}
      <p className="product-detail-description">{product.description}</p> {/* Display the product description */}
      <p className="product-detail-price">Price: ${product.price}</p> {/* Display the product price */}
      <p className="product-detail-rating">Rating: {product.rating}</p> {/* Display the product rating */}
      <button className="add-to-cart-button" onClick={handleAddToCart}>
        Add to Cart
      </button> {/* Button to add the product to the cart */}
    </div>
  );
};

export default ProductDetail;
