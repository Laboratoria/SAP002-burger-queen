import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const config = {
  apiKey: "AIzaSyCXh3JII4cCsmoUxBJgSpGKDVAkvAEsL-g",
  authDomain: "burguerqueen-f0b7c.firebaseapp.com",
  databaseURL: "https://burguerqueen-f0b7c.firebaseio.com",
  projectId: "burguerqueen-f0b7c",
  storageBucket: "burguerqueen-f0b7c.appspot.com",
  messagingSenderId: "1039913513685",
  appId: "1:1039913513685:web:b45607e488fbd784"
};

firebase.initializeApp(config);

export default firebase;
