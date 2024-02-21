import { uiActions } from "./uiSlice";
import { cartActions } from "./cartSlice";

export const sendCartData = (cart) => {
    return async (dispatch) => {
        dispatch(uiActions.setNotification({
            status : 'pending' ,
            title : 'Sending...' ,
            message : 'Sending Cart Data!'
          }))
          const sendRequest = async () => {
            const response = await fetch('https://shopping-cart-94928-default-rtdb.firebaseio.com/cart.json' ,{
                method : 'PUT',
                body : JSON.stringify({
                    totalQuantity : cart.totalQuantity ,
                    items : cart.items
                })
              })
              if(!response.ok) {
                throw new Error('Sending Cart Data Failed ...')
              }
          }
          try {
            await sendRequest()
            dispatch(uiActions.setNotification({
                status : 'success' ,
                title : 'Success!' ,
                message : 'Sent Cart Data Successfuly!'
              }))
          }
          catch (error) {
            dispatch(uiActions.setNotification({
                status : 'error' ,
                title : 'Error!' ,
                message : 'Sending Cart Data Failed!'
              }))
          }

    }
}

export const fetchCartData = () => {
    return async (dispatch) => {
        const fetchData = async () => {
            const response = await fetch('https://shopping-cart-94928-default-rtdb.firebaseio.com/cart.json')
            if(!response.ok) {
                throw new Error('Fetching Cart Data Failed ...')
              }
              const cartData = await response.json()
              return cartData
        }
        try {
            const cart = await fetchData()
            dispatch(cartActions.replaceCart({
                totalQuantity : cart.totalQuantity ,
                items : cart.items || []
            }))
        }
        catch (error) {
            dispatch(uiActions.setNotification({
                status : 'error' ,
                title : 'Error!' ,
                message : 'Fetching Cart Data Failed!'
              }))
        }
    }
}