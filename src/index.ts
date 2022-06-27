import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import { dataLayerReducer } from './data-layer-reducer';
import { createEventPublisher } from './event-publisher';

type GDL = ReturnType<typeof createGdl>;

declare global {
    export interface Window {
        gdl: GDL
    }
}

const createGdl = () => {
    const reducer = combineReducers({
        dataLayer: dataLayerReducer
    });

    const store = configureStore({
        reducer
    });
    
    return {
        publishEvent: createEventPublisher(store.dispatch),
        get dataLayer() {
            return store.getState().dataLayer;
        },
    };
};

window.gdl = createGdl();
