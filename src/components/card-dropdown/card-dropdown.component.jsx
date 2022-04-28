
import { useNavigate } from "react-router-dom";
import {CartDropdownContainer, EmptyMessage, CartItems } from './card-dropdown.styles.jsx';
import Button from '../button/button.component';
import CartItem from '../cart-item/cart-item.component';
import { useContext } from 'react';
import { CartContext } from '../../contexts/cart.context';

const CartDropdown = () => {

    const navigate = useNavigate();

    const { cartItems } = useContext(CartContext);

    const goToCheckoutHandler = () =>{
        navigate('/checkout')
    }

    return(
        <CartDropdownContainer>
            <CartItems>
            {
            
            cartItems.length ?
            cartItems.map((item)=>{
                return <CartItem key={item.id} cartItem={item}/>
            }) : <EmptyMessage>No item</EmptyMessage>}

            </CartItems>
           
            <Button onClick={goToCheckoutHandler}>Go to Checkout</Button>
    


        </CartDropdownContainer>
        // <div className='cart-dropdown-container'>
        //     <div className='cart-items'>
        //     {
            
        //     cartItems.length ?
        //     cartItems.map((item)=>{
        //         return <CartItem key={item.id} cartItem={item}/>
        //     }) : <span>No item</span>}

        //     </div>
           
        //     <Button onClick={goToCheckoutHandler}>Go to Checkout</Button>
    


        // </div>
    )

} 

export default CartDropdown