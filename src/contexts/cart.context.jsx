import { createContext, useState, useEffect, useReducer } from "react";

const addCartItem = (cartItems, productToAdd) => {
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === productToAdd.id
  );
  if (existingCartItem) {
    return cartItems.map((cartItem) =>
      cartItem.id === productToAdd.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );
  }
  return [...cartItems, { ...productToAdd, quantity: 1 }];

};

const removeCartItem = (cartItems, productToRemove) => {
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === productToRemove.id
  );

  if (existingCartItem.quantity === 1) {
    return cartItems.filter(item => item.id !== productToRemove.id);
  }

  return cartItems.map((item) =>
    item.id === productToRemove.id
      ? { ...item, quantity: item.quantity - 1 }
      : item
  );
};

const removeAllItem = (cartItems, productToRemove) => {
  const existingCartItem = cartItems.find((cartItem)=> cartItem.id === productToRemove.id)

  if(existingCartItem){
    return cartItems.filter(item => item.id !== productToRemove.id);
  }
}


// export const CartContext = createContext({
//   isCartOpen: false,
//   setIsCartOpen: () => {},
//   cartItemsArr: [],
//   addItemsToCart: () => {},
//   cartQuantity: 0,
//   removeItemsFromCart: () =>{},
//   clearItemsFromCart: () => {},
//   cartTotal: 0,
// });

// export const CartProvider = ({ children }) => {
//   const [cartOpen, setCartOpen] = useState(false);

//   const [cartItems, setCartItems] = useState([]);

//   const [cartQuantity, setCartQuantity] = useState(0);

//   const [cartTotal, setCartTotal] = useState(0);

//   useEffect(() => {
//     const newCartQuantity = cartItems.reduce((total, cartItem) => {
//       return total + cartItem.quantity;
//     }, 0);
//     setCartQuantity(newCartQuantity);
//   }, [cartItems]);

//   useEffect(() => {
//     const newCartTotal = cartItems.reduce((total, cartItem) => {
//       return total + cartItem.quantity * cartItem.price;
//     }, 0);
//     setCartTotal(newCartTotal);
//   }, [cartItems]);

  // const addItemsToCart = (productToAdd) => {
  //   setCartItems(addCartItem(cartItems, productToAdd));
    
    
  // };

//   const removeItemsFromCart = (productToRemove) => {
//     setCartItems(removeCartItem(cartItems, productToRemove));

//   };

//   const clearItemsFromCart = (productToRemove) => {
//     setCartItems(removeAllItem(cartItems, productToRemove))
  
//   }

//   const value = {
//     cartOpen,
//     setCartOpen,
//     addItemsToCart,
//     cartItems,
//     cartQuantity,
//     removeItemsFromCart,
//     clearItemsFromCart,
//     cartTotal
//   };

//   return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
// };



// when use reducer


export const CartContext = createContext({
    cartOpen: false,
    setIsCartOpen: () => {},
    cartItemsArr: [],
    addItemsToCart: () => {},
    cartQuantity: 0,
    removeItemsFromCart: () =>{},
    clearItemsFromCart: () => {},
    cartTotal: 0,
  });

const INITIAL_STATE = {
  cartOpen: false,
  cartItems: [],
  cartQuantity: 0,
  cartTotal: 0,
}
const cartReducer = (state, action) => {
  const {type, payload} =  action;

  switch(type){
    case 'SET_CART_ITEMS':
      return {
        ...state,
        ...payload
      }

      case 'SET_IS_CART_OPEN':
        return {
          ...state,
          cartOpen: payload
        }
  }

}
export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, INITIAL_STATE)
  const {cartItems, cartQuantity, cartTotal, cartOpen} = state;



  const updateCartItemReducer =  (newCartItems) => {
    /*
    generate newCarTotal

    generate newCartQuantity

    dispatch new action with payload = {
      newCartItems
      newCartTotal
      newCartQuantity
    }
    
    */
    const newCartQuantity = cartItems.reduce((total, cartItem) => {
      return total + cartItem.quantity;
    }, 0);
  
    const newCartTotal = cartItems.reduce((total, cartItem) => {
      return total + cartItem.quantity * cartItem.price;
    }, 0);


   dispatch({type:'SET_CART_ITEMS', payload:{cartItems: newCartItems, cartQuantity: newCartQuantity, cartTotal: newCartTotal} })
  }





  const addItemsToCart = (productToAdd) => {
    const newCartItems = addCartItem(cartItems, productToAdd);
    updateCartItemReducer(newCartItems)
    
  };

  const removeItemsFromCart = (productToRemove) => {
    const newCartItems =  removeCartItem(cartItems, productToRemove);
    updateCartItemReducer(newCartItems)
  };

  const clearItemsFromCart = (productToRemove) => {
    const newCartItems = removeAllItem(cartItems, productToRemove)
    updateCartItemReducer(newCartItems)
  }

  const setCartOpen = (bool) =>{
    dispatch({type:'SET_IS_CART_OPEN', payload: bool})
  }


  const value = {
    cartOpen,
    setCartOpen,
    addItemsToCart,
    cartItems,
    cartQuantity,
    removeItemsFromCart,
    clearItemsFromCart,
    cartTotal
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};