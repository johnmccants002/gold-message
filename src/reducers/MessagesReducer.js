import { 
    COMPOSE_MESSAGE_TEXT,
} from '../actions/types';
  
  const INITIAL_STATE = {
      messageText: '',
  };
  
  export default (state = INITIAL_STATE, action) => {
    const { type, payload } = action

    switch (type) {
      case COMPOSE_MESSAGE_TEXT:
        return { ...state, messageText : payload }
      default:
        return state;
    }
  };
  
  