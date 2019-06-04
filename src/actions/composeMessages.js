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

            const senderUser = usersRef.doc(userPhoneNumber)
            const recipientUser = usersRef.doc(phone)

            
            const inboxAddPromise = recipientUser.collection('inbox').doc(userPhoneNumber).collection('goldMessages').add({ goldMessage: messageText })
            const outboxAddPromise = senderUser.collection('outbox').doc(phone).collection('goldMessages').add({ goldMessage: messageText })
            const goldMessagesAddPromise = usersRef.doc(userPhoneNumber).collection('goldMessages').doc(messageText).collection('recipients').doc(phone).set({})
            const userDetailsPromise = recipientUser.get()

            const { 0: inboxAdd, 1: outboxAdd, 2: goldMessagesAdd, 3: userDetails} = await Promise.all([inboxAddPromise, outboxAddPromise, goldMessagesAddPromise, userDetailsPromise])
            
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