import { useContext } from "react"
import cartContext from "../store/cart-context.jsx"
import Modal from "./UI/modal.jsx"
import Button from "./UI/button.jsx"
import { currencyFormatter } from "../utils/formatting.js"
import ProgressContext from "../store/progress-context.jsx"
import CartItem from "./cart-item.jsx"

export default function Cart () {
    const {items , addItem , removeItem , totalPrice} = useContext(cartContext)
    const {progress , hideCart , showCheckout} = useContext(ProgressContext)

    return (
        <Modal classList = "cart" 
            open = {progress === 'cart'}
            onClose = {progress === 'cart' ? () => hideCart() : null }
            >
            <h3>Your Cart</h3>
            <ul>
                {items.map((item) => 
                <CartItem key = {item.id} 
                    item = {item} 
                    onAdd = {() => {addItem(item)}}
                    onRemove = {() => {removeItem(item.id)}}/>
                )}
            </ul>
            <p className="cart-total">{currencyFormatter.format(totalPrice)}</p>
            <p className="modal-actions">
                <Button textOnly onClick = {() => hideCart()}>Close</Button>
                {items.length > 0 && <Button onClick = {() => showCheckout()}>Goto Checkout</Button>}
            </p>
        </Modal>
    )
}