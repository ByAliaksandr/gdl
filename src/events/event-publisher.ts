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
import { Events } from './interfaces/events.enum';

export const createEventPublisher = (dispatch: Dispatch) => (name: string, payload: object) => {
  const data = {
    name,
    payload,
  };

  switch (name) {
    case Events.PAGE_INFO:
      dispatch(setPageInfo(data as { name: string; payload: PageInfoPageId }));
      break;
    case Events.VIEW_STEP:
      dispatch(updateViewStep(data as { name: string; payload: Step }));
      break;
    case Events.ORIGIN_COMPLETE:
      dispatch(setOrigin(data as { name: string; payload: LocationArea }));
      break;
    case Events.DESTINATION_COMPLETE:
      dispatch(setDestination(data as { name: string; payload: LocationArea }));
      break;
    case Events.PACKAGES_COMPLETE:
      dispatch(setPackageCount(data as { name: string; payload: Package }));
      break;
    case Events.SHIPMENT_COMPLETE:
      dispatch(completeShipment({ name }));
      break;
    case Events.SHIP_AGAIN:
      dispatch(shipAgain({ name }));
      break;
    case Events.VIEW_RATE:
      dispatch(setRate(data as { name: string; payload: Rate }));
      break;
    case Events.ERROR:
      dispatch(addError(data as { name: string; payload: GeneralError }));
      break;

    default:
      dispatch({
        type: 'PUBLISH_EVENT',
        data,
      });
  }
};
