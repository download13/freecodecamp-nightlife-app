/** @jsx element */
import element from 'virtual-element';
import {render, tree} from 'deku';
import {storePlugin} from 'deku-redux';

import createStore from './store';

import {App} from './containers';

import {initialize} from './store/actions';


function createApp() {
    const store = createStore();
    
    store.dispatch(initialize());
    
    return tree().use(storePlugin(store)).mount(<App />);
}

render(createApp(), document.getElementById('approot'));