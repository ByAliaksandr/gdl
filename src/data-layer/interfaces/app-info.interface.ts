import { GeneralError } from '../../events/interfaces/general-error.interface';
import { LocationArea } from '../../events/interfaces/location-area.interface';
import { Rate } from '../../events/interfaces/rate.interface';
import { AnalyticsAction } from './action.interface';

export interface AppInfo extends AnalyticsAction {
  stepName: string | undefined;
  stepNumber: number | undefined;
  origin: LocationArea | undefined;
  destination: LocationArea | undefined;
  packageCount: number | undefined;
  rate: Rate | undefined;
  errors: GeneralError[];
}
