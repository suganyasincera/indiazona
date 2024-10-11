import React from 'react';
import './App.css';
import HomePage from './components/screens/HomePage'; 
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';// Use BrowserRouter for routing
import RegisterForm from './components/screens/RegisterForm';
import { Provider } from 'react-redux';
import {store} from './components/redux/store';
import ListofProducts from './components/screens/ListofProducts';
import Cart from './components/screens/Cart';
import Wishlist from './components/screens/Wishlist';
import BuyNow from './components/screens/BuyNow';

function App() {
  return (
    <Provider store ={store}>
    <Router> {/* Wrap the Routes with BrowserRouter */}
      <Routes>
        <Route exact path="/" element={<HomePage/>} /> 
        <Route exact path="/RegisterForm" element={<RegisterForm/>} />
        <Route exact path="/ListofProducts" element={<ListofProducts/>} />
        <Route exact path="/Cart" element={<Cart/>} />  
        <Route exact path="/Wishlist" element={<Wishlist/>} /> 
        <Route exact path="/BuyNow" element={<BuyNow/>} />    {/* Ensure component name is capitalized */}
      </Routes>
    </Router>
    </Provider>
  );
}

export default App;
