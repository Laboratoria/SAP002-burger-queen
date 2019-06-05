import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const key = "AIzaSyDAq-s5xj3VX5LgdR3Pf3qZN3kcF3b9EAc";

const firebaseConfig = {
  apiKey: key,
  authDomain: "burguer-queen-f8f37.firebaseapp.com",
  databaseURL: "https://burguer-queen-f8f37.firebaseio.com",
  projectId: "burguer-queen-f8f37",
  storageBucket: "burguer-queen-f8f37.appspot.com",
  messagingSenderId: "157548718764",
  appId: "1:157548718764:web:6916872797ad9019"
};

firebase.initializeApp(firebaseConfig);

export default firebase;
