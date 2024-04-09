import { createSlice } from "@reduxjs/toolkit";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const storedToken = localStorage.getItem("token");
let initialToken = null;

// Check if the stored token is a valid JSON string
if (storedToken) {
  try {
    initialToken = JSON.parse(storedToken);
  } catch (error) {
    console.error("Error parsing stored token:", error);
    // Handle the error or fallback to a default value
  }
}

const initialState = {
  totalItems: localStorage.getItem("totalItems") ? JSON.parse(localStorage.getItem("totalItems")) : 0
};

const cartSlice = createSlice({
  name: "cart", // Changed slice name to "cart"
  initialState: initialState,
  reducers: {
    setTotalItems(state, action) { // Renamed action parameter to "action"
      state.totalItems = action.payload; // Updated state property assignment
    },
    // Add other reducer functions related to cart state here
  },
});

export const { setTotalItems } = cartSlice.actions; // Corrected export statement
export default cartSlice.reducer;
