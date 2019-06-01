import firebase from 'firebase';

const config = {
  apiKey: "AIzaSyDUhbJ9xMOtp_siQNX3An_0vZpdfCLMKyw",
  authDomain: "burguer-queen-2e2d7.firebaseapp.com",
  databaseURL: "https://burguer-queen-2e2d7.firebaseio.com",
  projectId: "burguer-queen-2e2d7",
  storageBucket: "burguer-queen-2e2d7.appspot.com",
  messagingSenderId: "464616833466",
  appId: "1:464616833466:web:d2bfaabd3f22ae07"
};

firebase.initializeApp(config);

export default firebase;