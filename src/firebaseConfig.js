import firebase from "firebase";

const config = {
  apiKey: "AIzaSyBcQwaPAbZ2Hq5a_K7jHkWiGHDxkSeHvLI",
  authDomain: "burger-queen-gtech.firebaseapp.com",
  databaseURL: "https://burger-queen-gtech.firebaseio.com",
  projectId: "burger-queen-gtech",
  storageBucket: "burger-queen-gtech.appspot.com",
  messagingSenderId: "223914783742",
  appId: "1:223914783742:web:613069be8f70968e"
};

firebase.initializeApp(config);

export default firebase;