import {compose, applyMiddleware, createStore} from 'redux';
import thunk from 'redux-thunk';
import persistState from 'redux-localstorage';

import reducer from './reducer';


const createStoreWithMiddleware = compose(
    applyMiddleware(thunk),
    persistState(null, {
        key: 'auth_token',
        slicer() {
            return state => {
                return state.auth.token;
            };
        },
        serialize: a => a || '',
        deserialize: a => a || null,
        merge(initialState = {auth: {}}, persistedState) {
            initialState.auth.token = persistedState;
            return initialState;
        }
    })
)(createStore);

export default () => createStoreWithMiddleware(reducer);
