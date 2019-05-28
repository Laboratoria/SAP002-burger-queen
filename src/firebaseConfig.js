import firebase from "firebase";

const config = {
  apiKey: "AIzaSyC53IOt1_J3A7QK9HXnCVD2bqL79t0Fqjo",
  authDomain: "meus-posts.firebaseapp.com",
  databaseURL: "https://meus-posts.firebaseio.com",
  projectId: "meus-posts",
  storageBucket: "meus-posts.appspot.com",
  messagingSenderId: "996216975563",
  appId: "1:996216975563:web:17369775800ac27b"
};

firebase.initializeApp(config);

export default firebase;