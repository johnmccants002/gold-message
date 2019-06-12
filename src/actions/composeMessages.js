import firebase from 'react-native-firebase'
import { Linking } from 'react-native'
const usersRef = firebase.firestore().collection('users');

import { COMPOSE_MESSAGE_TEXT, GOLD_MESSAGE_SENT, GOLD_MESSAGE_SENT_FAILED, RESET_COMPOSE_MESSAGE, CLEAR_ERROR, GOLD_MESSAGE_SENDING } from './types';
import { errorReceived } from './errors';

export const resetComposeMessage = () => {
    return {
        type: RESET_COMPOSE_MESSAGE
    }
}

export const sendGoldMessage = (phone, messageText) => {
    return async(dispatch, getStore) => {
        const { profile } = getStore()
        const { user } = profile
        try {
            dispatch({ type: GOLD_MESSAGE_SENDING  })
            const userPhoneNumber = user.phoneNumber
            const createdAt = firebase.firestore.Timestamp.fromDate(new Date())

            const senderUser = usersRef.doc(userPhoneNumber)
            const recipientUser = usersRef.doc(phone)
                                    
            const increment = firebase.firestore.FieldValue.increment(1);

            const inboxLastMessagePromise = recipientUser.collection('inbox').doc(userPhoneNumber).update({ lastGoldMessage: messageText, lastGoldMessageTime: createdAt, unread: increment })
            const inboxAddPromise = recipientUser.collection('inbox').doc(userPhoneNumber).collection('goldMessages').add({ goldMessage: messageText, created: createdAt })

            const outboxLastMessagePromise = senderUser.collection('outbox').doc(phone).set({ lastGoldMessage: messageText, lastGoldMessageTime: createdAt })
            const outboxAddPromise = senderUser.collection('outbox').doc(phone).collection('goldMessages').add({ goldMessage: messageText })

            const goldMessagesLastRecipientPromise = usersRef.doc(userPhoneNumber).collection('goldMessages').doc(messageText).set({ lastRecipient: phone })
            const goldMessagesAddPromise = usersRef.doc(userPhoneNumber).collection('goldMessages').doc(messageText).collection('recipients').doc(phone).set({})
            const userDetailsPromise = recipientUser.get()

            const { 6: userDetails} = await Promise.all([inboxLastMessagePromise, inboxAddPromise, outboxLastMessagePromise, outboxAddPromise, goldMessagesLastRecipientPromise, goldMessagesAddPromise, userDetailsPromise])
            
            const smsLink = `sms:${phone};?&body=${messageText}`
            if(userDetails.get('profile') == undefined) {
                Linking.openURL(smsLink);
            }
            
            dispatch({ type: GOLD_MESSAGE_SENT})
        }catch(e) {
            dispatch(errorReceived(GOLD_MESSAGE_SENT_FAILED, e))
        }
    }
}
export const composeMessageText = (messageText) => {
    return { type: COMPOSE_MESSAGE_TEXT, payload: messageText }
}