import logoImg from '../assets/logo.jpg'
import Button from './UI/button.jsx'
import { useContext } from 'react'
import cartContext from '../store/cart-context.jsx'
import ProgressContext from '../store/progress-context.jsx'

export default function Header () {
    const {items} = useContext(cartContext)
    const {showCart} = useContext(ProgressContext)

    const totalCartQuantity = items.reduce((total , item) => {
        return total + item.quantity
    } , 0)

    return <header id = "main-header">
        <div id = "title">
            <img src = {logoImg} alt = "React Food order"></img>
            <h1>Food order App</h1>
        </div>
        <nav>
            <Button onClick = {() => showCart()} textOnly >Cart ({totalCartQuantity}) </Button>
        </nav>
    </header>
}