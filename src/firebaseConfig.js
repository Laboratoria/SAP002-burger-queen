import firebase from "firebase";

var firebaseConfig = {
  apiKey: "AIzaSyAvSzepGkSmNt0_Rl-KXy_o18lpfuA0mzk",
  authDomain: "burger-queen-308e3.firebaseapp.com",
  databaseURL: "https://burger-queen-308e3.firebaseio.com",
  projectId: "burger-queen-308e3",
  storageBucket: "burger-queen-308e3.appspot.com",
  messagingSenderId: "294099541135",
  appId: "1:294099541135:web:5c94bf72cc0dcdea"
};

firebase.initializeApp(firebaseConfig);

export default firebase;