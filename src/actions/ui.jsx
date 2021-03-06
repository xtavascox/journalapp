import { types } from "../types/types";

export const setError = (msgErr) => {

    return {
        type: types.uiSetError,
        payload: msgErr
    }
}

export const removeError=()=>{
    return{
        type:types.uiRemoveError
    }
}

export const startLoading=()=>{
    return {
        type:types.uiStartLoading,
    }
}

export const finishLoading =()=>{
    return{
        type:types.uiFinishLoading
    }
}