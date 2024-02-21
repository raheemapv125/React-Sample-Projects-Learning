import { configureStore } from "@reduxjs/toolkit";
import uiReducer from './uiSlice'
import cartReducer from './cartSlice'

const store = configureStore({
    reducer : {cart :cartReducer , ui : uiReducer}
})
export default store