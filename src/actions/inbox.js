import firebase from 'react-native-firebase'
import {
    Alert,
} from 'react-native';

import { REFRESHING_INBOX, INBOX_REFRESHED, REFRESHING_INBOX_ERROR, SELECTED_USER_GOLD_MESSAGES, SELECTED_USER, SELECTED_USER_GOLD_MESSAGES_LOADING, SENT_GOLD_MESSAGES_LOADING, SENT_GOLD_MESSAGES_ERROR, SENT_GOLD_MESSAGES_RECEIVED } from './types';
import { errorReceived } from './errors';

const usersRef = firebase.firestore().collection('users');

export const refreshInbox = () => {
    return async(dispatch, getStore) => {
        const { profile } = getStore()
        const { user } = profile
        const { phoneNumber } = user
        
        dispatch({ type: REFRESHING_INBOX })
        try {

            const inboxCollection = await usersRef.doc(phoneNumber).collection('inbox').get()

            const inboxFiltered = inboxCollection.docs.filter((doc) => {
                const { blocked } = doc.data()
                
                return !blocked
            })
            
            const inboxProfilePromises = inboxFiltered.map((doc) => {
                return usersRef.doc(doc.id).get()
            })


            const inboxProfileDocuments = await Promise.all(inboxProfilePromises)
            
            const inbox = []
            const inboxCount = inboxFiltered.length
            for(let i = 0; i < inboxCount; i++) {
                inbox.push({...inboxProfileDocuments[i].data().profile, ...inboxFiltered[i].data(), phoneNumber: inboxFiltered[i].id })
            }

            dispatch({ type: INBOX_REFRESHED, payload: inbox })
        }catch(e) {
            dispatch(errorReceived(REFRESHING_INBOX_ERROR, e))
        }
    }
}

export const selectedItem = (item) => {
    return { type: SELECTED_USER,  payload: item }
}

export const getIncomingGoldMessage = (phone) => {
    return async(dispatch, getStore) => {
        const { profile } = getStore()
        const { user } = profile

        dispatch({ type: SELECTED_USER_GOLD_MESSAGES_LOADING })
        try {
            const userPhoneNumber = user.phoneNumber
            const goldMessagesSnapshot = await usersRef.doc(userPhoneNumber).collection('inbox').doc(phone).collection('goldMessages').get()

            const goldMessagesFiltered = goldMessagesSnapshot.docs.filter((doc) => {
                const { reported } = doc.data()
                
                return !reported
            })

            const goldMessages = goldMessagesFiltered.map((doc) => { 
                const { goldMessage: goldMessageText } = doc.data()
                    return { goldMessage: goldMessageText || doc.id, ...doc.data(), id: doc.id, phone } 
            })
            

            dispatch({ type: SELECTED_USER_GOLD_MESSAGES, payload: goldMessages })
        }catch(e) {
            dispatch(errorReceived(REFRESHING_INBOX_ERROR, e))
        }
    }
}


export const clearUnread = (phone) => {
    return async(dispatch, getStore) => {
        const { profile, inbox } = getStore()
        const { user } = profile
        const { items } = inbox

        try {
            const userPhoneNumber = user.phoneNumber
            await usersRef.doc(userPhoneNumber).collection('inbox').doc(phone).set({ unread: 0 }, {merge: true})

            const updateItems = items.map((item) => {
                if(item.phoneNumber == phone) {
                    return { ...item, unread: 0}
                }

                return item
            })

            dispatch({ type: INBOX_REFRESHED, payload: updateItems })
        }catch(e) {
            dispatch(errorReceived(REFRESHING_INBOX_ERROR, e))
        }
    }
}


export const blockUser = (item) => {
    return async(dispatch) => {
        const { phoneNumber: targetBlockPhoneNumber } = item
        const userPhoneNumber = firebase.auth().currentUser.phoneNumber
        const userRef = firebase.firestore().collection('users').doc(userPhoneNumber)

        await userRef.collection('inbox').doc(targetBlockPhoneNumber).set({ blocked: true }, {merge: true})

        Alert.alert(
            'User Blocked',
            'They will not be able to send you Gold Messages'
        )
    }
}

export const reportGoldMessage = (item) => {
    return async(dispatch) => {
        const { id, phone, goldMessage } = item
        const userPhoneNumber = firebase.auth().currentUser.phoneNumber

        await usersRef.doc(userPhoneNumber).collection('inbox').doc(phone).collection('goldMessages').doc(id).set({ reported: true }, {merge: true})
        const inboxSender = await usersRef.doc(userPhoneNumber).collection('inbox').doc(phone).get()
        console.log('inboxSender', inboxSender)
        if(inboxSender.data().lastGoldMessage == goldMessage) {
            inboxSender.ref.set({ lastGoldMessage: '' }, {merge: true})
        }
        dispatch(getIncomingGoldMessage())

        Alert.alert(
            'Gold Message Reported',
            'This Gold Message has been reported'
        )
    }
}

export const getSentGoldMessages = () => {
    return async(dispatch, getStore) => {
        const { profile } = getStore()
        const { user } = profile
        const { phoneNumber } = user
        
        dispatch({ type: SENT_GOLD_MESSAGES_LOADING })
        try {

            const sentGoldMessages = await usersRef.doc(phoneNumber).collection('goldMessages').get()
            
            const goldMessagesPromises = sentGoldMessages.docs.map((goldMessage) => {
                return new Promise(async(resolve, reject) => {
                    const { lastRecipient, lastSent, goldMessage: goldMessageText } = goldMessage.data()
                    try {

                        const goldMessageRecipientsCollection = await goldMessage.ref.collection('recipients').get()
                        
                        const goldMessageRecipientsPromises = goldMessageRecipientsCollection.docs.map((doc) => {
                            return usersRef.doc(doc.id).get()
                        })

                        const sentTimes = { }
                        goldMessageRecipientsCollection.docs.forEach((doc) => {
                            const { lastSent } = doc.data()

                            sentTimes[doc.id] = lastSent
                        })
                        
                        const goldMessageRecipients = await Promise.all(goldMessageRecipientsPromises)
                        const recipients = goldMessageRecipients.map((goldMessageRecipient) => {
                            const goldMessageRecipientData = goldMessageRecipient.data()
                            const { profile, ...other } = goldMessageRecipientData || { profile: { } }
                            
                            return {...profile, ...other, phoneNumber: goldMessageRecipient.id, lastSent: sentTimes[goldMessageRecipient.id] }
                        })

                        const recipientsSorted = recipients.sort(function({ lastSent: lastSentRecipientA }, { lastSent: lastSentRecipientB }){
                            
                            if(!lastSentRecipientA && !lastSentRecipientB) {
                                return 0
                            }
                            
                            if(!lastSentRecipientA) {
                                return 1
                            }
                            
                            if(!lastSentRecipientB) {
                                return -1
                            }

                            return lastSentRecipientB.seconds - lastSentRecipientA.seconds;
                        })

                        return resolve({ goldMessage: goldMessageText  || goldMessage.id, lastRecipient, lastSent, recipients: recipientsSorted })
                    } catch (e) {
                        console.log('e', e)
                    }
                    return resolve({ goldMessage: goldMessageText || goldMessage.id, recipients: [] })
                })
            })
            
            const goldMessages = await Promise.all(goldMessagesPromises)
            
            dispatch({ type: SENT_GOLD_MESSAGES_RECEIVED, payload: goldMessages })
            
        }catch(e) {
            dispatch(errorReceived(SENT_GOLD_MESSAGES_ERROR, e))
        }
    }
}