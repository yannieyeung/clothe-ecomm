import { useContext } from "react";
import "./product-card.styles.scss";
import Button from "../button/button.component";
import { CartContext } from "../../contexts/cart.context";

const ProductCard = ({ eachProduct }) => {
  const { name, id, price, imageUrl } = eachProduct;
  const { addItemsToCart } = useContext(CartContext);

  const addProductToCart = () => {
    addItemsToCart(eachProduct)
  }

  return (
    <div className="product-card-container">
      <img src={imageUrl} alt={name} />
      <div className="footer">
        <span className="name">{name}</span>
        <span className="price">{price}</span>
      </div>
      <Button buttonType="inverted" onClick={addProductToCart}> Add to Cart</Button>
    </div>
  );
};

export default ProductCard;
