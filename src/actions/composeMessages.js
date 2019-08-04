import firebase from 'react-native-firebase'
import { Linking, Alert } from 'react-native'
const usersRef = firebase.firestore().collection('users');

import { COMPOSE_MESSAGE_TEXT, GOLD_MESSAGE_SENT, GOLD_MESSAGE_SENT_FAILED, RESET_COMPOSE_MESSAGE, CLEAR_ERROR, GOLD_MESSAGE_SENDING, UPDATE_PHONE_NUMBER, MULTIPLE_GOLD_MESSAGES } from './types';
import { errorReceived } from './errors';
import ComposeMessage from '../native/ComposeMessage';
import { sleep } from '../utils/utils';
import { INBOX } from './screens';

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

export const updateMultipleGoldMessages = (checkedGoldMessages) => {
    return {
        type: MULTIPLE_GOLD_MESSAGES, payload: checkedGoldMessages
    }
}

export const sendGoldMessage = (phone, navigation) => {
    return async(dispatch, getStore) => {
        const { profile, composeMessages } = getStore()
        const { user } = profile
        const { composeGoldMessages: goldMessages } = composeMessages
        try {
            dispatch({ type: GOLD_MESSAGE_SENDING  })
            const userPhoneNumber = user.phoneNumber
            const createdAt = firebase.firestore.Timestamp.fromDate(new Date())

            const senderUser = usersRef.doc(userPhoneNumber)
            const recipientUser = usersRef.doc(phone)
                                    
            const increment = firebase.firestore.FieldValue.increment(1);

            const promises = []
            const goldMessagesCount = goldMessages.length
            for(let i = 0; i < goldMessagesCount; i++) {
                const messageText = goldMessages[i]
                const inboxLastMessagePromise = recipientUser.collection('inbox').doc(userPhoneNumber).set({ lastGoldMessage: messageText, lastGoldMessageTime: createdAt, unread: increment }, {merge: true})
                const inboxAddPromise = recipientUser.collection('inbox').doc(userPhoneNumber).collection('goldMessages').doc(messageText).set({ count: increment, received: createdAt }, {merge: true})

                const outboxLastMessagePromise = senderUser.collection('outbox').doc(phone).set({ lastGoldMessage: messageText, lastGoldMessageTime: createdAt })
                const outboxAddPromise = senderUser.collection('outbox').doc(phone).collection('goldMessages').doc(messageText).set({ count: increment, received: createdAt }, {merge: true})

                const goldMessagesLastRecipientPromise = usersRef.doc(userPhoneNumber).collection('goldMessages').doc(messageText).set({ lastRecipient: phone, lastSent: createdAt }, {merge: true})
                const goldMessagesAddPromise = usersRef.doc(userPhoneNumber).collection('goldMessages').doc(messageText).collection('recipients').doc(phone).set({ lastSent: createdAt })

                promises.push(inboxLastMessagePromise, inboxAddPromise, outboxLastMessagePromise, outboxAddPromise, goldMessagesLastRecipientPromise, goldMessagesAddPromise)
            }

            await Promise.all(promises)
            
            const userDetails = await recipientUser.get()
            const { token, profile } = userDetails.data()
            //TODO call cloud function to send Firebase message.
            

            dispatch({ type: GOLD_MESSAGE_SENT})

            setTimeout(() => { navigation.navigate(INBOX) }, 1000)
            
            if(profile !== undefined) {
                return
            }

            Alert.alert(
                'Non Gold Message User',
                'Would you like to compose a message to invite this recipient?',
                [
                  { text : 'Yes', onPress : () => {
                        dispatch(sendMessage(phone, '(Link to app) See your GM', GOLD_MESSAGE_SENT_FAILED)) 
                        setTimeout(() => { navigation.navigate(INBOX) }, 500)
                    }
                  },
                  { text : 'Cancel', onPress : () => navigation.navigate(INBOX)},
                ],
                { cancelable : false },
              )
            
        }catch(e) {
            dispatch(errorReceived(GOLD_MESSAGE_SENT_FAILED, e))
        }
    }
}

export const sendMessage = (phoneNumber, messageText, errorType) => {
    return async(dispatch) => {
        const { success, message } = await ComposeMessage.sendMessage(phoneNumber, messageText)

        if(!success) {
            dispatch(errorReceived(errorType, message))
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