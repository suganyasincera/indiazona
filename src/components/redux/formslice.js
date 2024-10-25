import { createSlice } from '@reduxjs/toolkit';

const FormSlice = createSlice({
  name: 'form',
  initialState: {
    addtocart: [],
    addtowishlist: [],
    addtobuynow: [],
    
  },
  reducers: {
    Addtocart: (state, action) => {
      const existingItem = state.addtocart.find(item => item.id === action.payload.id);

      if (existingItem) {
        existingItem.quantity += 1; // Increase quantity if the item already exists
      } else {
        state.addtocart.push({ ...action.payload, quantity: 1 }); // Add new item with quantity 1
      }
    },

    Addtowishlist: (state, action) => {
      const existingItem = state.addtowishlist.find(item => item.id === action.payload.id);
      if (!existingItem) {
        state.addtowishlist.push(action.payload); // Add only if not already in wishlist
      }
    },
    Addtobuynow: (state, action) => {
      const existingItem = state.addtobuynow.find(item => item.id === action.payload.id);
    
      if (existingItem) {
        existingItem.quantity = action.payload.quantity; // Update with dispatched quantity
      } else {
        state.addtobuynow.push({ ...action.payload, quantity: action.payload.quantity }); // Add new item with dispatched quantity
      }
    }
    
   ,

    clearBuyNow: (state) => {
      state.addtobuynow = []; // Clear the "Buy Now" section
    },

    Removefromcart: (state, action) => {
      const existingItem = state.addtocart.find(item => item.id === action.payload);

      if (existingItem && existingItem.quantity > 1) {
        existingItem.quantity -= 1; // Decrease quantity if there's more than 1
      } else {
        state.addtocart = state.addtocart.filter((item) => item.id !== action.payload); // Remove the item if quantity is 1
      }
    },

    Removefromwish: (state, action) => {
      state.addtowishlist = state.addtowishlist.filter((item) => item.id !== action.payload); // Remove from wishlist
    },

    UpdateQuantity: (state, action) => {
      const { id, quantity, location } = action.payload;

      if (location === 'cart') {
        const item = state.addtocart.find(item => item.id === id);
        if (item) {
          item.quantity = quantity; // Update quantity in cart
        }
      } else if (location === 'buynow') {
        const item = state.addtobuynow.find(item => item.id === id);
        if (item) {
          item.quantity = quantity; // Update quantity in Buy Now
        }
      }
    },
  },
});

export const {
  Addtocart,
  Addtowishlist,
  Addtobuynow,
  Removefromcart,
  Removefromwish,
  UpdateQuantity,
  clearBuyNow,
} = FormSlice.actions;

export default FormSlice.reducer;
