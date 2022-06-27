import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { GeneralError } from '../events/interfaces/general-error.interface';
import { LocationArea } from '../events/interfaces/location-area.interface';
import { Package } from '../events/interfaces/package.interface';
import { Rate } from '../events/interfaces/rate.interface';
import { Step } from '../events/interfaces/step.interface';
import { AppInfo } from './interfaces/app-info.interface';

const initialState = {} as AppInfo;

/**
 * Note: You can write "mutating" logic in Redux Toolkit's createSlice because it uses Immer inside.
 */
const appInfoSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    updateViewStep(state, action: PayloadAction<Step>) {
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
    setPackageCount(state, action: PayloadAction<Package>) {
      state.packageCount = action.payload.packageCount;
    },
    setRate(state, action: PayloadAction<Rate>) {
      state.rate = action.payload;
    },
    addError(state, action: PayloadAction<GeneralError>) {
      if (!state.errors) {
        state.errors = [];
      }
      state.errors.push(action.payload);
    },
  },
});

export const { updateViewStep, setOrigin, setDestination, setPackageCount, setRate, addError } = appInfoSlice.actions;

export default appInfoSlice.reducer;
