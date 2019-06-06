import firebase from "firebase";

const config = {
  apiKey: "AIzaSyB39FlUi5d3Z_HA32Gkn3oxjIuyHSPYd4E",
  authDomain: "burger-queen-cakeno.firebaseapp.com",
  databaseURL: "https://burger-queen-cakeno.firebaseio.com",
  projectId: "burger-queen-cakeno",
  storageBucket: "burger-queen-cakeno.appspot.com",
  messagingSenderId: "211022016257",
  appId: "1:211022016257:web:addf924a30aec9f0"
};

firebase.initializeApp(config);

export default firebase;