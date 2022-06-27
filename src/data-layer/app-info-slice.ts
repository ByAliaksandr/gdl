import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { LocationArea } from '../events/interfaces/location-area.interface';
import { ViewStep } from '../events/interfaces/view-step.interface';
import { AppInfo } from './interfaces/app-info.interface';

const initialState = {} as AppInfo;

/**
 * Note: You can write "mutating" logic in Redux Toolkit's createSlice because it uses Immer inside.
 */
const appInfoSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    updateViewStep(state, action: PayloadAction<ViewStep>) {
      const payload = action.payload;
      state.stepName = payload.stepName;
      state.stepNumber = payload.stepNumber;
    },
    setOrigin(state, action: PayloadAction<LocationArea>) {
      state.origin = action.payload;
    },
    setDestination(state, action: PayloadAction<LocationArea>) {
      state.destination = action.payload;
    },
  },
});

export const { updateViewStep, setOrigin, setDestination } = appInfoSlice.actions;

export default appInfoSlice.reducer;
