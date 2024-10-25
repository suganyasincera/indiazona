import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Addtobuynow, clearBuyNow } from '../redux/formslice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // Import Font Awesome
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'; // Import the back arrow icon

const BuyNow = () => {
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

  const handleQuantityChange = (id, operation) => {
    setQuantityById((prev) => {
      const newQuantities = { ...prev };
      if (operation === 'increment') {
        newQuantities[id] += 1; // Increment the quantity
      } else if (operation === 'decrement' && newQuantities[id] > 1) {
        newQuantities[id] -= 1; // Decrement the quantity only if it's above 1
      }
      updateTotal(newQuantities);
      return newQuantities;
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

  return (
    <Container>
      <BackButton onClick={handleBack}>
        <FontAwesomeIcon icon={faArrowLeft} /> Back
      </BackButton>
      {buynow.length > 0 ? (
        buynow.map((buyno) => (
          <ProductSection key={buyno.id}>
            <ImageGallery>
              <MainImage src={buyno.image} />
            </ImageGallery>

            <ProductDetails>
              <ProductName>{buyno.name}</ProductName>
              <Price>${(parseFloat(buyno.price) * (quantityById[buyno.id] || 1)).toFixed(2)}</Price>
              <OldPrice>{buyno.OldPrice}</OldPrice>
              <Rating>⭐⭐⭐⭐⭐ ({buyno.reviews} reviews)</Rating>
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
              <QuantitySection>
                <QuantityButton onClick={() => handleQuantityChange(buyno.id, 'decrement')}>-</QuantityButton>
                <QuantityDisplay>{quantityById[buyno.id]}</QuantityDisplay>
                <QuantityButton onClick={() => handleQuantityChange(buyno.id, 'increment')}>+</QuantityButton>
              </QuantitySection>

              <Button onClick={() => handleContinue(buyno)}>Continue</Button>

              <DeliveryInfo>
                <FreeDelivery>Free delivery available</FreeDelivery>
                <ReturnDelivery>Return delivery within 30 days</ReturnDelivery>
              </DeliveryInfo>
            </ProductDetails>
          </ProductSection>
        ))
      ) : (
        <p>No items in the Buy Now section.</p>
      )}

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

export default BuyNow;



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

const ProductDetails = styled.div`
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

const Button = styled.button`
  width: 100%;
  padding: 15px;
  background-color: #218838;
  color: white;
  font-size: 16px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-bottom: 20px;
  &:hover {
    background-color: #ff6347;
  }
`;

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
