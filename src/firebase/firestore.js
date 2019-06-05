import firebase from './firebase-config';
const database = firebase.firestore();

export default (data, uid) => 
  database
    .collection('users')
    .doc(uid)
    .set({
      ...data
    })
