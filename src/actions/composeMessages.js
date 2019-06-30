import firebase from 'react-native-firebase'
import { Linking } from 'react-native'
const usersRef = firebase.firestore().collection('users');

import { COMPOSE_MESSAGE_TEXT, GOLD_MESSAGE_SENT, GOLD_MESSAGE_SENT_FAILED, RESET_COMPOSE_MESSAGE, CLEAR_ERROR, GOLD_MESSAGE_SENDING, UPDATE_PHONE_NUMBER } from './types';
import { errorReceived } from './errors';

export const resetComposeMessage = () => {
    return {
        type: RESET_COMPOSE_MESSAGE
    }
}

export const updatePhoneNumber = (phoneNumber) => {
    return {
        type: UPDATE_PHONE_NUMBER, payload: phoneNumber
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

            const inboxLastMessagePromise = recipientUser.collection('inbox').doc(userPhoneNumber).set({ lastGoldMessage: messageText, lastGoldMessageTime: createdAt, unread: increment }, {merge: true})
            const inboxAddPromise = recipientUser.collection('inbox').doc(userPhoneNumber).collection('goldMessages').doc(messageText).set({ count: increment, received: createdAt }, {merge: true})

            const outboxLastMessagePromise = senderUser.collection('outbox').doc(phone).set({ lastGoldMessage: messageText, lastGoldMessageTime: createdAt })
            const outboxAddPromise = senderUser.collection('outbox').doc(phone).collection('goldMessages').doc(messageText).set({ count: increment, received: createdAt }, {merge: true})

            const goldMessagesLastRecipientPromise = usersRef.doc(userPhoneNumber).collection('goldMessages').doc(messageText).set({ lastRecipient: phone, lastSent: createdAt }, {merge: true})
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

export const deleteGoldMessage = (goldMessage) => {
    return async(dispatch, getStore) => {
        try {
            const { profile } = getStore()
            const { user } = profile
            const { phoneNumber } = user

            const goldMessageRecipientsCollection = await usersRef.doc(phoneNumber).collection('goldMessages').doc(goldMessage).collection('recipients').get()
                            
            const goldMessageDeleteRecipientsPromise = goldMessageRecipientsCollection.docs.map((doc) => {
                if(doc) {
                    return doc.ref.delete()
                }
            })

            await Promise.all(goldMessageDeleteRecipientsPromise)

            await usersRef.doc(phoneNumber).collection('goldMessages').doc(goldMessage).delete()
        }catch(e) {
            console.log('e', e)
        }
    }
}

export const composeMessageText = (messageText) => {
    return { type: COMPOSE_MESSAGE_TEXT, payload: messageText }
}