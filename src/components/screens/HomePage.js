import React from 'react';
import './HomePage.css'; // Add your CSS file for styling
import { useNavigate } from 'react-router-dom';
const HomePage = () => {
    const navigate = useNavigate();
  return (
    <div className="homepage">
      {/* Top navigation */}
      <header className="header">
        <div className="header-left">
          {/* <img src="logo-url" alt="Indiazona Logo" className="logo" />
          <img src="header-img-url" alt="Header Img" className="header-img" /> */}
        </div>
        <div className="header-middle">
          <input type="text" className="search-bar" placeholder="Bharatki Apni Dukaan" />
          <button className="search-button"><i className="fas fa-search"></i></button>
        </div>
        <div className="header-right">
          <a href="#" className="social-link">Follow @indiazona</a>
          <div className="auth-buttons">
            <button className="auth-button" onClick={()=>navigate("/RegisterForm")}>Become a Seller</button>
            <button className="auth-button">Login to Seller</button>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="main-content">
        <section className="vendor-registration">
          <div className="vendor-info">
            <h1>Vendor Registration In Progress</h1>
            <button className="become-seller"  onClick={()=>navigate("/RegisterForm")}>Become a Seller</button>
            <p>Launching soon for customers</p>
          </div>
        </section>

        <section className="products">
          <div className="product-card">
            <h2>Made in India Products</h2>
            {/* <img src="bracelet-image-url" alt="Made in India Product" /> */}
            <button className="shop-now" onClick={()=>navigate('/ListofProducts')}>Shop Now</button>
          </div>

          <div className="product-card">
            <h2>Handmade product of India</h2>
            {/* <img src="bag-image-url" alt="Handmade Bag" /> */}
            <button className="shop-now" onClick={()=>navigate('/ListofProducts')}>Shop Now</button>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer>
        <p>© 2024 Indiazona</p>
      </footer>
    </div>
  );
};

export default HomePage;
