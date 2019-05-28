import firebase from "firebase";

const config = {
  apiKey: "<sua-chave>",
  authDomain: "<sua-chave>",
  databaseURL: "<sua-chave>",
  projectId: "<sua-chave>",
  storageBucket: "<sua-chave>",
  messagingSenderId: "<sua-chave>",
  appId: "<sua-chave>"
};

firebase.initializeApp(config);

export default firebase;