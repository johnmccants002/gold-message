import firebase from 'react-native-firebase'

import { COMPOSE_MESSAGE_TEXT } from './types';


export const composeMessageText = (messageText) => {
    return { type: COMPOSE_MESSAGE_TEXT, payload: messageText }
}