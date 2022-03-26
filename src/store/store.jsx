import {createStore,combineReducers,compose,applyMiddleware} from 'redux'
import thunk from 'redux-thunk';

import {authReducer} from '../reducers/authReducer'
import { uiReducer } from '../reducers/uiReducers';
import { noteReducer } from '../reducers/notesReducer';
const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const reducers=combineReducers({
    auth: authReducer,
    UI:uiReducer,
    notes:noteReducer
})


export const store= createStore(reducers,composeEnhancers(applyMiddleware(thunk)));
