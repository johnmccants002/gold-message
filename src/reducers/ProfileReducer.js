import { 
    USER_AUTHENTICATED,
    PHONE_VERIFICATION_RECEIVED,
    PHONE_VERIFIED,
    LOADING,
    USER_AUTHENTICATION_ERROR,
} from '../actions/types';
  
  const INITIAL_STATE = {
      loading: false,
      user: undefined,
      verification: undefined,
      phoneVerified: false,
      displayName: '',
      error: undefined,
  };
  
  export default (state = INITIAL_STATE, action) => {
    const { type, payload } = action
    switch (type) {
      case USER_AUTHENTICATED:
        return { ...state, user : payload, displayName: payload && payload.displayName ? payload.displayName : '', loading: false, error: undefined}
      case USER_AUTHENTICATION_ERROR:
        return { ...state, error : payload }
      case PHONE_VERIFICATION_RECEIVED:
        return { ...state, verification : payload, loading: false, error: undefined }
      case PHONE_VERIFIED:
        return { ...state, phoneVerified : payload, loading: false, error: undefined }
      case LOADING:
        return { ...state, loading : payload }
      default:
        return state;
    }
  };
  
  