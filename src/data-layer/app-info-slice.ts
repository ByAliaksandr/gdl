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

      setAnalyticsAction(state, action);
    },
    setOrigin(state, action: PayloadAction<LocationArea>) {
      state.origin = action.payload;

      setAnalyticsAction(state, action);
    },
    setDestination(state, action: PayloadAction<LocationArea>) {
      state.destination = action.payload;

      setAnalyticsAction(state, action);
    },
    setPackageCount(state, action: PayloadAction<Package>) {
      state.packageCount = action.payload.packageCount;

      setAnalyticsAction(state, action);
    },
    setRate(state, action: PayloadAction<Rate>) {
      state.rate = action.payload;

      setAnalyticsAction(state, action);
    },

    completeShipment(state, action) {
      setAnalyticsAction(state, action);
    },

    shipAgain(state, action) {
      setAnalyticsAction(state, action);
    },

    addError(state, action: PayloadAction<GeneralError>) {
      if (!state.errors) {
        state.errors = [];
      }
      state.errors.push(action.payload);

      setAnalyticsAction(state, action);
    },
  },
});

function setAnalyticsAction(state: AppInfo, action: { type: string }) {
  state._analyticsAction = action.type;
}

export const { updateViewStep, setOrigin, setDestination, setPackageCount, setRate, completeShipment, shipAgain, addError } =
  appInfoSlice.actions;

export default appInfoSlice.reducer;
