import { CLEAR_ERROR } from "./types";

export const errorReceived = (type, error) => {
    return async(dispatch) => {
        if(error.message) {
            dispatch({ type, payload: error.message }) 
        } else  if(typeof(error) === 'string'){
            dispatch({ type, payload: error })
        } else {
            dispatch({ type, payload: `An unknown error has occurred, please try again` })
        }
    }
}

export const clearError = () => {
    return {
        type: CLEAR_ERROR
    }
}