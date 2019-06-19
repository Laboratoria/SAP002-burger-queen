const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();
admin.firestore().settings({ timestampsInSnapshots: true });

exports.deleteProfile = functions.auth.user().onDelete(
  user => admin.firestore().doc(`users/${user.uid}`).delete()
);
