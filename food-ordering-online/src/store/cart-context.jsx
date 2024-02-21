import { createContext, useReducer } from "react";

const cartContext = createContext({
    items : [] ,
    totalPrice : 0 ,
    addItem : () => {} ,
    removeItem : () => {} ,
    clearCart : () => {}
})

function cartReducer(state , action) {
    if(action.type === 'ADD_ITEM') {
        const updatedItems = [...state.items]
        const findItemIndex = state.items.findIndex(item => item.id === action.item.id)
        if(findItemIndex > -1 ) {
            const existingItem = state.items[findItemIndex]
            const updatedItem = {...existingItem , quantity : existingItem.quantity + 1}
            updatedItems[findItemIndex] = updatedItem
        }
        else {
            updatedItems.push({...action.item , quantity : 1})
        }
        return {...state , items : updatedItems}
    }
    if(action.type === 'REMOVE_ITEM') {
        const updatedItems = [...state.items]
        const findItemIndex = state.items.findIndex(item => item.id === action.id)
        const existingItem = state.items[findItemIndex]
        if(existingItem.quantity === 1 ) {
            updatedItems.splice(findItemIndex , 1)
        }
        else {
            const updatedItem = {...existingItem , quantity : existingItem.quantity - 1}
            updatedItems[findItemIndex] = updatedItem
        }
        return {...state , items : updatedItems}

    }
    if(action.type === 'CLEAR_CART') { 
        return {...state , items : []}
    }
}

export function CartContextProvider ({children}) {
    const [cart , dispatchCartAction] = useReducer(cartReducer , {items : []})

    const cartTotalPrice = cart.items.reduce((total , item) => 
    total + (item.quantity * item.price)
    , 0)
    
    function addItem(item) {
        dispatchCartAction({
            type: 'ADD_ITEM' ,
            item
        })
    }

    function removeItem(id) {
        dispatchCartAction({
            type : 'REMOVE_ITEM' ,
            id
        })
    }

    function clearCart(id) {
        dispatchCartAction({
            type : 'CLEAR_CART' ,
            id
        })
    }

    const cartContextValue = ({
        items : cart.items ,
        totalPrice : cartTotalPrice ,
        addItem ,
        removeItem,
        clearCart
    })
    return <cartContext.Provider value = {cartContextValue}>{children}</cartContext.Provider>
}
export default cartContext