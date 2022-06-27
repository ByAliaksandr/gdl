import { AnalyticsAction } from './action.interface';

export interface PageInfo extends AnalyticsAction {
  pageId: string | undefined;
  countryCode: string | undefined;
  languageCode: string | undefined;
  pageName: string | undefined;
}
