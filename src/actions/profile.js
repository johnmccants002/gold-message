import firebase from 'react-native-firebase'

import { USER_AUTHENTICATED, USER_AUTHENTICATION_ERROR, PHONE_VERIFICATION_RECEIVED, PHONE_VERIFIED } from './types';

export const phoneAuthentication = (phoneNumber) => {
    return async(dispatch) => {
        try {
            const confirmationResult = await firebase.auth().signInWithPhoneNumber(phoneNumber)
            
            dispatch({ type: PHONE_VERIFICATION_RECEIVED, payload: confirmationResult })
        }catch(e) {
            dispatch(errorReceived(e))
        }
    }
}

export const verifyPhoneNumber = (verificationCode) => {
    return async(dispatch, getStore) => {
        try {
            const { profile } = getStore()
            const { verification } = profile

            await verification.confirm(verificationCode)
            dispatch({ type: PHONE_VERIFIED, payload: true })
        }catch(e) {
            dispatch(errorReceived(e))
        }
    }
}

export const anonAuthentication = () => {
    return async(dispatch) => {
        try {
            const credential = await firebase.auth().signInAnonymously()
            dispatch({ type: USER_AUTHENTICATED, payload: credential.user })
        }catch(e) {
            dispatch(errorReceived(e))
        }
    }
}

export const completeSignIn = (email, firstName, lastName) => {
    return async(dispatch, getStore) => {
        const { profile } = getStore()
        const { user } = profile

        try {
            await user.updateEmail(email)
            await user.updateProfile({ displayName: `${firstName} ${lastName}`})
            
            user.sendEmailVerification()
            
            dispatch({ type: USER_AUTHENTICATED, payload: firebase.auth().currentUser })
        } catch(e) {
            dispatch(errorReceived(e))
        }
    }
}

export const authenticatedUser = (user) => {
    return { type: USER_AUTHENTICATED, payload: user }
}

const errorReceived = (error) => {
    return async(dispatch) => {
        if(error.message) {
            dispatch({ type: USER_AUTHENTICATION_ERROR, payload: error.message }) 
        } else {
            console.log(`Exception received`, error)
            dispatch({ type: USER_AUTHENTICATION_ERROR, payload: `An unknown error has occurred` })
        }
    }
}