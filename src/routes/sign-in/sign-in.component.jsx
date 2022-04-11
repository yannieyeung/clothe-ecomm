import { useEffect } from 'react';
import { getRedirectResult } from 'firebase/auth'

import {
    auth,
  signInWithGooglePopup,
  createUserDocumentFromAuth,
  signInWithGoogleRedirect,
} from "../../utils/firebase/firebase.utils";
import SignUpForm from '../../components/sign-up-form/sign-up-form.component';




function SignIn() {

    useEffect(()=>{
        async function signInWithRedirectResult() {
            const response = await getRedirectResult(auth);
            if (response){
                const userDocRef = await createUserDocumentFromAuth(response.user);
            }
        }
        signInWithRedirectResult();
        
       
    }, []);

 

    async function logGoogleUser() {
        const { user } = await signInWithGooglePopup();
        console.log(user);
        const userDocRef = await createUserDocumentFromAuth(user);
      }
  return (
    <div>
      <button onClick={logGoogleUser}>sign in with google</button>
      <button onClick={signInWithGoogleRedirect}>
        sign in with google Redirect
      </button>

      <SignUpForm />
    </div>
  );
}

export default SignIn;
