import Header from "./components/header";
import Meals from "./components/meals";
import { CartContextProvider } from "./store/cart-context.jsx";
import {ProgressContextProvider} from "./store/progress-context.jsx";
import Cart from "./components/cart.jsx";
import Checkout from "./components/checkout.jsx";

function App() {
  return (
    <CartContextProvider>
      <ProgressContextProvider>
        <Header />
        <Meals />
        <Cart />
        <Checkout />
      </ProgressContextProvider>
    </CartContextProvider>
  );
}

export default App;
