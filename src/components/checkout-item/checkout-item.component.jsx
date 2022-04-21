import "./checkout-item.styles.scss";
import { useContext } from "react";
import { CartContext } from "../../contexts/cart.context";

const CheckOutItem = ({ item }) => {
  const { imageUrl, name, id, price, quantity } = item;
  const { clearItemsFromCart, addItemsToCart, removeItemsFromCart } =
    useContext(CartContext);

  const clearItemHandler = () => {
    clearItemsFromCart(item);
  };

  const addItemHandler = () => {
    addItemsToCart(item);
  };

  const removeItemHandler = () => {
    removeItemsFromCart(item);
  };

  return (
    <div key={id} className="checkout-item-container">
      <div className="image-container">
        <img src={imageUrl} alt={name} />
      </div>
      <span className="name">{name}</span>
      <span className="quantity">
        <div className="arrow" onClick={removeItemHandler}>
          &#10094;
        </div>
        <span className="value">{quantity}</span>

        <div className="arrow" onClick={addItemHandler}>
          &#10095;
        </div>
      </span>
      <span className="price">{price}</span>
      <div className="remove-button" onClick={clearItemHandler}>
        &#10005;
      </div>
    </div>
  );
};

export default CheckOutItem;
