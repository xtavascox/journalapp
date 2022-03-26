import { types } from "../types/types";

const initialState = {
    notes: [],
    active: null
}
export const noteReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.notesActive:
            return {
                ...state,
                active: { ...action.payload }
            }
        case types.notesAddNew:
            return {
                ...state, 
                notes: [...state.notes,action.payload]
            }
        case types.notesLoad:
            return {
                ...state,
                notes: [...action.payload]
            }
        case types.notesUpdate:
            return {
                ...state,
                notes: state.notes.map(note => note.id === action.payload.id
                    ? action.payload.note
                    : note)
            }
        case types.notesDelete:
            console.log('deleting');
            return {
                ...state,
                active: null,
                notes: state.notes.filter(note => note.id !== action.payload.current)
            }
        case types.notesLogoutCleaning:
            return initialState
        default:
            return state;
    }
}