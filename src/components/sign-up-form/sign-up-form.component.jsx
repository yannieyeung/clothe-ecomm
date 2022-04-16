import { useState, useContext } from "react";
import {
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils";

import FormInput from "../form-input/form-input.component";

import './sign-up-form.style.scss'

import Button from '../button/button.component'

//import { UserContext } from "../../contexts/user.context";

const defaultFormFields = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
};


function SignUpForm() {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { displayName, email, password, confirmPassword } = formFields;
  

  //this is not needed alr as onAuthchanged will handle this in userContext
  //const { setCurrentUser } = useContext(UserContext);


  //   function handleChange(event) {
  //     const { name, value } = event.target;

  //     setFormFields({ ...formFields, [name]: value });
  //     console.log(formFields);
  //   }

  //ES6
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormFields({ ...formFields, [name]: value });
  };

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("pressed");

    if (password === confirmPassword) {
      try {
        const { user } = await createAuthUserWithEmailAndPassword(
          email,
          password
        );
        await createUserDocumentFromAuth(user, { displayName });
        resetFormFields();
        
        //this is not needed alr as onAuthchanged will handle this in userContext
        //setCurrentUser(user);

      } catch (e) {
        if (e.code === "auth/email-already-in-use") {
          alert("email alr in used");
        } else {
          console.log("user creation encountered error", e);
        }
      }
    } else {
      alert("password not the same as confirmPassword");
      return;
    }
  };



  return (
    <div className="sign-up-container">
      <h2>Dont have an account?</h2>
      <span>This is the sign up form</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Display Name"
          type="text"
          onChange={handleChange}
          name="displayName"
          value={displayName}
          required
        />

        <FormInput
          label="Email"
          type="email"
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

        <FormInput
          label="Confirm Password"
          type="passwword"
          onChange={handleChange}
          name="confirmPassword"
          value={confirmPassword}
          required
        />
        <Button type="submit">Sign Up</Button>
      </form>
    </div>
  );
}

export default SignUpForm;
