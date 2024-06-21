import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  signupData: null,
  loading: false,
  token: null,
};

// Attempt to parse the token from localStorage
const storedToken = localStorage.getItem("token");
if (storedToken) {
  try {
    initialState.token = JSON.parse(storedToken);
  } catch (error) {
    console.error("Error parsing token from localStorage:", error);
    // Handle error if JSON parsing fails (optional)
  }
}

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    setSignupData: (state, action) => {
      state.signupData = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },
  },
});

export const { setSignupData, setLoading, setToken } = authSlice.actions;

export default authSlice.reducer;
