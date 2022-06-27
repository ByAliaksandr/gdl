import { Store } from '@reduxjs/toolkit';
import { DataLayer } from '../data-layer/interfaces/data-layer.interface';
import { Events } from '../events/interfaces/events.enum';

declare global {
  interface Window {
    analytics: {
      trackPage: (pageName: string | undefined, dimensions: any) => void;
      trackEvent: (eventName: string, dimensions: any) => void;
      trackConversion: (revenue: number | undefined, dimensions: any) => void;
    };
  }
}
export class AnalyticsTracker {
  private static readonly PAGE_EVENT = Events.PAGE_INFO;
  private static readonly EVENTS = [Events.ORIGIN_COMPLETE, Events.DESTINATION_COMPLETE, Events.PACKAGES_COMPLETE, Events.SHIP_AGAIN];
  private static readonly CONVERSION_EVENT = Events.PACKAGES_COMPLETE;

  private pageInfoAnalyticsActionId = '';
  private appInfoAnalyticsActionId = '';

  constructor(private store: Store<{ dataLayer: DataLayer }>) {}

  trackPageInfoChanges() {
    const pageInfo = this.store.getState().dataLayer.page;

    let prev = this.pageInfoAnalyticsActionId;
    this.pageInfoAnalyticsActionId = pageInfo._analyticsActionId;
    let analyticsActionName = pageInfo._analyticsActionName;

    if (prev !== this.pageInfoAnalyticsActionId && analyticsActionName === AnalyticsTracker.PAGE_EVENT) {
      window.analytics.trackPage(pageInfo.pageName, {
        dimension01: pageInfo.pageId,
        dimension02: pageInfo.countryCode,
        dimension03: pageInfo.languageCode,
      });
    }
  }

  trackAppInfoChanges() {
    const dataLayer = this.store.getState().dataLayer;
    const pageInfo = dataLayer.page;
    const appInfo = dataLayer.app;

    let prev = this.appInfoAnalyticsActionId;
    this.appInfoAnalyticsActionId = appInfo._analyticsActionId;
    let analyticsActionName = appInfo._analyticsActionName;

    if (prev !== this.appInfoAnalyticsActionId && AnalyticsTracker.EVENTS.includes(analyticsActionName as Events)) {
      window.analytics.trackEvent(analyticsActionName, {
        dimension01: pageInfo.pageId,
        dimension02: pageInfo.countryCode,
        dimension03: pageInfo.languageCode,
        dimension04: appInfo.stepName,
        dimension05: appInfo.stepNumber,
        dimension06: appInfo.origin?.country + '>_<' + appInfo.origin?.city,
        dimension07: appInfo.destination?.country + '>_<' + appInfo.destination?.city,
        dimension08: appInfo.packageCount,
        dimension09: appInfo.rate?.currency,
        //dimension10: appInfo.errors[0].id
      });
    } else if (prev !== this.appInfoAnalyticsActionId && analyticsActionName === AnalyticsTracker.CONVERSION_EVENT) {
      window.analytics.trackConversion(appInfo.rate?.amount, {
        dimension01: pageInfo.pageId,
        dimension02: pageInfo.countryCode,
        dimension03: pageInfo.languageCode,
        dimension04: appInfo.stepName,
        dimension05: appInfo.stepNumber,
        dimension06: appInfo.origin?.country + '>_<' + appInfo.origin?.city,
        dimension07: appInfo.destination?.country + '>_<' + appInfo.destination?.city,
        dimension08: appInfo.packageCount,
        dimension09: appInfo.rate?.currency,
        //dimension10: appInfo.errors[0].id
      });
    }
  }
}
