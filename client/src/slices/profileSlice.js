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
  user: null,
};

const profileSlice = createSlice({
  name: "profile",
  initialState: initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
    },
  },
});

export const { setUser } = profileSlice.actions;
export default profileSlice.reducer;
