import {combineReducers} from "@reduxjs/toolkit";
import authUserReducer from "../slices/authUserSlice.ts";

export default combineReducers({
    authUser: authUserReducer
})