import { LocationArea } from '../../events/interfaces/location-area.interface';

export interface AppInfo {
  stepName: string | undefined;
  stepNumber: number | undefined;
  origin: LocationArea | undefined;
  destination: LocationArea | undefined;
}
