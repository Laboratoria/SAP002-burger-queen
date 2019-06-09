import firebase from "firebase";

const config = {
  apiKey: "AIzaSyCVOVmc8qnwOTbSdjyqTFA5NSjj85jA8cU",
  authDomain: "burguer-queen-la.firebaseapp.com",
  databaseURL: "https://burguer-queen-la.firebaseio.com",
  projectId: "burguer-queen-la",
  storageBucket: "burguer-queen-la.appspot.com",
  messagingSenderId: "252138684854",
  appId: "1:252138684854:web:3ddd7a6fef4c1ff1"
};

firebase.initializeApp(config);

export default firebase;