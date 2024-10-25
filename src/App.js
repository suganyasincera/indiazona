import React from 'react';
import './App.css';
import HomePage from './components/screens/HomePage'; 
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';// Use BrowserRouter for routing
import RegisterForm from './components/screens/RegisterForm';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './components/redux/store';
import ListofProducts from './components/screens/ListofProducts';
import Cart from './components/screens/Cart';
import Wishlist from './components/screens/Wishlist';
import BuyNow from './components/screens/BuyNow';
import Checkout from './components/screens/Checkout';
import ProductDetails from './components/screens/ProductDetails';
import ProceedtoBuy from './components/screens/ProceedtoBuy';

function App() {
  return (
    <Provider store ={store}>
        <PersistGate loading={null} persistor={persistor}>
    <Router> {/* Wrap the Routes with BrowserRouter */}
      <Routes>
        <Route exact path="/" element={<HomePage/>} /> 
        <Route exact path="/RegisterForm" element={<RegisterForm/>} />
        <Route exact path="/ListofProducts" element={<ListofProducts/>} />
        <Route exact path="/Cart" element={<Cart/>} />  
        <Route exact path="/Wishlist" element={<Wishlist/>} /> 
        <Route exact path="/BuyNow" element={<BuyNow/>} />  
        <Route exact path="/Checkout" element={<Checkout/>} /> 
        <Route exact path="/ProductDetails" element={<ProductDetails/>} />  
        <Route exact path="/ProceedtoBuy" element={<ProceedtoBuy/>} /> {/* Ensure component name is capitalized */}
      </Routes>
    </Router>
    </PersistGate>
    </Provider>
  );
}

export default App;
