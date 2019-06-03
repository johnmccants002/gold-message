import firebase from 'react-native-firebase'
const usersRef = firebase.firestore().collection('users');

import { COMPOSE_MESSAGE_TEXT } from './types';

export const sendGoldMessage = (phone, messageText) => {
    return async(dispatch, getStore) => {
        const { profile } = getStore()
        const { user } = profile
        const userPhoneNumber = user.phoneNumber

        const inboxAdd = await usersRef.doc(phone).collection('inbox').add({
            goldMessage: messageText,
          })
          console.log('inboxAdd', inboxAdd)
        const outboxAdd = await usersRef.doc(userPhoneNumber).collection('outbox').add({
            goldMessage: messageText,
        })

        console.log('outboxAdd', outboxAdd)
        const goldMessagesAdd = await usersRef.doc(userPhoneNumber).collection('goldMessages').doc(messageText).collection('recipients').doc(phone).set({})

        console.log('goldMessagesAdd', goldMessagesAdd)
    }
}

export const composeMessageText = (messageText) => {
    return { type: COMPOSE_MESSAGE_TEXT, payload: messageText }
}