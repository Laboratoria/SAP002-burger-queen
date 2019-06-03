import firebase from "firebase";

const config = {
  apiKey: "AIzaSyCsQ_Ix05WFRfQ9Rzd1BkBFQ8swLiPGi0I",
  authDomain: "burger-queen-db.firebaseapp.com",
  databaseURL: "https://burger-queen-db.firebaseio.com",
  projectId: "burger-queen-db",
  storageBucket: "burger-queen-db.appspot.com",
  messagingSenderId: "392465605210",
  appId: "1:392465605210:web:7330af2e9a754129"
};

firebase.initializeApp(config);

export default firebase;