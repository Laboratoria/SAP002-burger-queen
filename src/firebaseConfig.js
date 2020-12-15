import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBse3BtZQTLGDSMzJFGeMKH7jMa1Im1tL8",
  authDomain: "burger-queen-tati.firebaseapp.com",
  databaseURL: "https://burger-queen-tati.firebaseio.com",
  projectId: "burger-queen-tati",
  storageBucket: "burger-queen-tati.appspot.com",
  messagingSenderId: "64672918269",
  appId: "1:64672918269:web:96ba45e7b42b7ebd"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;