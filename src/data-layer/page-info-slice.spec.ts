import { AnyAction } from '@reduxjs/toolkit';
import pageInfoSliceReducer from './page-info-slice';

describe('pageInfoSlice', () => {
  describe('pageInfoSliceReducer', () => {
    test('should return the initial state', () => {
      expect(pageInfoSliceReducer(undefined, {} as AnyAction)).toEqual({});
    });
  });
});
