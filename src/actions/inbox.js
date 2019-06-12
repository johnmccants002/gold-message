import firebase from 'react-native-firebase'
import { REFRESHING_INBOX, INBOX_REFRESHED, REFRESHING_INBOX_ERROR, SELECTED_USER_GOLD_MESSAGES, SELECTED_USER, SELECTED_USER_GOLD_MESSAGES_LOADING } from './types';
import { errorReceived } from './errors';

const usersRef = firebase.firestore().collection('users');



export const refreshInbox = () => {
    return async(dispatch, getStore) => {
        const { profile } = getStore()
        const { user } = profile
        const { phoneNumber } = user

        console.log('phoneNumber', phoneNumber)
        
        dispatch({ type: REFRESHING_INBOX })
        try {

            const inboxCollection = await usersRef.doc(phoneNumber).collection('inbox').get()
            const inboxProfilePromises = inboxCollection.docs.map((doc) => {
                return usersRef.doc(doc.id).get()
            })
            const inboxProfileDocuments = await Promise.all(inboxProfilePromises)
            
            const inbox = []
            const inboxCount = inboxCollection.docs.length
            for(let i = 0; i < inboxCount; i++) {
                inbox.push({...inboxProfileDocuments[i].data().profile, ...inboxCollection.docs[i].data(), phoneNumber: inboxCollection.docs[i].id })
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
            const goldMessages = goldMessagesSnapshot.docs.map((doc) => { 
                    return { goldMessage: doc.id, ...doc.data() } 
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
