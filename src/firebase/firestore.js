import firebase from '../firebaseConfig'
const database = firebase.firestore();

export default (data, uid) =>
  database
    .collection('users')
    .doc(uid)
    .set({
      ...data
    })
