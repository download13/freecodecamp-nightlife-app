import {combineReducers} from 'redux';


export default combineReducers({
    auth(state = {}, action) {
        switch(action.type) {
        case 'SET_TOKEN':
            return {
                ...state,
                token: action.token
            };
        default:
            return state;
        }
    },
    search(state = {results: [], pending: false}, action) {
        if(!action) {
            throw new Error('action blank');
        }
        
        switch(action.type) {
        case 'SET_SEARCH_RESULTS':
            return {
                ...state,
                results: action.results,
                pending: false
            };
        case 'SET_SEARCH_PENDING':
            return {
                ...state,
                pending: true
            };
        default:
            return state;
        }
    },
    places(state = [], action) {
        switch(action.type) {
        case 'SET_PLACES':
            return action.places;
        case 'SET_PLACE':
            return state.map(place => {
                if(place.id === action.place.id) {
                    return action.place;
                }
                
                return place;
            });
        default:
            return state;
        }
    },
    goingTo(state = [], action) {
        switch(action.type) {
        case 'SET_GOING_TO':
            return action.goingTo;
        default:
            return state;
        }
    }
});