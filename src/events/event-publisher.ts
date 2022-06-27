import { Dispatch } from 'redux';
import { setPageInfo } from '../data-layer/page-info-slice';
import { PageInfoPageId } from './interfaces/page-info-page-id.interface';

export const createEventPublisher = (dispatch: Dispatch) => (name: string, payload: object) => {
  switch (name) {
    case 'pageInfo':
      dispatch(setPageInfo(payload as PageInfoPageId));
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
