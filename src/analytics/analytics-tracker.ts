import { Store } from '@reduxjs/toolkit';
import { DataLayer } from '../data-layer/interfaces/data-layer.interface';

export class AnalyticsTracker {
  //private analyticsAction = '';

  constructor(private store: Store<{ dataLayer: DataLayer }>) {}

  trackPageInfoChanges() {
    // let prevAnalyticsAction = this.analyticsAction;
    // this.analyticsAction = this.store

    // if ()

    console.log(this.store);
  }

  trackAppInfoChanges() {
    // let prevAnalyticsAction = this.analyticsAction;
    // this.analyticsAction = this.store

    // if ()

    console.log(this.store);
  }
}
