import { createContext, useState, useEffect } from "react";

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


export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItemsArr: [],
  addItemsToCart: () => {},
  cartQuantity: 0,
  removeItemsFromCart: () =>{},
  clearItemsFromCart: () => {},
  cartTotal: 0,
});

export const CartProvider = ({ children }) => {
  const [cartOpen, setCartOpen] = useState(false);

  const [cartItems, setCartItems] = useState([]);

  const [cartQuantity, setCartQuantity] = useState(0);

  const [cartTotal, setCartTotal] = useState(0);

  useEffect(() => {
    const newCartQuantity = cartItems.reduce((total, cartItem) => {
      return total + cartItem.quantity;
    }, 0);
    setCartQuantity(newCartQuantity);
  }, [cartItems]);

  useEffect(() => {
    const newCartTotal = cartItems.reduce((total, cartItem) => {
      return total + cartItem.quantity * cartItem.price;
    }, 0);
    setCartTotal(newCartTotal);
  }, [cartItems]);

  const addItemsToCart = (productToAdd) => {
    setCartItems(addCartItem(cartItems, productToAdd));
    
    
  };

  const removeItemsFromCart = (productToRemove) => {
    setCartItems(removeCartItem(cartItems, productToRemove));

  };

  const clearItemsFromCart = (productToRemove) => {
    setCartItems(removeAllItem(cartItems, productToRemove))
  
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
