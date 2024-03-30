import {combineReducers, createReducer} from "@reduxjs/toolkit";
import authReducer from "../slices/authslice";
import cartReducer from "../slices/cartslice";
import profileReducer from "../slices/profileSlice";


const rootReducer =combineReducers({
    auth: authReducer,
    profile:profileReducer,
    cart:cartReducer,
})

export default rootReducer