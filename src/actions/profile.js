import firebase from 'react-native-firebase'

import { USER_AUTHENTICATED, USER_AUTHENTICATION_ERROR, PHONE_VERIFICATION_RECEIVED, PHONE_VERIFIED, LOADING } from './types';
import { errorReceived } from './errors';

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

export const authenticatedUser = (user) => {
    return { type: USER_AUTHENTICATED, payload: user }
}
