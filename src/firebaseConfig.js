import firebase from "firebase";

const config = {
  apiKey: "AIzaSyBF1lHpTWqv57SOajnARlRS1ybfXKVuDnc",
  authDomain: "burger-queen-6185c.firebaseapp.com",
  databaseURL: "https://burger-queen-6185c.firebaseio.com",
  projectId: "burger-queen-6185c",
  storageBucket: "burger-queen-6185c.appspot.com",
  messagingSenderId: "471927435380",
  appId: "1:471927435380:web:8f58c82a31422cef"
};

firebase.initializeApp(config);

export default firebase;