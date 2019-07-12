import { 
    COMPOSE_MESSAGE_TEXT, GOLD_MESSAGE_SENT, GOLD_MESSAGE_SENT_FAILED, RESET_COMPOSE_MESSAGE, CLEAR_ERROR, GOLD_MESSAGE_SENDING, UPDATE_PHONE_NUMBER, MULTIPLE_GOLD_MESSAGES, MULTIPLE_GOLD_MESSAGES_CLEARED,
} from '../actions/types';
  
  const INITIAL_STATE = {
      composeGoldMessages: [],
      messageSent: false,
      messageError: undefined,
      loading: false,
      phoneNumber: '',
  };
  
  export default (state = INITIAL_STATE, action) => {
    const { type, payload } = action

    switch (type) {
      case GOLD_MESSAGE_SENDING:
        return { ...state, loading : true, messageSent : false, messageError: undefined }
      case CLEAR_ERROR:
        return { ...state, messageError : undefined }
      case GOLD_MESSAGE_SENT:
        return { ...state, messageSent : true, messageError : undefined, loading: false, goldMessages: [] }
      case GOLD_MESSAGE_SENT_FAILED:
        return { ...state, messageError: payload, loading: false }
      case COMPOSE_MESSAGE_TEXT:
        return { ...state, composeGoldMessages : [payload] }
      case UPDATE_PHONE_NUMBER:
        return { ...state, phoneNumber: payload }
      case MULTIPLE_GOLD_MESSAGES:
        return { ...state, composeGoldMessages: payload }
      case MULTIPLE_GOLD_MESSAGES_CLEARED:
        return { ...state, composeGoldMessages: [] }
      case RESET_COMPOSE_MESSAGE:
        return {...INITIAL_STATE }
      default:
        return state;
    }
  };
  
  