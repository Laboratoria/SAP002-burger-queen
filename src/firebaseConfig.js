import firebase from "firebase";

const config = {
  apiKey: "AIzaSyD9gYp3Nmnkdm1xqlqg7QI-4e9z4UobTnI",
  authDomain: "burger-queen-8cc11.firebaseapp.com",
  databaseURL: "https://burger-queen-8cc11.firebaseio.com",
  projectId: "burger-queen-8cc11",
  storageBucket: "burger-queen-8cc11.appspot.com",
  messagingSenderId: "793402338497",
  appId: "1:793402338497:web:69fc0f1048252764"
};

firebase.initializeApp(config);

export default firebase;