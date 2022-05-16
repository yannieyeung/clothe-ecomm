import { Outlet, Link } from "react-router-dom";
import { Fragment, useContext } from "react";
import { ReactComponent as CrwnLogo } from "../../assets/crown.svg";
import { UserContext } from "../../contexts/user.context";
import { signOutUser } from "../../utils/firebase/firebase.utils";
import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDropdown from "../../components/card-dropdown/card-dropdown.component";
import { CartContext } from "../../contexts/cart.context";
import { useSelector } from 'react-redux'

import {
  NavigationContainer,
  NavLink,
  NavLinks,
  LogoContainer,
} from "./navigation.styles.jsx";

function Navigation() {
  // const { currentUser, setCurrentUser } = useContext(UserContext);
  const { cartOpen } = useContext(CartContext);

  const handleSignOut = async () => {
    await signOutUser();

    // This is not needed alr as its handle in userContext by onAuthChange
    //setCurrentUser(null);
  };

  // when using redux to access store (data) instead of using useContext
  const currentUser = useSelector((state)=>state.user.currentUser);
  console.log(currentUser)


  return (
    <Fragment>
      <NavigationContainer>
        <LogoContainer to="/">
          {/* <Link className="logo-container" to="/"> */}
          <CrwnLogo className="logo" />
          {/* </Link> */}
        </LogoContainer>
        {/* <div className="nav-links-container"> */}
        <NavLinks>
          {/* <Link className="nav-link" to="/shop"> */}
          <NavLink to="/shop">Shop</NavLink>
          {/* </Link> */}

          {currentUser ? (
            // <span className="nav-link" onClick={handleSignOut}>
            <NavLink as="span" onClick={handleSignOut}>
              Sign Out
            </NavLink>
          ) : (
            // </span>
            // <Link className="nav-link" to="/auth">
            <NavLink to="/auth">Sign in</NavLink>
            // </Link>
          )}
          <CartIcon />
        </NavLinks>
        {/* </div> */}
        {cartOpen && <CartDropdown />}
      </NavigationContainer>
      <Outlet />
    </Fragment>
  );
}

export default Navigation;
