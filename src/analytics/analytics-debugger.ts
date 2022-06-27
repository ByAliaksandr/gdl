import { Store } from '@reduxjs/toolkit';
import { DataLayer } from '../data-layer/interfaces/data-layer.interface';

export class AnalyticsDebbuger {
  private pageInfoAnalyticsActionId;
  private appInfoAnalyticsActionId;

  constructor(private store: Store<{ dataLayer: DataLayer }>) {
    const dataLayer = this.store.getState().dataLayer;

    this.pageInfoAnalyticsActionId = dataLayer.page._analyticsActionId;
    this.appInfoAnalyticsActionId = dataLayer.app._analyticsActionId;
  }

  debbug() {
    const dataLayer = this.store.getState().dataLayer;
    const pageInfo = dataLayer.page;
    const appInfo = dataLayer.app;

    let prevPageInfo = this.pageInfoAnalyticsActionId;
    this.pageInfoAnalyticsActionId = pageInfo._analyticsActionId;

    let prevAppInfo = this.appInfoAnalyticsActionId;
    this.appInfoAnalyticsActionId = appInfo._analyticsActionId;

    if (prevPageInfo !== this.pageInfoAnalyticsActionId) {
      console.log('Analytics Debbuger: ', pageInfo._analyticsActionName);
    }

    if (prevAppInfo !== this.appInfoAnalyticsActionId) {
      console.log('Analytics Debbuger: ', appInfo._analyticsActionName);
    }
  }
}
