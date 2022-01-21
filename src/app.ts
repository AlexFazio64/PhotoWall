import $ from "jquery";
import { init, getGridArea } from "./packing";
import { initializeApp } from "firebase/app";
import {
    getAuth,
    signInWithRedirect,
    GoogleAuthProvider,
    getRedirectResult
} from "firebase/auth";

var grid = $("#background");
$("#login-form").on("submit", (e) => {
    e.preventDefault();
    signInWithRedirect(auth, provider);
});

const r = Math.floor(Math.random() * 15) % 6 + 6;
const c = Math.floor(Math.random() * 15) % 6 + 6;

init(r, c, (rows, cols) => {
    grid.css("grid-template-rows", `repeat(${rows}, 1fr)`)
        .css("grid-template-columns", `repeat(${cols}, 1fr)`);
});

getGridArea().then(sol => {
    sol.positions.forEach((dim, index) => {
        let div = $("<div></div>")
            .toggleClass(dim.char)
            .css(
                "background-image",
                "url(img/" + (index % 17 + 1) + ".jpg)");

        grid.append(div);
    })
});

const firebaseConfig = {
    apiKey: "AIzaSyAQ_LKyceQeVjFp0pAgoOAWEnsmMhN9ZDM",
    authDomain: "getting-started-bc543.firebaseapp.com",
    databaseURL: "https://getting-started-bc543-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "getting-started-bc543",
    storageBucket: "getting-started-bc543.appspot.com",
    messagingSenderId: "587752891564",
    appId: "1:587752891564:web:873eb39abe5e4baf492b09"
};

const app = initializeApp(firebaseConfig);
let provider = new GoogleAuthProvider();
const auth = getAuth(app);
provider.addScope("https://www.googleapis.com/auth/photoslibrary.readonly");
provider.addScope("https://www.googleapis.com/auth/photoslibrary.appendonly");

getRedirectResult(auth).then((cred) => {
    //implement redirect to a different page from GCP
    //implement signout too
    if (cred) {
        let token = GoogleAuthProvider.credentialFromResult(cred).accessToken;
        console.log(token);
    }
});
