import express from 'express';

import auth from './api/auth';
import search from './api/search';
import user from './api/user';
import rsvp from './api/rsvp';


let app = express();

app.use(express.static('public'));

app.use(auth);
search(app);
user(app);
rsvp(app);

app.listen(process.env.PORT || 80, process.env.IP, () => {
    console.log('Listening');
});