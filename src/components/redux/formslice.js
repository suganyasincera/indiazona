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
        state.addtocart = [...state.addtocart, { ...action.payload, quantity: 1 }]; // Add new item with quantity 1
      }
    },
    Addtowishlist: (state, action) => {
      const existingItem = state.addtowishlist.find(item => item.id === action.payload.id);
      
      if (!existingItem) {
        state.addtowishlist = [...state.addtowishlist, action.payload]; // Add only if not already in wishlist
      }
    },
    Addtobuynow: (state, action) => {
      state.addtobuynow = [...state.addtobuynow, action.payload];
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
      state.addtowishlist = state.addtowishlist.filter((item) => item.id !== action.payload);
    },
  },
});

export const { Addtocart, Addtowishlist, Addtobuynow, Removefromcart, Removefromwish } = FormSlice.actions;
export default FormSlice.reducer;
