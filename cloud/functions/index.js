// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.
// The Firebase Admin SDK to access the Firebase Realtime Database.
const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();

// Realtime Database under the path /messages/:pushId/original
exports.notifyOnGoldMessage = functions.firestore.document('/users/{recipient}/inbox/{sender}/goldMessages/{message}')
    .onWrite(async(change, context) => {
      const { recipient, sender, message } = context.params
      const value = change.after.data();

      const recipientUser = await admin.firestore().doc(`/users/${recipient}`).get()
      const { profile: recipientProfile, token: recipientToken } = recipientUser.data()

      const recipientSenderInbox = await admin.firestore().doc(`/users/${recipient}/inbox/${sender}`).get()
      const { blocked } = recipientSenderInbox.data() || { }
      if(blocked) {
        console.log('Sender is blocked, skipping push')

        return
      }

      const senderUser = await admin.firestore().doc(`/users/${sender}`).get()
      const { profile: senderProfile } = senderUser.data()
      const { firstName: senderFirstName } = senderProfile

      const payload = { 
        notification: {
            title: "New Gold Message",
            body: `${senderFirstName} sent you a Gold Message`,
            priority:"high"
        },
        data: { 
          title: "New Gold Message",
          body: `${senderFirstName} sent you a Gold Message`
        }
      }

      
      await admin.database().ref('/messages').push({recipient, sender, message, recipientProfile, recipientToken, senderProfile, value });
      await admin.messaging().sendToDevice(recipientToken, payload)
  });
  