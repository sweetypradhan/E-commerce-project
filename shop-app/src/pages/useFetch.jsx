import { useState, useEffect } from 'react';

// Custom hook for fetching data from a given URL
const useFetch = (url) => {
  // State to store the fetched data
  const [data, setData] = useState(null);
  
  // State to manage the loading state of the request
  const [loading, setLoading] = useState(true);
  
  // State to manage any errors that occur during the fetch
  const [error, setError] = useState(null);

  useEffect(() => {
    // Asynchronous function to fetch data from the provided URL
    const fetchData = async () => {
      try {
        // Perform the fetch request to the provided URL
        const response = await fetch(url);
        
        // Check if the response is OK 
        if (!response.ok) {
          // If not OK, throw an error
          throw new Error('Network response was not ok');
        }
        
        // Parse the response data as JSON
        const result = await response.json();
        
        // Update the state with the fetched data
        setData(result);
      } catch (error) {
        // If an error occurs, update the error state
        setError(error);
      } finally {
        // Set loading to false regardless of success or error
        setLoading(false);
      }
    };

    
    fetchData();
    
  // Dependency array: re-run the effect if the URL changes
  }, [url]);

  // Return an object with the fetched data, loading state, and error 
  return { data, loading, error };
};

export default useFetch;
