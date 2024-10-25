import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Addtobuynow, clearBuyNow,Addtocart } from '../redux/formslice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // Import Font Awesome
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'; // Import the back arrow icon
import './ProductDetails.css';
import Swal from 'sweetalert2'; 
import { useLocation } from 'react-router-dom';
const ProductDetails = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const buynow = useSelector((state) => state.form.addtobuynow);
  const [selectedSize, setSelectedSize] = useState('M');
  const [selectedColor, setSelectedColor] = useState('black');
  const [quantityById, setQuantityById] = useState({}); // Store quantities per item
  const [total, setTotal] = useState(0); // Total price

  useEffect(() => {
    // Initialize quantity by ID and calculate the total
    const initialQuantities = {};
    let initialTotal = 0;

    buynow.forEach((item) => {
      initialQuantities[item.id] = 1; // Start with a quantity of 1 for each item
      initialTotal += parseFloat(item.price) || 0;
    });

    setQuantityById(initialQuantities);
    setTotal(initialTotal);
  }, [buynow]);
  const location = useLocation();
  const { product } = location.state || {}; // Access product data

  if (!product) {
    return <div>No Product Details Found</div>;
  }

  const handleQuantityChange = (id, operation) => {
    setQuantityById((prevQuantities) => {
      const updatedQuantities = { ...prevQuantities };
      
      if (operation === 'increment') {
        updatedQuantities[id] = (updatedQuantities[id] || 1) + 1;
      } else if (operation === 'decrement' && (updatedQuantities[id] || 1) > 1) {
        updatedQuantities[id] -= 1;
      }
  
      // Call updateTotal after updating the quantity
      updateTotal(updatedQuantities);
      
      return updatedQuantities; // Update state with new quantities
    });
  };
  const updateTotal = (quantities) => {
    let newTotal = 0;
  
    buynow.forEach((item) => {
      const quantity = quantities[item.id] || 1;
      const price = parseFloat(item.price) || 0;
      newTotal += price * quantity;
    });
  
    setTotal(newTotal);
  };

  const handleContinue = (buyno) => {
    dispatch(Addtobuynow({
      id: buyno.id,
      name: buyno.name,
      price: buyno.price,
      image: buyno.image,
      quantity: quantityById[buyno.id] || 1
    }));
    console.log(quantityById[buyno.id])
    navigate('/ProceedtoBuy');
  };

  const handleBack = () => {
    dispatch(clearBuyNow());
    navigate("/ListofProducts");
  };
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
  return (
    <Container>
      <BackButton onClick={handleBack}>
        <FontAwesomeIcon icon={faArrowLeft} /> Back
      </BackButton>
      
          <ProductSection >
            <ImageGallery>
              <MainImage src={product.image} />
            </ImageGallery>

            <ProductDetail>
              <ProductName>{product.name}</ProductName>
              <Price>${(parseFloat(product.price) * (quantityById[product.id] || 1)).toFixed(2)}</Price>
              <OldPrice>{product.OldPrice}</OldPrice>
              <Rating>⭐⭐⭐⭐⭐ ({product.reviews} reviews)</Rating>
              <Description>Made in India</Description>

              <Label>Color:</Label>
              <ColorOptions>
                <ColorCircle
                  selected={selectedColor === 'black'}
                  color="black"
                  onClick={() => setSelectedColor('black')}
                />
                <ColorCircle
                  selected={selectedColor === 'white'}
                  color="white"
                  onClick={() => setSelectedColor('white')}
                />
              </ColorOptions>

              <Label>Size:</Label>
              <SizeOptions>
                <SizeButton
                  selected={selectedSize === 'S'}
                  onClick={() => setSelectedSize('S')}
                >
                  S
                </SizeButton>
                <SizeButton
                  selected={selectedSize === 'M'}
                  onClick={() => setSelectedSize('M')}
                >
                  M
                </SizeButton>
                <SizeButton
                  selected={selectedSize === 'L'}
                  onClick={() => setSelectedSize('L')}
                >
                  L
                </SizeButton>
              </SizeOptions>

              {/* Quantity Section */}
              {/* <QuantitySection>
                <QuantityButton onClick={() => handleQuantityChange(product.id, 'decrement')}>-</QuantityButton>
                <QuantityDisplay>{quantityById[product.id]||1}</QuantityDisplay>
                <QuantityButton onClick={() => handleQuantityChange(product.id, 'increment')}>+</QuantityButton>
              </QuantitySection> */}

<ButtonRow>
    <Button onClick={() => handleBuy(product)}>Buy Now</Button>
    <Button onClick={() => handleAddToCart(product)}>Add to Cart</Button>
  </ButtonRow>
              <DeliveryInfo>
                <FreeDelivery>Free delivery available</FreeDelivery>
                <ReturnDelivery>Return delivery within 30 days</ReturnDelivery>
              </DeliveryInfo>
            </ProductDetail>
          </ProductSection>


      <Footer>
        <FooterLinks>
          <Column>
            <h4>Exclusive</h4>
            <p>Subscribe</p>
            <input type="email" placeholder="Enter your email" />
          </Column>
          <Column>
            <h4>Support</h4>
            <p>FAQ</p>
            <p>Contact Us</p>
          </Column>
          <Column>
            <h4>Account</h4>
            <p>Login/Register</p>
          </Column>
        </FooterLinks>
      </Footer>
    </Container>
  );
};

