import { GeneralError } from '../../events/interfaces/general-error.interface';
import { LocationArea } from '../../events/interfaces/location-area.interface';
import { Rate } from '../../events/interfaces/rate.interface';

export interface AppInfo {
  stepName: string | undefined;
  stepNumber: number | undefined;
  origin: LocationArea | undefined;
  destination: LocationArea | undefined;
  packageCount: number | undefined;
  rate: Rate | undefined;
  errors: GeneralError[];
}
