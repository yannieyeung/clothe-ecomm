import { CartIconContainer, ShoppingIcon, ItemCount } from './cart-icon.styles.jsx';
// import { ReactComponent as ShoppingIcon} from "../../assets/shopping-bag.svg";
import { useContext } from 'react';
import { CartContext} from '../../contexts/cart.context';

const CartIcon = () => {

    const { cartOpen, setCartOpen, cartQuantity } = useContext(CartContext);

    const toggleCartOpen = () => setCartOpen(!cartOpen)
    

    return (

        <CartIconContainer onClick={toggleCartOpen}>  
            <ShoppingIcon/>
            <ItemCount> {cartQuantity}</ItemCount>


        </CartIconContainer>
        // <div className='cart-icon-container' onClick={toggleCartOpen}>  
        //     <ShoppingIcon className='shopping-icon'/>
        //     <span className='item-count'> {cartQuantity}</span>


        // </div>
    )

}

export default CartIcon;