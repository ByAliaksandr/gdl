import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import { createEventPublisher } from './events/event-publisher';
import pageInfoSliceReducer from './data-layer/page-info-slice';
import appInfoSliceReducer from './data-layer/app-info-slice';
import { AnalyticsTracker } from './analytics/analytics-tracker';
import { AnalyticsDebbuger } from './analytics/analytics-debugger';

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
      app: appInfoSliceReducer,
    }),
  });

  const store = configureStore({
    reducer,
  });

  const analyticsTracker = new AnalyticsTracker(store);

  store.subscribe(() => {
    analyticsTracker.trackPageInfoChanges();
    analyticsTracker.trackAppInfoChanges();
  });

  const debbug = () => {
    const analyticsDebbuger = new AnalyticsDebbuger(store);

    store.subscribe(() => {
      analyticsDebbuger.debbug();
    });
  };

  return {
    publishEvent: createEventPublisher(store.dispatch),
    get dataLayer() {
      return store.getState().dataLayer;
    },
    debbug,
  };
};

window.gdl = createGdl();
