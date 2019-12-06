import firebase from '@react-native-firebase/app'
import firestore from '@react-native-firebase/firestore'
import storage from '@react-native-firebase/storage'

import {
    Alert,
} from 'react-native';
import { USER_AUTHENTICATED, USER_AUTHENTICATION_ERROR, PHONE_VERIFICATION_RECEIVED, PHONE_VERIFIED, LOADING, LOGOUT, LOAD_USER_PROFILE, LOAD_USER_PROFILE_COMPLETE, LOAD_USER_PROFILE_ERROR, SELECTED_SENT_GOLD_MESSAGE, INBOX_SNAPSHOT_UNSUBSCRIBE } from './types';
import { errorReceived } from './errors';
import { AsYouType, parsePhoneNumberFromString } from 'libphonenumber-js'
import Contacts from 'react-native-contacts';

export const phoneAuthentication = (phoneNumber) => {
    return async(dispatch) => {
        try {
            dispatch({ type: LOADING, payload: true })
            const confirmationResult = await firebase.auth().signInWithPhoneNumber(phoneNumber)
            
            dispatch({ type: PHONE_VERIFICATION_RECEIVED, payload: confirmationResult })
        }catch(e) {
            dispatch(errorReceived(USER_AUTHENTICATION_ERROR, e))
        }
    }
}

export const verifyPhoneNumber = (verificationCode) => {
    return async(dispatch, getStore) => {
        try {
            const { profile } = getStore()
            const { verification } = profile
            dispatch({ type: LOADING, payload: true })

            await verification.confirm(verificationCode)
            dispatch(confirmEULA())
        }catch(e) {
            dispatch(errorReceived(USER_AUTHENTICATION_ERROR, e))
        }
    }
}

export const confirmEULA = () => {
    return async(dispatch) => {
        Alert.alert(
            'EULA',
            'By using this app you agree to our terms of service and privacy policy.\nWe have no tolerance for objectionable content or abusive users.\nYou will be banned for any inappropriate usage!',
            [
            { text : 'Continue', onPress : () => {
                    dispatch({ type: PHONE_VERIFIED, payload: true })
                }
            },
            { text : 'Cancel', onPress : async() => {
                dispatch(logout())
            }},
            ],
            { cancelable : false },
        )
    }
}

export const anonAuthentication = () => {
    return async(dispatch) => {
        try {
            const credential = await firebase.auth().signInAnonymously()
            
            dispatch({ type: LOADING, payload: false })
            dispatch({ type: USER_AUTHENTICATED, payload: credential.user })
        }catch(e) {
            dispatch(errorReceived(USER_AUTHENTICATION_ERROR, e))
        }
    }
}

export const completeSignIn = (email, firstName, lastName) => {
    return async(dispatch, getStore) => {
        const { profile } = getStore()
        const { user } = profile

        try {
            dispatch({ type: LOADING, payload: true })

            const updateEmailPromise = user.updateEmail(email)
            const updateProfilePromise = user.updateProfile({ displayName: `${firstName} ${lastName}`})
            
            await Promise.all([updateEmailPromise, updateProfilePromise])
            await firebase.firestore().collection('users').doc(firebase.auth().currentUser.phoneNumber).set({
                profile: {
                    displayName: firebase.auth().currentUser.displayName,
                    firstName,
                    lastName,
                    about: '',
                    email: firebase.auth().currentUser.email,
                    phoneNumber: firebase.auth().currentUser.phoneNumber,
                    photoURL: firebase.auth().currentUser.photoURL
                }
            })
            
            user.sendEmailVerification()

            
            dispatch({ type: LOADING, payload: false })
            dispatch({ type: USER_AUTHENTICATED, payload: firebase.auth().currentUser })
        } catch(e) {
            dispatch(errorReceived(USER_AUTHENTICATION_ERROR, e))
        }
    }
}

export const loadCurrentUserProfile = () => {
    return async(dispatch, getStore) => {
        const { profile } = getStore()
        const { user } = profile

        try {
            dispatch({ type: LOAD_USER_PROFILE, payload: true })

            const userDocument = await firebase.firestore().collection('users').doc(user.phoneNumber).get()
            const { profile } = userDocument.data()

            dispatch({ type: LOAD_USER_PROFILE_COMPLETE, payload: profile })
        } catch(e) {
            dispatch(errorReceived(LOAD_USER_PROFILE_ERROR, e))
        }
    }
}


