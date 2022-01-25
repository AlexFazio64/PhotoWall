import App from './Components/App.svelte';
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { auth, provider } from './stores';

const firebaseConfig = {
    apiKey: "AIzaSyAQ_LKyceQeVjFp0pAgoOAWEnsmMhN9ZDM",
    authDomain: "getting-started-bc543.firebaseapp.com",
    databaseURL: "https://getting-started-bc543-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "getting-started-bc543",
    storageBucket: "getting-started-bc543.appspot.com",
    messagingSenderId: "587752891564",
    appId: "1:587752891564:web:873eb39abe5e4baf492b09"
};

const firebaseapp = initializeApp(firebaseConfig);
const firebaseAuth = getAuth(firebaseapp);
const firebaseProvider = new GoogleAuthProvider();
firebaseProvider.addScope("https://www.googleapis.com/auth/photoslibrary.readonly");
firebaseProvider.addScope("https://www.googleapis.com/auth/photoslibrary.appendonly");

auth.update((a) => a = firebaseAuth);
provider.update((p) => p = firebaseProvider);

const app = new App({ target: document.body });

export default app;