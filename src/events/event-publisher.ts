import { Dispatch } from 'redux';
import { setPageInfo } from '../data-layer/page-info-slice';
import { setDestination, setOrigin, updateViewStep } from '../data-layer/app-info-slice';
import { PageInfoPageId } from './interfaces/page-info-page-id.interface';
import { ViewStep } from './interfaces/view-step.interface';
import { LocationArea } from './interfaces/location-area.interface';

export const createEventPublisher = (dispatch: Dispatch) => (name: string, payload: object) => {
  switch (name) {
    case 'pageInfo':
      dispatch(setPageInfo(payload as PageInfoPageId));
      break;
    case 'viewStep':
      dispatch(updateViewStep(payload as ViewStep));
      break;
    case 'originComplete':
      dispatch(setOrigin(payload as LocationArea));
      break;
    case 'destinationComplete':
      dispatch(setDestination(payload as LocationArea));
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