export const selectedSentGoldMessage = (goldMessage) => {
    return async(dispatch) => {
        dispatch({ type: SELECTED_SENT_GOLD_MESSAGE, payload: goldMessage })
        const { mapped } = await getContacts()
        const { recipients } = goldMessage
        
        const contactPopulatedRecipients = recipients.map((recipient) => {
            const { displayName, phoneNumber } = recipient
            if(displayName || !mapped[phoneNumber]) {
                return recipient
            }

            return {...recipient, ...mapped[phoneNumber] }

        })     

        dispatch({ type: SELECTED_SENT_GOLD_MESSAGE, payload: {...goldMessage, recipients: contactPopulatedRecipients } })

        
    }
}

export const saveCurrentUserProfile = (email, firstName, lastName, about, photoURL) => {
    return async(dispatch, getStore) => {
        const { profile } = getStore()
        const { user, photoURL: currentPhotoUrl } = profile
        
        try {
            dispatch({ type: LOADING, payload: true })

            console.log('photoURL', photoURL, 'currentPhotoUrl', currentPhotoUrl)
            let updatePhotoUrl = photoURL
            try {
                if(photoURL && currentPhotoUrl != photoURL) {
                    const { metadata } = await firebase.storage().ref(user.phoneNumber).child('profileImage').putFile(photoURL)
                    const { fullPath } = metadata || { }
                    const profileImageRef = firebase.storage().ref(fullPath);
                    updatePhotoUrl = await profileImageRef.getDownloadURL()
                }
            } catch {}
            const profile = {
                displayName: `${firstName} ${lastName}`,
                email,
                firstName,
                lastName,
                about,
                photoURL: updatePhotoUrl
            }

            dispatch({ type: LOAD_USER_PROFILE_COMPLETE, payload: profile })
            
            const updateRootProfilePromise = user.updateProfile({ displayName: profile.displayName, photoURL: updatePhotoUrl })
            const updateProfilePromise = firebase.firestore().collection('users').doc(user.phoneNumber).set({
                profile
            })

            await Promise.all([updateProfilePromise, updateRootProfilePromise]) 
            
            dispatch({ type: LOADING, payload: false })
        } catch(e) {
            dispatch(errorReceived(USER_AUTHENTICATION_ERROR, e))
        }
    }
}

export const updateFCMToken = (token) => {
    return async(dispatch, getStore) => {
        const { profile } = getStore()
        const { user } = profile

        try {
            await firebase.firestore().collection('users').doc(user.phoneNumber).update({ token })
        }catch(e) {
            console.log(e)
        }
    }
}

export const storeInboxSnapshotUnsubscribe = (reference) => {
    return { type: INBOX_SNAPSHOT_UNSUBSCRIBE, payload: reference }
}

export const authenticatedUser = (user) => {
    return { type: USER_AUTHENTICATED, payload: user }
}

export const getContacts = () => {
    return new Promise((resolve, reject) => {
        Contacts.getAll((error, contacts) => {
            if(error) {
                return reject({error})
            }
            const mappedContacts = {}
            const asYouType = new AsYouType('US')
            for(let i = 0; i < contacts.length; i++) {
                const { phoneNumbers, givenName, familyName } = contacts[i]
                if(!phoneNumbers || phoneNumbers.length == 0) {
                    continue
                }
                for(let p = 0; p < phoneNumbers.length; p++) {
                    const { number: rawPhone } = phoneNumbers[p]
                    
                    asYouType.input(rawPhone)

                    const formattedPhone = asYouType.getNumber().number
                    mappedContacts[formattedPhone] = {
                        displayName: `${givenName || ''} ${familyName || ''}`.trim(),
                        phoneNumber: formattedPhone,
                        firstName: givenName,
                        lastName: familyName
                    }
                    asYouType.reset()
                }
            }

            return resolve({ contacts, mapped: mappedContacts })
        })
     })

}
export const logout = () => {
    return async(dispatch, getStore) => {
        const { profile } = getStore()
        const { inboxSnapshotUnsubscribe } = profile
        if(inboxSnapshotUnsubscribe) {
            inboxSnapshotUnsubscribe()
        }
        dispatch(storeInboxSnapshotUnsubscribe(undefined))
        await firebase.auth().signOut()
        dispatch({ type: LOGOUT })
    }
}
