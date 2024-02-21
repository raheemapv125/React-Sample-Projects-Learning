import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import Notification from './components/UI/notification';
import { useSelector  , useDispatch} from 'react-redux';
import {useEffect} from 'react';
import { sendCartData , fetchCartData } from './store/cart-actions';

let IS_INITIAL = true

function App() {

  const showCart = useSelector(state => state.ui.isCartVisible)
  const notification = useSelector(state => state.ui.notification)
  const cart = useSelector(state => state.cart)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchCartData())
  } ,[dispatch])

  useEffect(() => {
    if(IS_INITIAL) {
      IS_INITIAL = false
      return
    }
    if(cart.changed) {
      dispatch(sendCartData(cart))
    }
  } ,[cart ,dispatch])

  return (
    <>
      { notification && <Notification 
        status = {notification.status}
        title = {notification.title}
        message = {notification.message}/>
      }
      <Layout>
        {showCart && <Cart />}
        <Products />
      </Layout>
    </>
  );
}

export default App;
