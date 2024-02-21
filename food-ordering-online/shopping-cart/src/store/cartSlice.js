import { createSlice} from "@reduxjs/toolkit";

const initialState = {
    items : [] ,
    totalQuantity : 0 ,
    changed : false
}
const cartSlice = createSlice({
    name :'cart',
    initialState ,
    reducers : {
        replaceCart (state, action) {
            state.totalQuantity = action.payload.totalQuantity
            state.items = action.payload.items
        } ,
        addItemToCart(state , action) {
            const newItem = action.payload
            const existingItem = state.items.find(item => item.id === newItem.id)
            state.changed = true
            state.totalQuantity ++
            if(!existingItem) {
                state.items.push({
                    id : newItem.id ,
                    title : newItem.title ,
                    price : newItem.price,
                    quantity : 1 ,
                    totalItemPrice : newItem.price

                })
            }
            else {
                existingItem.quantity ++ 
                existingItem.totalItemPrice += newItem.price
            }
            
        } ,
        removeItemFromCart(state , action) {
            const id = action.payload
            const existingItem = state.items.find(item => item.id === id)
            state.changed = true
            state.totalQuantity --
            if(existingItem.quantity === 1) {
                state.items = state.items.filter(item => item.id !== id)
            }
            else {
                existingItem.quantity --
                existingItem.totalItemPrice -= existingItem.price
            }
        } ,
        updateItemQuantity (state, action) {
            const id = action.payload
            const existingItem = state.items.find(item => item.id === id)
            state.changed = true
            state.totalQuantity ++
            existingItem.quantity ++ 
            existingItem.totalItemPrice += existingItem.price
        }
    }
})


export const cartActions = cartSlice.actions
export default cartSlice.reducer