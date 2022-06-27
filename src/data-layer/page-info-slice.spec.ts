import { AnyAction } from '@reduxjs/toolkit';
import { PageInfo } from './interfaces/page-info.interface';
import pageInfoSliceReducer, { setPageInfo } from './page-info-slice';

describe('pageInfoSlice', () => {
  describe('pageInfoSliceReducer', () => {
    test('should return the initial state', () => {
      const state = pageInfoSliceReducer(undefined, {} as AnyAction);

      expect(state).toEqual({});
    });

    test('should set event name', () => {
      const data = {
        name: 'pageInfo',
        payload: {
          pageId: 'GB|en|apps|simple-shipping',
        },
      };

      const state = pageInfoSliceReducer(undefined, setPageInfo(data));

      expect(state._analyticsActionName).toEqual(data.name);
    });

    test('should set pageId', () => {
      const data = {
        name: 'pageInfo',
        payload: {
          pageId: 'GB|en|apps|simple-shipping',
        },
      };

      const state = pageInfoSliceReducer(undefined, setPageInfo(data));

      expect(state.pageId).toEqual(data.payload.pageId);
    });

    test('should set parsed data', () => {
      const data = {
        name: 'pageInfo',
        payload: {
          pageId: 'GB|en|apps|simple-shipping',
        },
      };

      const state = pageInfoSliceReducer(undefined, setPageInfo(data));

      expect(state.countryCode).toEqual('GB');
      expect(state.languageCode).toEqual('en');
      expect(state.pageName).toEqual('apps/simple-shipping');
    });

    test('should return new state', () => {
      const prevState = {
        _analyticsActionId: 'oldId',
      } as PageInfo;

      const data = {
        name: 'pageInfo',
        payload: {
          pageId: 'GB|en|apps|simple-shipping',
        },
      };

      const state = pageInfoSliceReducer(prevState, setPageInfo(data));

      expect(state._analyticsActionId).not.toEqual(prevState._analyticsActionId);
    });
  });
});
