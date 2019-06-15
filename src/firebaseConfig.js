import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyAYQJlgKPZfpSvSBAS-KTN_z84ee7sizPk",
  authDomain: "burger-teste.firebaseapp.com",
  databaseURL: "https://burger-teste.firebaseio.com",
  projectId: "burger-teste",
  storageBucket: "burger-teste.appspot.com",
  messagingSenderId: "459466966536",
  appId: "1:459466966536:web:51893e69626102a6"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);;

export default firebase;