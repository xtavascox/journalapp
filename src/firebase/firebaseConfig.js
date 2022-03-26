import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDAenUFSNJ8CUIihYtgQzUGPKSLfWUfhr8",
  authDomain: "react-app-curso-a434e.firebaseapp.com",
  projectId: "react-app-curso-a434e",
  storageBucket: "react-app-curso-a434e.appspot.com",
  messagingSenderId: "637019193735",
  appId: "1:637019193735:web:2879391218711206d31322",
};

firebase.initializeApp(firebaseConfig);

const db=firebase.firestore();
const googleAuthProvider=new firebase.auth.GoogleAuthProvider();


export {
    db,
    googleAuthProvider,
    firebase
}
