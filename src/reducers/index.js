import {combineReducers} from 'redux';

import useReducer  from './useReducer'
import articleReducer from './articleReducer';

const rootReducer = combineReducers({
    userState: useReducer,
    articleState: articleReducer,
})
export default rootReducer;