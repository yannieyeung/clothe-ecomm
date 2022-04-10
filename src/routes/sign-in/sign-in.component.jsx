import { signInWithGooglePopup, createUserDocumentFromAuth } from '../../utils/firebase/firebase.utils';

async function logGoogleUser()  {
    const {user} = await signInWithGooglePopup();
    console.log(user)
    const userDocRef = await createUserDocumentFromAuth(user);
};


function SignIn(){
return(<div>
    <button onClick={logGoogleUser}>
        sign in with google
    </button>
</div>);

};




export default SignIn