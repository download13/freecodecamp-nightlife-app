/** @jsx element */
import element from 'virtual-element';
import {connect} from 'deku-redux';
import {bindActionCreators} from 'redux';

import * as actions from '../store/actions';


const SearchBar = {
    render({props}) {
        let {
            onLocSearch,
            onGeoSearch
        } = props;
        
        return <div class="search">
            <button class="geo-search-btn" onClick={onGeoSearch}>
                <img src="/images/location_32.png" />
            </button>
            <input class="search-in" type="search" placeholder="Where are you? (e.g. 93021)" onKeyUp={e => {
                if(e.keyCode !== 13) return;
                e.preventDefault();
                onLocSearch(e.target.value);
            }} />
        </div>;
    }
}

export default SearchBar;