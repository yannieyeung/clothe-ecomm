import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc, collection, writeBatch, query, getDocs } from 'firebase/firestore';


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

export const signInWithGoogleRedirect = () => {
    return signInWithRedirect(auth, provider);
}


export const db = getFirestore();


export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
    const collectionRef = collection(db, collectionKey);
    const batch = writeBatch(db);

    objectsToAdd.forEach((object)=>{
        const docRef = doc(collectionRef, object.title.toLowerCase());
        batch.set(docRef, object);
    });

    await batch.commit();
    console.log('done');
}

export const getCategoriesAndDocuments = async () =>{
    const collectionRef = collection(db, 'categories');
    const q = query(collectionRef);

    const querySnapshot = await getDocs(q);
    const categoryMap = querySnapshot.docs.reduce((acc, docSnapshot)=>{
        const {title, items} = docSnapshot.data();
        acc[title.toLowerCase()] = items;
        return acc;
    },{})
    return categoryMap;
}


export async function createUserDocumentFromAuth(userAuth, additionalInfo={}) {
    if(!userAuth) return;
    const userDocRef = doc(db, 'users', userAuth.uid);
    const userSnapshot = await getDoc(userDocRef);
    if(!userSnapshot.exists()){
        const {displayName, email} = userAuth;
        const createdAt = new Date();

        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt,
                ...additionalInfo
            })
        } catch (e){
            console.log('error from creating the user doc', e.message)

        }
    } 
    return userDocRef;
}

export const createAuthUserWithEmailAndPassword = async (email, password) => {
    if(!email || !password) return;
    
   return await createUserWithEmailAndPassword(auth, email, password);
}

export const signInUserWithEmailAndPassword = async (email, password) =>{
    if(!email || !password) return;

    return await signInWithEmailAndPassword(auth, email, password)
}

export const signOutUser = async () => {
    await signOut(auth);
}

export const onAuthChangeListnerer = (callback) => {
    onAuthStateChanged(auth, callback);
}







