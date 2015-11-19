import bodyParser from 'body-parser';

import {rsvpToPlace, getUserPlaces} from '../db';
import {authMw} from './auth';


export default app => {
    app.post('/api/rsvp', authMw, bodyParser.json(), (req, res) => {
        let {
            placeId,
            going
        } = req.body;
        
        rsvpToPlace(req.user.id, placeId, going)
        .then(() => getUserPlaces(req.user.id))
        .then(places => res.json(places));
    });
};
