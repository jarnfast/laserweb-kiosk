import { combineReducers } from 'redux';
import lwReducer from './lwReducer';

const reducers = combineReducers({
    lwState: lwReducer
});

export default reducers;
export type RootState = ReturnType<typeof reducers>;