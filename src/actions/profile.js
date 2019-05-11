import firebase from 'react-native-firebase'
import { USER_AUTHENTICATED } from './types';

export const anonAuthentication = () => {
    return async(dispatch) => {
        try {
            const credential = await firebase.auth().signInAnonymously()
            dispatch({ type: USER_AUTHENTICATED, payload: credential.user })
        }catch(e) {
            console.log('e', e)
        }
    }
}