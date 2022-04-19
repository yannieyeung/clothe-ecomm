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

export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItemsArr: [],
  addItemsToCart: () => {},
  cartQuantity: 0,
});

export const CartProvider = ({ children }) => {
  const [cartOpen, setCartOpen] = useState(false);

  const [cartItems, setCartItems] = useState([]);

  const [cartQuantity, setCartQuantity] = useState(0);

  useEffect(() => {
   const newCartQuantity = cartItems.reduce((total, cartItem) => {
     return total + cartItem.quantity;
    }, 0);
    setCartQuantity(newCartQuantity);
  }, [cartItems]);

  const addItemsToCart = (productToAdd) => {
    setCartItems(addCartItem(cartItems, productToAdd));

  };

  const value = { cartOpen, setCartOpen, addItemsToCart, cartItems, cartQuantity };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
