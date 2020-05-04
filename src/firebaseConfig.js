import firebase from 'firebase'

const firebaseConfig = {
  apiKey: "AIzaSyDv1slP8pB-Flczzln7locq0l5yqlmflr0",
  authDomain: "react-firebase-auth-f53d3.firebaseapp.com",
  databaseURL: "https://react-firebase-auth-f53d3.firebaseio.com",
  projectId: "react-firebase-auth-f53d3",
  storageBucket: "react-firebase-auth-f53d3.appspot.com",
  messagingSenderId: "909873937226",
  appId: "1:909873937226:web:f1c4c7a2f4a4cd9d"
}

firebase.initializeApp(firebaseConfig)

export default firebase