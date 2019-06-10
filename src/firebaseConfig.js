import firebase from "firebase";

const config = {
  apiKey: "AIzaSyAGP5abkzFY9VN2niIVuc6kQcSchTK3RjE",
  authDomain: "burger-queen-77776.firebaseapp.com",
  databaseURL: "https://burger-queen-77776.firebaseio.com",
  projectId: "burger-queen-77776",
  storageBucket: "burger-queen-77776.appspot.com",
  messagingSenderId: "2633920867",
  appId: "1:2633920867:web:aa50118883bd793b"
};

firebase.initializeApp(config);

export default firebase;