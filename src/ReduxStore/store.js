// store.js
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducers'; // Adjust the path based on your application's structure

const store = configureStore({
  reducer: rootReducer,
  // Add any middleware or other configuration options here
});

export default store;