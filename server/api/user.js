import {getUserPlaces} from '../db';
import {authMw} from './auth';


export default app => {
    app.get('/api/user/places', authMw, (req, res) => {
        getUserPlaces(req.user.id).then(places => res.json(places));
    });
};