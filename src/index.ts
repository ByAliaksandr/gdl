import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import { createEventPublisher } from './events/event-publisher';
import pageInfoSliceReducer from './data-layer/page-info-slice';

type GDL = ReturnType<typeof createGdl>;

declare global {
  export interface Window {
    gdl: GDL;
  }
}

const createGdl = () => {
  const reducer = combineReducers({
    dataLayer: combineReducers({
      page: pageInfoSliceReducer,
    }),
  });

  const store = configureStore({
    reducer,
  });

  return {
    publishEvent: createEventPublisher(store.dispatch),
    get dataLayer() {
      return store.getState().dataLayer;
    },
  };
};

window.gdl = createGdl();
