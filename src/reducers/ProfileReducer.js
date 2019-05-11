import { 
    USER_AUTHENTICATED,
} from '../actions/types';
  
  const INITIAL_STATE = {
      user: undefined
  };
  
  export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
      case USER_AUTHENTICATED:
        return { ...state, user : action.payload }
      default:
        return state;
    }
  };
  
  