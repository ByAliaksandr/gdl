import { Dispatch } from 'redux';
import { setPageInfo } from '../data-layer/page-info-slice';
import {
  addError,
  completeShipment,
  setDestination,
  setOrigin,
  setPackageCount,
  setRate,
  shipAgain,
  updateViewStep,
} from '../data-layer/app-info-slice';
import { PageInfoPageId } from './interfaces/page-info-page-id.interface';
import { Step } from './interfaces/step.interface';
import { LocationArea } from './interfaces/location-area.interface';
import { Package } from './interfaces/package.interface';
import { GeneralError } from './interfaces/general-error.interface';
import { Rate } from './interfaces/rate.interface';

export const createEventPublisher = (dispatch: Dispatch) => (name: string, payload: object) => {
  const data = {
    name,
    payload,
  };

  switch (name) {
    case 'pageInfo':
      dispatch(setPageInfo(data as { name: string; payload: PageInfoPageId }));
      break;
    case 'viewStep':
      dispatch(updateViewStep(data as { name: string; payload: Step }));
      break;
    case 'originComplete':
      dispatch(setOrigin(data as { name: string; payload: LocationArea }));
      break;
    case 'destinationComplete':
      dispatch(setDestination(data as { name: string; payload: LocationArea }));
      break;
    case 'packagesComplete':
      dispatch(setPackageCount(data as { name: string; payload: Package }));
      break;
    case 'shipmentComplete':
      dispatch(completeShipment({ name }));
      break;
    case 'shipAgain':
      dispatch(shipAgain({ name }));
      break;
    case 'viewRate':
      dispatch(setRate(data as { name: string; payload: Rate }));
      break;
    case 'error':
      dispatch(addError(data as { name: string; payload: GeneralError }));
      break;

    default:
      dispatch({
        type: 'PUBLISH_EVENT',
        data,
      });
  }
};
