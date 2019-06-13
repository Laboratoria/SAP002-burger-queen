import firebase from "firebase";

const config = {
  apiKey: "AIzaSyCLc6zMp__1fw2ed--U7CI8ILtxJBxFL7Y",
  authDomain: "burger-queen-2.firebaseapp.com",
  databaseURL: "https://burger-queen-2.firebaseio.com",
  projectId: "burger-queen-2",
  storageBucket: "burger-queen-2.appspot.com",
  messagingSenderId: "527593094326",
  appId: "1:527593094326:web:9d5deac5bec2607d"
};

firebase.initializeApp(config);

export default firebase;