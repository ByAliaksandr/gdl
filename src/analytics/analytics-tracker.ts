import { Store } from '@reduxjs/toolkit';
import { AppInfo } from '../data-layer/interfaces/app-info.interface';
import { DataLayer } from '../data-layer/interfaces/data-layer.interface';
import { PageInfo } from '../data-layer/interfaces/page-info.interface';
import { Events } from '../events/interfaces/events.enum';
import { GeneralError } from '../events/interfaces/general-error.interface';
import { LocationArea } from '../events/interfaces/location-area.interface';

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

  private pageInfoAnalyticsActionId: string;
  private appInfoAnalyticsActionId: string;

  constructor(private store: Store<{ dataLayer: DataLayer }>) {
    const dataLayer = this.store.getState().dataLayer;

    this.pageInfoAnalyticsActionId = dataLayer.page._analyticsActionId;
    this.appInfoAnalyticsActionId = dataLayer.app._analyticsActionId;
  }

  trackPageInfoChanges() {
    const pageInfo = this.store.getState().dataLayer.page;

    let prev = this.pageInfoAnalyticsActionId;
    this.pageInfoAnalyticsActionId = pageInfo._analyticsActionId;
    let analyticsActionName = pageInfo._analyticsActionName;

    if (prev !== this.pageInfoAnalyticsActionId && analyticsActionName === AnalyticsTracker.PAGE_EVENT) {
      window.analytics.trackPage(pageInfo.pageName, this.getPageInfoDimention(pageInfo));
    }
  }

  trackAppInfoChanges() {
    const dataLayer = this.store.getState().dataLayer;
    const pageInfo = dataLayer.page;
    const appInfo = dataLayer.app;

    let prev = this.appInfoAnalyticsActionId;
    this.appInfoAnalyticsActionId = appInfo._analyticsActionId;
    let analyticsActionName = appInfo._analyticsActionName;

    if (
      prev !== this.appInfoAnalyticsActionId &&
      (AnalyticsTracker.CONVERSION_EVENT === analyticsActionName || AnalyticsTracker.EVENTS.includes(analyticsActionName as Events))
    ) {
      const dimention = {
        ...this.getPageInfoDimention(pageInfo),
        ...this.getAppInfoDimention(appInfo),
      };

      if (AnalyticsTracker.CONVERSION_EVENT === analyticsActionName) {
        window.analytics.trackConversion(appInfo.rate?.amount, {
          dimention,
        });
      } else {
        window.analytics.trackEvent(analyticsActionName, {
          dimention,
        });
      }
    }
  }

  private getPageInfoDimention(pageInfo: PageInfo): {
    dimension01: string | undefined;
    dimension02: string | undefined;
    dimension03: string | undefined;
  } {
    return {
      dimension01: pageInfo.pageId,
      dimension02: pageInfo.countryCode,
      dimension03: pageInfo.languageCode,
    };
  }

  private getAppInfoDimention(appInfo: AppInfo): {
    dimension04: string | undefined;
    dimension05: number | undefined;
    dimension06: string | undefined;
    dimension07: string | undefined;
    dimension08: number | undefined;
    dimension09: string | undefined;
    dimension10: string | undefined;
  } {
    return {
      dimension04: appInfo.stepName,
      dimension05: appInfo.stepNumber,
      dimension06: this.getLocationAreaDimention(appInfo.origin),
      dimension07: this.getLocationAreaDimention(appInfo.destination),
      dimension08: appInfo.packageCount,
      dimension09: appInfo.rate?.currency,
      dimension10: this.getErrorsDimention(appInfo.errors),
    };
  }

  private getLocationAreaDimention(locationArea: LocationArea | undefined): string | undefined {
    if (!locationArea) {
      return;
    }

    return `<${locationArea.country}>_<${locationArea.city}>`;
  }

  private getErrorsDimention(errors: GeneralError[]): string | undefined {
    if (!errors || errors.length === 0) {
      return;
    }
    return errors.reduce((prev, curr, index) => {
      if (index === 0) {
        return `<${curr.id}>_<${curr.message}>`;
      }
      return `${prev},<${curr.id}>_<${curr.message}>`;
    }, '');
  }
}
