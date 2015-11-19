import mongoose from 'mongoose';
import uuid from 'uuidv4';


const {Schema} = mongoose;


mongoose.connect('mongodb://localhost/nightlife');


const userSchema = new Schema({
    id: String,
    email: String
});

userSchema.index({id: 1}, {unique: true});
userSchema.index({email: 1}, {unique: true});

const rsvpSchema = new Schema({
    userId: String,
    placeId: String
});

rsvpSchema.index({userId: 1, placeId: 1}, {unique: true});


const User = mongoose.model('User', userSchema);

const Rsvp = mongoose.model('Rsvp', rsvpSchema);


export function getOrCreateUser(email) {
    return User.findOne({email}).exec()
    .then(user => {
        if(user) return user;
        
        return User.create({
            id: uuid(),
            email
        });
    }, err => {
        console.log('getOrCreateUser err', err)
        throw err;
    });
}

export function getUserPlaces(userId) {
    return Rsvp.find({userId}, {placeId: true}).exec()
    .then(rsvps => {
        return rsvps.map(rsvp => rsvp.placeId);
    });
}

export function rsvpToPlace(userId, placeId, going) {
    if(going) { // Ensure there is an rsvp record for this
        return Rsvp.create({userId, placeId})
        .then(null, err => {
            if(err.code === 11000 || err.code === 11001) {
                return null;
            }
            
            throw err;
        });
    } else { // Ensure there is not
        return Rsvp.remove({userId, placeId});
    }
}
