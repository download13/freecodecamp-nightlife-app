/** @jsx element */
import element from 'virtual-element';
import {connect} from 'deku-redux';
import {bindActionCreators} from 'redux';

import * as actions from '../store/actions';
import * as selectors from '../store/selectors';

import LoginBar from '../components/loginbar';
import SearchBar from '../components/searchbar';
import Place from '../components/place';


const App = {
    render({props}) {
        let {
            user,
            places,
            rsvp,
            logout,
            searchByLoc,
            searchByGeoLookup
        } = props;
        
        return <div>
            <LoginBar user={user} onLogout={logout} />
            <main class="app-main">
                <header>
                    <h1 class="site-title">Where is everyone?!</h1>
                </header>
                <SearchBar onLocSearch={searchByLoc} onGeoSearch={searchByGeoLookup} />
                <div>
                    {places ? places.map(place => {
                        return <Place place={place} loggedIn={!!user} onToggleGoing={() => {
                            rsvp(place.id, !place.going);
                        }} />;
                    }) : null}
                </div>
            </main>
        </div>;
    }
}

export default connect(
    state => {
        return {
            user: selectors.user(state),
            places: selectors.placesWithGoing(state)
        };
    },
    dispatch => {
        return bindActionCreators({
            rsvp: actions.rsvp,
            logout: actions.logout,
            searchByLoc: actions.searchByLoc,
            searchByGeoLookup: actions.searchByGeoLookup
        }, dispatch);
    }
)(App);