import { Outlet, Link } from "react-router-dom";
import { Fragment, useContext } from "react";
import { ReactComponent as CrwnLogo } from "../../assets/crown.svg";
import "./navigation.styles.scss";
import { UserContext } from "../../contexts/user.context";
import { signOutUser } from "../../utils/firebase/firebase.utils";
import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDropdown from "../../components/card-dropdown/card-dropdown.component";
import { CartContext } from "../../contexts/cart.context";

function Navigation() {
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const { cartOpen } = useContext(CartContext);

  const handleSignOut = async () => {
    await signOutUser();

    // This is not needed alr as its handle in userContext by onAuthChange
    //setCurrentUser(null);
  };

  return (
    <Fragment>
      <div className="navigation">
        <Link className="logo-container" to="/">
          <CrwnLogo className="logo" />
        </Link>
        <div className="nav-links-container">
          <Link className="nav-link" to="/shop">
            Shop
          </Link>
          {currentUser ? (
            <span className="nav-link" onClick={handleSignOut}>
              {" "}
              Sign Out{" "}
            </span>
          ) : (
            <Link className="nav-link" to="/auth">
              Sign in
            </Link>
          )}
          <CartIcon />
        </div>
          {cartOpen && <CartDropdown /> }
      </div>
      <Outlet />
    </Fragment>
  );
}

export default Navigation;
