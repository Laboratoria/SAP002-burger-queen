import firebase from "firebase";


const config = {
  apiKey: "AIzaSyDbQfdWnQBzd36ldGcRfVsBr5jP-K9i9vY",
  authDomain: "burguer-queem.firebaseapp.com",
  databaseURL: "https://burguer-queem.firebaseio.com",
  projectId: "burguer-queem",
  storageBucket: "burguer-queem.appspot.com",
  messagingSenderId: "354892525268",
  appId: "1:354892525268:web:986b9e5c1b76c3fa"
};

firebase.initializeApp(config);

export default firebase;
