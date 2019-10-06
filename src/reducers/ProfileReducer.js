import { 
    USER_AUTHENTICATED,
    PHONE_VERIFICATION_RECEIVED,
    PHONE_VERIFIED,
    LOADING,
    USER_AUTHENTICATION_ERROR,
    CLEAR_ERROR,
    LOAD_USER_PROFILE_COMPLETE,
    LOAD_USER_PROFILE_ERROR,
    LOAD_USER_PROFILE,
    SELECTED_SENT_GOLD_MESSAGE,
    INBOX_SNAPSHOT_UNSUBSCRIBE,
} from '../actions/types';
  
  const INITIAL_STATE = {
      loading: false,
      user: undefined,
      verification: undefined,
      phoneVerified: false,
      displayName: '',
      error: undefined,
      selectedGoldMessage: undefined,
      inboxSnapshotUnsubscribe: undefined,
  };
  
  export default (state = INITIAL_STATE, action) => {
    const { type, payload } = action
    switch (type) {
      case CLEAR_ERROR:
        return { ...state, error : undefined }
      case LOAD_USER_PROFILE_COMPLETE: 
        return { ...state, loading: false, error: undefined, ...payload}
      case USER_AUTHENTICATED:
        return { ...state, user : payload, displayName: payload && payload.displayName ? payload.displayName : '', photoURL: payload && payload.photoURL ? payload.photoURL : '', loading: false, error: undefined}
      case LOAD_USER_PROFILE_ERROR:
      case USER_AUTHENTICATION_ERROR:
        return { ...state, error : payload, loading: false }
      case PHONE_VERIFICATION_RECEIVED:
        return { ...state, verification : payload, loading: false, error: undefined }
      case PHONE_VERIFIED:
        return { ...state, phoneVerified : payload, loading: false, error: undefined }
      case LOAD_USER_PROFILE:
        return { ...state, loading : true }
      case LOADING:
        return { ...state, loading : payload }
      case SELECTED_SENT_GOLD_MESSAGE:
        return { ...state, selectedGoldMessage : payload }
      case INBOX_SNAPSHOT_UNSUBSCRIBE:
        return { ...state, inboxSnapshotUnsubscribe: payload }
      default:
        return state;
    }
  };
  
  