import { Dispatch } from 'redux';
import { setPageInfo } from '../data-layer/page-info-slice';
import { addError, setDestination, setOrigin, setPackageCount, setRate, updateViewStep } from '../data-layer/app-info-slice';
import { PageInfoPageId } from './interfaces/page-info-page-id.interface';
import { Step } from './interfaces/step.interface';
import { LocationArea } from './interfaces/location-area.interface';
import { Package } from './interfaces/package.interface';
import { GeneralError } from './interfaces/general-error.interface';
import { Rate } from './interfaces/rate.interface';

export const createEventPublisher = (dispatch: Dispatch) => (name: string, payload: object) => {
  switch (name) {
    case 'pageInfo':
      dispatch(setPageInfo(payload as PageInfoPageId));
      break;
    case 'viewStep':
      dispatch(updateViewStep(payload as Step));
      break;
    case 'originComplete':
      dispatch(setOrigin(payload as LocationArea));
      break;
    case 'destinationComplete':
      dispatch(setDestination(payload as LocationArea));
      break;
    case 'packagesComplete':
      dispatch(setPackageCount(payload as Package));
      break;
    case 'viewRate':
      dispatch(setRate(payload as Rate));
      break;
    case 'error':
      dispatch(addError(payload as GeneralError));
      break;

    default:
      dispatch({
        type: 'PUBLISH_EVENT',
        data: {
          name,
          payload,
        },
      });
  }
};
