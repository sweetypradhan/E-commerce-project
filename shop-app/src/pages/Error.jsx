import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

function Error() {
  return (
    <div className="error">
     
      <div className="error-link">
        {/* Link to navigate back to the home page */}
        <Link to="/Home" className="back-to-home">Back to Home</Link>
      </div>
    </div>
  );
}

export default Error;
