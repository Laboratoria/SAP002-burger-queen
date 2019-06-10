import firebase from "firebase";

const config = {
  apiKey: "AIzaSyCd7XB9S7Z3fXEe73YIKXiWbUnYvQalWqY",
  authDomain: "buger-queen-lab.firebaseapp.com",
  databaseURL: "https://buger-queen-lab.firebaseio.com",
  projectId: "buger-queen-lab",
  storageBucket: "buger-queen-lab.appspot.com",
  messagingSenderId: "1025496424084",
  appId: "1:1025496424084:web:af2aa382d7d7e9f4"
};

firebase.initializeApp(config);

export default firebase;