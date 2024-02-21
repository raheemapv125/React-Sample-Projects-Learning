import { useContext } from "react"
import cartContext from "../store/cart-context.jsx"
import Modal from "./UI/modal.jsx"
import { currencyFormatter } from "../utils/formatting.js"
import Input from "./UI/input.jsx"
import Button from "./UI/button.jsx"
import ProgressContext from "../store/progress-context.jsx"
import useHttp from "../hooks/usehttp.js"
import Error from "./error.jsx"

const configData = {
    method: 'POST',
    headers : {
        'Content-Type' : 'application/json'
    }
}
export default function Checkout () {
    const {items , totalPrice , clearCart} = useContext(cartContext)
    const {progress , hideCheckout } = useContext(ProgressContext)

    const {data, isLoading: isSending , error, clearData , sendRequest} = useHttp(
        'http://localhost:3000/orders' , configData)

    function handleFinish() {
        hideCheckout()
        clearCart()
        clearData()
    }

    function handlehideCheckout() {
        hideCheckout()
    }

    function handleSubmit (event) {
        event.preventDefault()
        const fd = new FormData(event.target)
        const customerData = Object.fromEntries(fd.entries())
        const configBody = JSON.stringify({
                order : {
                    items ,
                    customer : customerData
                }
            })

        sendRequest(configBody)
    }

    let actionContent = <>
                <Button type = "button" textOnly onClick = {handlehideCheckout}>Close</Button>
                 <Button >Submit Order</Button></>
    if(isSending) {
        actionContent = <span>Sending Data.....</span>
    }
    
    if(data && !error) {
        return (       
         <Modal open = {progress === 'checkout'}
            onClose={handleFinish}>
                <h2>Success !</h2>
                <p>Your Order was Submitted Successfully...</p>
                <p>Details will be informed shortly vie email...</p>
                <p className="modal-actions">
                    <Button textOnly onClick = {handleFinish}>Close</Button>
                </p>

        </Modal> )
    }

    return (
        <Modal open = {progress === 'checkout'}
            onClose={handlehideCheckout}>
            <form onSubmit = {handleSubmit}>
                <h2>Checkout</h2>
                <p>Total Amount : {currencyFormatter.format(totalPrice)}</p>

                <Input label = "Full Name" type = "text" id = "name"/>
                <Input label = "E-mail Address" type = "email" id= "email" />
                <Input label = "Street" type = "text" id = "street" />
                <div className="control-rwo">
                    <Input label = "Postal Code" type = "text" id = "postal-code" />
                    <Input label = "City" type = "text" id = "city" />
                </div>
                {error && <Error title="Failed to Submit Order" message={error} /> }
                <p className="modal-actions">{actionContent}</p>
            </form>
        </Modal>
    )
}