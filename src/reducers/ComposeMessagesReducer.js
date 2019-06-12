import { 
    COMPOSE_MESSAGE_TEXT, GOLD_MESSAGE_SENT, GOLD_MESSAGE_SENT_FAILED, RESET_COMPOSE_MESSAGE, CLEAR_ERROR, GOLD_MESSAGE_SENDING, UPDATE_PHONE_NUMBER,
} from '../actions/types';
  
  const INITIAL_STATE = {
      messageText: '',
      messageSent: false,
      messageError: undefined,
      loading: false,
      phoneNumber: '',
  };
  
  export default (state = INITIAL_STATE, action) => {
    const { type, payload } = action

    switch (type) {
      case GOLD_MESSAGE_SENDING:
        return { ...state, loading : true }
      case CLEAR_ERROR:
        return { ...state, messageError : undefined }
      case GOLD_MESSAGE_SENT:
        return { ...state, messageSent : true, messageError : undefined, loading: false }
      case GOLD_MESSAGE_SENT_FAILED:
        return { ...state, messageSent : false, messageError: payload, loading: false }
      case COMPOSE_MESSAGE_TEXT:
        return { ...state, messageText : payload }
      case UPDATE_PHONE_NUMBER:
        return { ...state, phoneNumber: payload }
      case RESET_COMPOSE_MESSAGE:
        return {...INITIAL_STATE }
      default:
        return state;
    }
  };
  
  