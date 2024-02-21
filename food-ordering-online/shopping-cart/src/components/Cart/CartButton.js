import classes from './CartButton.module.css';
import { uiActions } from '../../store/uiSlice';
import { useSelector , useDispatch } from 'react-redux';

const CartButton = (props) => {

  const cartQuantity = useSelector(state => state.cart.totalQuantity)
  const dispatch = useDispatch()
  const cartToggleHandler = () => {dispatch(uiActions.toggle())}

  return (
    <button className={classes.button}
    onClick = {cartToggleHandler}>
      <span>My Cart</span>
      <span className={classes.badge}>{cartQuantity}</span>
    </button>
  );
};

export default CartButton;
