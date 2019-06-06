import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyA0AU52xMxCaRk5kuM9DW5mHlGmletyf0A",
  authDomain: "burger-queen-ccb0b.firebaseapp.com",
  databaseURL: "https://burger-queen-ccb0b.firebaseio.com",
  projectId: "burger-queen-ccb0b",
  storageBucket: "burger-queen-ccb0b.appspot.com",
  messagingSenderId: "356813117239",
  appId: "1:356813117239:web:f7daf3fbc69d5ae7"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);;

export default firebase;