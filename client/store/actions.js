import fetch from 'isomorphic-fetch';
import qs from 'querystring';

import * as selectors from './selectors';


export function initialize() {
    return (dispatch, getState) => {
        dispatch(loadGoingTo());
        
        window.addEventListener('storage', e => {
            if(e.key === 'auth_token' && e.storageArea === localStorage) {
                dispatch(setAuthToken(e.newValue));
            }
        });
    };
}

export function login() {
    return () => {
        window.open('/login', 'login_window');
    };
}

export function logout() {
    return (dispatch) => {
        // This will not automatically fire a storage event in the same window
        // Only on other windows/tabs
        localStorage.removeItem('auth_token');
        
        // Just pretend the event fired and null out the token in the store
        dispatch(setAuthToken(null));
    };
}

export function rsvp(placeId, going = false) {
    return (dispatch, getState) => {
        let user = selectors.user(getState());
        
        if(user) { // Just send the RSVP
            authFetch(getState, '/api/rsvp', {
                method: 'POST',
                body: JSON.stringify({placeId, going}),
                headers: {'Content-Type': 'application/json'}
            })
            .then(res => res.json())
            .then(goingTo => {
                dispatch(setGoingTo(goingTo));
            });
        } else { // We aren't logged in, can't RSVP yet
            dispatch(login());
        }
    };
}

export function loadGoingTo() {
    return (dispatch, getState) => {
        authFetch(getState, '/api/user/places')
        .then(res => res.json())
        .then(goingTo => {
            dispatch(setGoingTo(goingTo));
        });
    };
}

export function searchByGeoLookup() {
    return (dispatch, getState) => {
        navigator.geolocation.getCurrentPosition(({coords}) => {
            let {latitude, longitude} = coords;
            
            dispatch(searchFetch({ll: `${latitude},${longitude}`}));
        }, err => {
            console.log('Couldn\'t get location:', err);
        });
    };
}

export function searchByLoc(loc) {
    return searchFetch({loc});
}

function searchFetch(query) {
    return (dispatch, getState) => {
        fetch('/api/search?' + qs.stringify(query))
        .then(res => res.json())
        .then(places => {
            dispatch(setPlaces(places));
        }, err => {
            console.log('search err');
            console.error(err);
        });
    };
}


function setPlaces(places) {
    return {type: 'SET_PLACES', places};
}

function setGoingTo(goingTo) {
    return {type: 'SET_GOING_TO', goingTo};
}

export function setAuthToken(token) {
    return {type: 'SET_TOKEN', token};
}


function authFetch(getState, input, init = {}) {
    return fetch(input, {
        ...init,
        headers: {
            ...init.headers,
            Authorization: getState().auth.token
        }
    });
}