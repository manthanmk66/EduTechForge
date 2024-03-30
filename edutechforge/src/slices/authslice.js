import { createSlice } from "@reduxjs/toolkit";

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
  token: initialToken,
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    setToken(state, action) {
      state.token = action.payload;
    },
  },
});

export const { setToken } = authSlice.actions;
export default authSlice.reducer;
