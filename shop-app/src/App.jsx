import React, { Suspense, lazy } from 'react';
import Header from './component/header';
import { BrowserRouter, Routes, Route } from 'react-router-dom'; // Importing routing components
import Login from './pages/Login';
import Footer from './component/Footer';
import Makeup from './pages/Makeup';
import Fragrances from './pages/Fragrances';
import Home from './pages/Home';
import ProductDetail from './pages/ProductDetail';
import Grocery from './pages/Grocery';
import Furniture from './pages/Furniture';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Error from './pages/Error';
import Signup from './pages/Signup';

// Lazy load the ShopNow component
const ShopNow = lazy(() => import('./pages/ShopNow'));

function App() {
  return (
    <div>
      <BrowserRouter>
        <Header />
         {/* Suspense component to handle the loading state of lazy-loaded components */}
        <Suspense fallback={<div>Loading...</div>}>
         {/* Routes component defines all the routes of the application */}
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path='/Login' element={<Login />} />
            <Route path="/Signup" element={<Signup />} />
            <Route path='/Cart' element={<Cart />} />
            <Route path='/Makeup' element={<Makeup />} />
            <Route path='/Fragrances' element={<Fragrances />} />
            <Route path='/ShopNow' element={<ShopNow />} />
            <Route path="/Grocery" element={<Grocery />} />
            <Route path="/Furniture" element={<Furniture />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="*" element={<Error />} /> {/* Catch-all route for unknown paths */}
          </Routes>
        </Suspense>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
