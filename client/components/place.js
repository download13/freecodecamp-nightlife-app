/** @jsx element */
import element from 'virtual-element';


export default {
    render({props}) {
        let {
            place,
            loggedIn,
            onToggleGoing
        } = props;
        
        let {
            name,
            snippet_text,
            image_url,
            url,
            going
        } = place;
        
        let rsvpClass = 'rsvp-button';
        let rsvpText;
        if(loggedIn) {
            rsvpText = 'I\'m going!';
            
            if(going) {
                rsvpText = 'I\'m going!';
                rsvpClass += ' going';
            }
        } else {
            rsvpText = 'Login to RSVP';
        }
        
        return <div class="place">
            <a href={url} rel="nofollow" target="_blank" class="place__title"><h2>{name}</h2></a>
            <img class="place__image" src={image_url} />
            <span class="place__snippet">{snippet_text}</span>
            <button class={rsvpClass} onClick={onToggleGoing}>{rsvpText}</button>
        </div>;
    }
};