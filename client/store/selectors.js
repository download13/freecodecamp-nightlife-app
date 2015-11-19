import {createSelector} from 'reselect';


export const token = state => state.auth.token;

export const places = state => state.places;

export const goingTo = state => state.goingTo;


export const placesWithGoing = createSelector(
    places,
    goingTo,
    (places, goingTo) => {
        return places.map(place => {
            return {
                ...place,
                going: goingTo.indexOf(place.id) !== -1
            };
        });
    }
);

export const user = createSelector(
    token,
    token => {
        if(!token) return null;
        
        let payload = window.atob(token.split('.')[1]);
        
        try {
            return JSON.parse(payload);
        } catch(e) {
            return null;
        }
    }
);