import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector,useDispatch } from 'react-redux';
import '@fortawesome/fontawesome-free/css/all.min.css'; // Import Font Awesome
import { Addtocart, Addtowishlist, Addtobuynow } from '../redux/formslice';
import image from '../../assets/image.png';
import shirtImage from '../../assets/shirt.jpg';
import juhiImage from '../../assets/juhi.jpeg';
import leeImage from '../../assets/lee.jpeg';
import teakwoodImage from '../../assets/teakwood.jpeg';
import handbagImage from '../../assets/handbag.jpeg';
import Swal from 'sweetalert2'; // Import SweetAlert
const ListofProducts = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleAddToCart = (product) => {
    dispatch(Addtocart(product));
    
    // Trigger SweetAlert after adding to cart
    Swal.fire({
      title: 'Added to Cart!',
      text: `${product.name} has been added to your cart.`,
      icon: 'success',
      confirmButtonText: 'Continue Shopping'
    });
  };

  // Handlers
  const handleBuy = (product) => {
    dispatch(Addtobuynow({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity:1
    }));
    navigate('/BuyNow');
  };
  const cartItems = useSelector((state) => state.form.addtocart);
  const wishItems = useSelector((state) => state.form.addtowishlist);
  
  // Sample categories data
  const categories = [
    { id: 1, name: 'Clothing', icon: 'fa-tshirt' },
    { id: 2, name: 'Jewellery', icon: 'fa-gem' },
    { id: 3, name: 'Footwear', icon: 'fa-shoe-prints' },
    { id: 4, name: 'Handicrafts', icon: 'fa-paint-brush' },
    { id: 5, name: 'Utensils', icon: 'fa-utensils' },
    { id: 6, name: 'Gift Hampers', icon: 'fa-gift' },
    { id: 7, name: 'Electronics', icon: 'fa-laptop' },
    { id: 8, name: 'Sports', icon: 'fa-football-ball' },
    { id: 9, name: 'Books', icon: 'fa-book' },
    { id: 10, name: 'Home Appliances', icon: 'fa-blender' },
  ];

  // Sample featured products data
  const products = [
    { id: 1, name: 'REPTUM DECOR Velvet Traditional Wall Hanging', price: 1129.34, oldPrice: '₹1499', rating: 4.8, image: image, reviews: 35 },
    { id: 2, name: "IndoPrimo Men's Cotton Casual Shirt", price: 1147.12, oldPrice: '₹2000', rating: 4.7, image:shirtImage, reviews: 35 },
    { id: 3, name: 'Juhi Handicraft Set of Five Panels', price: 794.95, oldPrice: '₹1000', rating: 5, image: juhiImage, reviews: 35 },
    { id: 4, name: "Lee Men's Regular Fit T-Shirt", price: 875.93, oldPrice: '₹1200', rating: 4.9, image: leeImage, reviews: 35 },
    { id: 5, name: 'NEUDOT Divine 6 feet Mandir', price: 0, oldPrice: '₹19000', rating: 4.6, image:teakwoodImage, reviews: 35 },
    { id: 6, name: 'Shanvi Handicraft Handbag', price: 875.71, oldPrice: '₹1299', rating: 4.5, image: handbagImage, reviews: 35 },
  ];

  // Styles
  const topBarStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '10px 20px',
    backgroundColor: '#f8f8f8',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
    position: 'sticky',
    top: 0,
    zIndex: 1000,
    alignItems: 'center',
  };

  const iconStyle = {
    fontSize: '24px',
    position: 'relative',
    cursor: 'pointer',
    margin: '0 10px',
  };

  const badgeStyle = {
    position: 'absolute',
    top: '-8px',
    right: '-8px',
    backgroundColor: 'red',
    color: 'white',
    borderRadius: '50%',
    padding: '4px 6px',
    fontSize: '12px',
  };

  const buttonStyle = {
    padding: '10px 20px',
    backgroundColor: '#218838',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    marginLeft: '10px',
  };

  const categoryStyle = {
    display: 'flex',
    justifyContent: 'space-around',
    margin: '20px 0',
    flexWrap: 'wrap',
    color:'#007bff'
  };

  const categoryItemStyle = {
    textAlign: 'center',
    cursor: 'pointer',
    margin: '10px',
  };

  const sectionStyle = {
    padding: '20px',
    backgroundColor: '#007bff',
  };

  const sectionHeaderStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px',
  };

  const productGridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
    gap: '20px',
  };

  const productCardStyle = {
    position: 'relative',
    padding: '10px',
    border: '1px solid #ddd',
    borderRadius: '10px',
    backgroundColor: '#fff',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
  };

  const productImageStyle = {
    width: '50%',
    height:'50%',
    borderRadius: '10px',
  };

  const overlayIconsStyle = {
    position: 'absolute',
    top: '10px',
    right: '10px',
    display: 'flex',
    gap: '10px',
  };

  const overlayIconStyle = {
    fontSize: '20px',
    color: '#ff5a5f',
    cursor: 'pointer',
  };

  const productNameStyle = {
    margin: '10px 0',
    fontWeight: 'bold',
  };

  const priceStyle = {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '10px',
  };

  const oldPriceStyle = {
    textDecoration: 'line-through',
    color: '#888',
    marginLeft: '10px',
  };

  const ratingStyle = {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '10px',
  };

  const starStyle = {
    color: 'gold',
  };

  return (
    <div className="App">
      <h1 style={{ textAlign: 'center', margin: '20px 0' }}>E-commerce Store</h1>

      {/* Top Bar */}
      <div style={topBarStyle}>
        <div>
          <button style={buttonStyle} onClick={() => navigate('/RegisterForm')}>Become a Seller</button>
          <button style={buttonStyle}>Login to Seller</button>
        </div>
        <div style={{ display: 'flex' }}>
          <span style={iconStyle} onClick={() => navigate('/Cart')}>
            <i className="fas fa-shopping-cart"></i>
            <span style={badgeStyle}>{cartItems.length}</span>
          </span>
          <span style={iconStyle} onClick={() => navigate('/Wishlist')}>
            <i className="fas fa-heart"></i>
            <span style={badgeStyle}>{wishItems.length}</span>
          </span>
        </div>
      </div>

      {/* Product Categories */}
      <div style={categoryStyle}>
        {categories.map((category) => (
          <div key={category.id} style={categoryItemStyle} 
          // onClick={() => navigate(`/category/${category.name}`)}
          >
            <div style={{ fontSize: '40px' }}>
              <i className={`fas ${category.icon}`}></i>
            </div>
            <div>{category.name}</div>
          </div>
        ))}
      </div>

      {/* Promotional Section */}
      <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '20px',marginBottom:'20px' }}>
        <div style={{ width: '45%', padding: '20px', backgroundColor: '#616162', borderRadius: '10px'}}>
          <h2>Vendor Registration In Progress</h2>
          <p>Become a seller on our platform and showcase your products to a wide audience.</p>
          <button style={buttonStyle} onClick={() => navigate('/RegisterForm')}>Register Now</button>
        </div>
        <div style={{ width: '45%', padding: '20px', backgroundColor: '#616162', borderRadius: '10px' }}>
          <h2>Made in India Products</h2>
          <p>Explore our collection of locally made products.</p>
          <button style={buttonStyle} >Shop Now</button>
        </div>
      </div>

      {/* Featured Products */}
      <div style={sectionStyle}>
        <div style={sectionHeaderStyle}>
          <h2>Featured Products</h2>
          <span style={{ cursor: 'pointer', color: '#6c63ff' }} >
            See All
          </span>
        </div>

        {/* Product Grid */}
        <div style={productGridStyle}>
          {products.map((product) => (
            <div key={product.id} style={productCardStyle}>
              <div style={overlayIconsStyle}>
                <i className="fas fa-heart" style={overlayIconStyle} onClick={() =>dispatch(Addtowishlist(product))}></i>
          
              </div>
              <img src={product.image}  style={productImageStyle} onClick={() => navigate('/ProductDetails',{state:{product}})} />
              <div style={productNameStyle} onClick={() => navigate('/ProductDetails',{state:{product}})}>{product.name}</div>
              <div style={ratingStyle}>
                {[...Array(Math.round(product.rating))].map((_, i) => (
                  <i key={i} className="fas fa-star" style={starStyle}></i>
                ))}
                <span style={{ marginLeft: '5px' }}>({product.reviews})</span>
              </div>
              <div style={priceStyle}>
                <span>{product.price}</span>
                <span style={oldPriceStyle}>{product.oldPrice}</span>
              </div>
              <button style={buttonStyle} onClick={() => handleAddToCart(product)}>
              Add to Cart
              </button>
              <button style={buttonStyle} onClick={() => handleBuy(product)}>
                Buy Now
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ListofProducts;
