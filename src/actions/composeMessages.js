import firebase from 'react-native-firebase'
import { Linking, Alert, Platform, PermissionsAndroid } from 'react-native'
import base64 from 'react-native-base64'

const usersRef = firebase.firestore().collection('users');

import { COMPOSE_MESSAGE_TEXT, GOLD_MESSAGE_SENT, GOLD_MESSAGE_SENT_FAILED, RESET_COMPOSE_MESSAGE, CLEAR_ERROR, GOLD_MESSAGE_SENDING, UPDATE_PHONE_NUMBER, MULTIPLE_GOLD_MESSAGES } from './types';
import { errorReceived } from './errors';
import ComposeMessage from '../native/ComposeMessage';
import { sleep } from '../utils/utils';
import { INBOX } from './screens';

const IOS_APP_URL = "https://apps.apple.com/us/app/gold-message/id1466581916?ls=1"
const ANDROID_APP_URL = "https://apps.apple.com/us/app/gold-message/id1466581916?ls=1"

const APP_URL = Platform.select({
    ios: IOS_APP_URL,
    android: ANDROID_APP_URL
})

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
                const encodedMessageText = base64.encode(messageText)

                const inboxLastMessagePromise = recipientUser.collection('inbox').doc(userPhoneNumber).set({ lastGoldMessage: messageText, lastGoldMessageTime: createdAt, unread: increment }, {merge: true})
                const inboxAddPromise = recipientUser.collection('inbox').doc(userPhoneNumber).collection('goldMessages').doc(encodedMessageText).set({ goldMessage: messageText, count: increment, received: createdAt }, {merge: true})

                const outboxLastMessagePromise = senderUser.collection('outbox').doc(phone).set({ lastGoldMessage: messageText, lastGoldMessageTime: createdAt })
                const outboxAddPromise = senderUser.collection('outbox').doc(phone).collection('goldMessages').doc(encodedMessageText).set({ goldMessage: messageText, count: increment, received: createdAt }, {merge: true})

                const goldMessagesLastRecipientPromise = usersRef.doc(userPhoneNumber).collection('goldMessages').doc(encodedMessageText).set({ goldMessage: messageText, lastRecipient: phone, lastSent: createdAt }, {merge: true})
                const goldMessagesAddPromise = usersRef.doc(userPhoneNumber).collection('goldMessages').doc(encodedMessageText).collection('recipients').doc(phone).set({ lastSent: createdAt })

                promises.push(inboxLastMessagePromise, inboxAddPromise, outboxLastMessagePromise, outboxAddPromise, goldMessagesLastRecipientPromise, goldMessagesAddPromise)
            }

            await Promise.all(promises)
            
            const userDetails = await recipientUser.get()
            const { token, profile } = userDetails && userDetails.data() ? userDetails.data() : { }
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
                        dispatch(sendMessage(phone, `Check out the Gold Message I just sent. Here's the link to the app to see it ${APP_URL}`, GOLD_MESSAGE_SENT_FAILED)) 
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

        if(Platform.OS === 'ios') {
            const { success, message } = await ComposeMessage.sendMessage(phoneNumber, messageText)

            if(!success) {
                dispatch(errorReceived(errorType, message))
            } 
        } else {
            Linking.openURL(`sms:${phoneNumber}?body=${messageText}`).catch((reason) => {
                dispatch(errorReceived(errorType, reason))
            })
        }
        
    }
}

export const deleteGoldMessage = (goldMessage) => {
    return async(dispatch, getStore) => {
        try {
            const { profile } = getStore()
            const { user } = profile
            const { phoneNumber } = user

            const encodedMessageText = base64.encode(goldMessage)

            let goldMessageDoc = await usersRef.doc(phoneNumber).collection('goldMessages').doc(encodedMessageText).get()
            if(!goldMessageDoc.exists) {
                goldMessageDoc = await usersRef.doc(phoneNumber).collection('goldMessages').doc(goldMessage).get()
            }
            const goldMessageDocReference = goldMessageDoc.ref

            const goldMessageRecipientsCollection = await goldMessageDocReference.collection('recipients').get()
                           
            const deleteRecipientsGoldMessageCopy = goldMessageRecipientsCollection.docs.map((doc) => {
                if(doc) {
                    return usersRef.doc(doc.id).collection('inbox').doc(phoneNumber).collection('goldMessages').doc(goldMessageDoc.id).delete()
                }
            })

            const goldMessageDeleteRecipientsPromise = goldMessageRecipientsCollection.docs.map((doc) => {
                if(doc) {
                    return doc.ref.delete()
                }
            })

            await Promise.all([...goldMessageDeleteRecipientsPromise, ...deleteRecipientsGoldMessageCopy])

            await goldMessageDocReference.delete()
        }catch(e) {
            console.log('e', e)
        }
    }
}

export const composeMessageText = (messageText) => {
    return { type: COMPOSE_MESSAGE_TEXT, payload: messageText }
}

export const requestContactsPermission = async() => {
    try {
      const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_CONTACTS);
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        return true
      }
    } catch (err) {
      console.warn(err);
    }

    return false
  }