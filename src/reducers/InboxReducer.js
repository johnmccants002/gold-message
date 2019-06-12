import {
    CLEAR_ERROR,
    REFRESHING_INBOX,
    INBOX_REFRESHED,
    REFRESHING_INBOX_ERROR,
} from '../actions/types';
  
  const INITIAL_STATE = {
      loading: false,
      items: [],
      error: undefined,
  };
  
  export default (state = INITIAL_STATE, action) => {
    const { type, payload } = action

    switch (type) {
      case CLEAR_ERROR:
        return { ...state, error : undefined }
      case REFRESHING_INBOX:
        return { ...state, error : undefined, loading: true}
      case INBOX_REFRESHED:
        return { ...state, items: payload, error : undefined, loading: false }
      case REFRESHING_INBOX_ERROR:
        return { ...state, error : payload, loading: false }
      default:
        return state;
    }
  };
  
  