import firebase from 'react-native-firebase'

import { USER_AUTHENTICATED, USER_AUTHENTICATION_ERROR, PHONE_VERIFICATION_RECEIVED, PHONE_VERIFIED, LOADING, LOGOUT, LOAD_USER_PROFILE, LOAD_USER_PROFILE_COMPLETE, LOAD_USER_PROFILE_ERROR, SELECTED_SENT_GOLD_MESSAGE } from './types';
import { errorReceived } from './errors';
import { ImageCacheManager } from 'react-native-cached-image';

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
            dispatch({ type: PHONE_VERIFIED, payload: true })
        }catch(e) {
            dispatch(errorReceived(USER_AUTHENTICATION_ERROR, e))
        }
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
            await firebase.firestore().collection('users').doc(user.phoneNumber).set({
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
    }
}

export const saveCurrentUserProfile = (email, firstName, lastName, about, photoURL) => {
    return async(dispatch, getStore) => {
        const { profile } = getStore()
        const { user, photoURL: currentPhotoUrl } = profile
        
        try {
            dispatch({ type: LOADING, payload: true })

            let updatePhotoUrl = photoURL
            if(photoURL && currentPhotoUrl != photoURL) {
              const profileImageRef = await firebase.storage().ref(user.phoneNumber).child('profileImage').putFile(photoURL)
              updatePhotoUrl = await profileImageRef.downloadURL
            }
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

export const authenticatedUser = (user) => {
    return { type: USER_AUTHENTICATED, payload: user }
}
export const logout = () => {
    return async(dispatch) => {
        await firebase.auth().signOut()
        dispatch({ type: LOGOUT })
    }
}
