import { useState, useContext } from "react";
import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";
import "./sign-in-form.styles.scss";
//import { UserContext } from "../../contexts/user.context";



import {
  signInWithGooglePopup,
  createUserDocumentFromAuth,
  signInUserWithEmailAndPassword,
} from "../../utils/firebase/firebase.utils";

const initialFormFields = {
  email: "",
  password: "",
};

const SignInForm = () => {
  const [formFields, setFormFields] = useState(initialFormFields);
  const { email, password } = formFields;
//this is not needed alr as onAuthchanged will handle this in userContext
//const { setCurrentUser } = useContext(UserContext);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  async function logGoogleUser() {
    const { user } = await signInWithGooglePopup();
    console.log('from sign in form googlepopup', user);
    
    //this is not needed alr as onAuthchanged will handle this in userContext
    //const userDocRef = await createUserDocumentFromAuth(user);
  }

  const resetFormFields = () => {
    setFormFields(initialFormFields);
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    try {
      const {user} = await signInUserWithEmailAndPassword(email, password);
    //   console.log(response);

    //this is not needed alr as onAuthchanged will handle this in userContext
      // setCurrentUser(user);

    } catch (e) {
      switch (e.code) {
        case "auth/wrong-password":
          alert("Incorrect password for email");
          break;
        case "auth/user-not-found":
          alert("no user assocaited with this email");
          break;
        default:
          console.log(e);
      }
    }
    resetFormFields();
  };

  return (
    <div className="sign-in-container">
      <h2>Already have an account?</h2>
      <span>Sign in with your email and password</span>
      <form onSubmit={submitHandler}>
        <FormInput
          label="Email"
          type="text"
          onChange={handleChange}
          name="email"
          value={email}
          required
        />
        <FormInput
          label="Password"
          type="password"
          onChange={handleChange}
          name="password"
          value={password}
          required
        />
        <div className="buttons-container">
          <Button type="submit">Sign In</Button>
          <Button type='button' onClick={logGoogleUser} buttonType="google">
            Google sign in
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SignInForm;
