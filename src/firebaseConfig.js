import firebase from "firebase";

const config = {
  apiKey: "AIzaSyDhQNoVdzQCWIOXYe4VLMQdhM6T7jtrOQs",
  authDomain: "burger-queen-jana.firebaseapp.com",
  databaseURL: "https://burger-queen-jana.firebaseio.com",
  projectId: "burger-queen-jana",
  storageBucket: "burger-queen-jana.appspot.com",
  messagingSenderId: "381242191952",
  appId: "1:381242191952:web:404058d382b4f807"
};

const firebaseApp = firebase.initializeApp(config);

export default firebaseApp;