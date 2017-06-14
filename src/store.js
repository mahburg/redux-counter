import {createStore} from 'redux';
import counterReducer from './ducks/counter';

export default createStore( counterReducer );