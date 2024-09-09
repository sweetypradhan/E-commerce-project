import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartReducer';
import searchReducer from './searchReducer';

const store = configureStore({
  reducer: {
    cart: cartReducer,
    search: searchReducer,
  },
});

export default store;

