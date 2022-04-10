import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';


const firebaseConfig = {
  apiKey: "AIzaSyC5EtJ4rlI7Q_OhAZPt8d_rD0Pdyl8j4us",
  authDomain: "crwn-clothing-db-4bcb4.firebaseapp.com",
  projectId: "crwn-clothing-db-4bcb4",
  storageBucket: "crwn-clothing-db-4bcb4.appspot.com",
  messagingSenderId: "241133000974",
  appId: "1:241133000974:web:1593520f0a5461067a9f5f",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.getCustomParameters({
    prompt: "select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup = () => {
    return signInWithPopup(auth, provider);
}
export const db = getFirestore();

export async function createUserDocumentFromAuth(userAuth) {
    const userDocRef = doc(db, 'users', userAuth.uid);
    const userSnapshot = await getDoc(userDocRef);
    if(!userSnapshot.exists()){
        const {displayName, email} = userAuth;
        const createdAt = new Date();

        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt
            })
        } catch (e){
            console.log('error from creating the user doc', e.message)

        }
    } 
    return userDocRef;
}