export default ProductDetails;



const Container = styled.div`
  width: 100%;
  padding: 20px;
  font-family: Arial, sans-serif;
`;

const BackButton = styled.button`
  display: flex;
  align-items: center;
  background: transparent;
  border: none;
  color: #218838;
  cursor: pointer;
  font-size: 16px;
  margin-bottom: 20px;

  &:hover {
    color: #ff6347;
  }

  svg {
    margin-right: 8px;
  }
`;
// Styled-components for the row container
const ButtonRow = styled.div`
  display: flex;
  gap: 10px; /* Adjusts space between the buttons */
  margin-bottom: 20px;
`;

// Update Button styling to make them align nicely within the row
const Button = styled.button`
  flex: 1;
  padding: 15px;
  background-color: #218838;
  color: white;
  font-size: 16px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #ff6347;
  }
`;

const ProductSection = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ImageGallery = styled.div`
  width: 40%;
`;

const MainImage = styled.img`
  width: 50%;
  border-radius: 10px;
`;

const ProductDetail = styled.div`
  width: 55%;
`;

const ProductName = styled.h1`
  font-size: 28px;
  margin-bottom: 10px;
`;

const Price = styled.h2`
  color: #218838;
  margin-bottom: 10px;
`;

const OldPrice = styled.h2`
  color: #218838;
  margin-bottom: 10px;
`;

const Rating = styled.div`
  font-size: 14px;
  color: #ffcc00;
  margin-bottom: 10px;
`;

const Description = styled.p`
  margin-bottom: 20px;
  font-size: 16px;
  color: #555;
`;

const Label = styled.label`
  font-size: 16px;
  margin-bottom: 5px;
  display: block;
`;

const ColorOptions = styled.div`
  display: flex;
  margin-bottom: 20px;
`;

const ColorCircle = styled.div`
  width: 30px;
  height: 30px;
  background-color: ${(props) => props.color};
  border-radius: 50%;
  margin-right: 10px;
  cursor: pointer;
  border: ${(props) => (props.selected ? '2px solid black' : '2px solid transparent')};
`;

const SizeOptions = styled.div`
  display: flex;
  margin-bottom: 20px;
`;

const SizeButton = styled.button`
  padding: 10px;
  margin-right: 10px;
  border: 1px solid #000;
  background-color: ${(props) => (props.selected ? '#000' : '#fff')};
  color: ${(props) => (props.selected ? '#fff' : '#000')};
  cursor: pointer;
`;

const QuantitySection = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const QuantityButton = styled.button`
  padding: 10px;
  background-color: #ddd;
  border: 1px solid #ccc;
  cursor: pointer;
  &:hover {
    background-color: #ccc;
  }
`;

const QuantityDisplay = styled.span`
  padding: 0 20px;
  font-size: 18px;
`;

// const Button = styled.button`
//   width: 100%;
//   padding: 15px;
//   background-color: #218838;
//   color: white;
//   font-size: 16px;
//   border: none;
//   border-radius: 5px;
//   cursor: pointer;
//   margin-bottom: 20px;
//   &:hover {
//     background-color: #ff6347;
//   }


const DeliveryInfo = styled.div`
  font-size: 14px;
  color: gray;
`;

const FreeDelivery = styled.p``;
const ReturnDelivery = styled.p``;

const Footer = styled.footer`
  background-color: #333;
  color: white;
  padding: 40px 20px;
  margin-top: 40px;
`;

const FooterLinks = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Column = styled.div`
  width: 22%;
  h4 {
    margin-bottom: 15px;
  }
  input {
    padding: 10px;
    width: 100%;
    border: none;
    border-radius: 5px;
  }
`;
