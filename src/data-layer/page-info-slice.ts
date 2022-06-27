import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PageInfoPageId } from '../events/interfaces/page-info-page-id.interface';
import { PageInfo } from './interfaces/page-info.interface';

const initialState = {} as PageInfo;

/**
 * Note: You can write "mutating" logic in Redux Toolkit's createSlice because it uses Immer inside.
 */
const pageInfoSlice = createSlice({
  name: 'page',
  initialState,
  reducers: {
    setPageInfo: {
      reducer(state, action: PayloadAction<PageInfo>) {
        return action.payload;
      },
      prepare(pageInfoPageId: PageInfoPageId) {
        const pageInfo = pageInfoPageId.pageId.split('|');

        return {
          payload: {
            pageId: pageInfoPageId.pageId,
            countryCode: pageInfo[0],
            languageCode: pageInfo[1],
            pageName: pageInfo.splice(2).join('/'),
          },
        };
      },
    },
  },
});

export const { setPageInfo } = pageInfoSlice.actions;

export default pageInfoSlice.reducer;
