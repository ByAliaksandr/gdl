import { createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit';
import { GeneralError } from '../events/interfaces/general-error.interface';
import { LocationArea } from '../events/interfaces/location-area.interface';
import { Package } from '../events/interfaces/package.interface';
import { Rate } from '../events/interfaces/rate.interface';
import { Step } from '../events/interfaces/step.interface';
import { AnalyticsAction } from './interfaces/action.interface';
import { AppInfo } from './interfaces/app-info.interface';

const initialState = {} as AppInfo;

/**
 * Note: You can write "mutating" logic in Redux Toolkit's createSlice because it uses Immer inside.
 */
const appInfoSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    updateViewStep: {
      reducer(state, action: PayloadAction<AnalyticsAction & Step>) {
        return { ...state, ...action.payload };
      },
      prepare({ name, payload }: { name: string; payload: Step }) {
        return {
          payload: {
            ...getAnalyticsAction(name),
            ...payload,
          },
        };
      },
    },
    setOrigin: {
      reducer(state, action: PayloadAction<AnalyticsAction & { origin: LocationArea }>) {
        return { ...state, ...action.payload };
      },
      prepare({ name, payload }: { name: string; payload: LocationArea }) {
        return {
          payload: {
            ...getAnalyticsAction(name),
            origin: payload,
          },
        };
      },
    },
    setDestination: {
      reducer(state, action: PayloadAction<AnalyticsAction & { destination: LocationArea }>) {
        return { ...state, ...action.payload };
      },
      prepare({ name, payload }: { name: string; payload: LocationArea }) {
        return {
          payload: {
            ...getAnalyticsAction(name),
            destination: payload,
          },
        };
      },
    },
    setPackageCount: {
      reducer(state, action: PayloadAction<AnalyticsAction & { packageCount: number }>) {
        return { ...state, ...action.payload };
      },
      prepare({ name, payload }: { name: string; payload: Package }) {
        return {
          payload: {
            ...getAnalyticsAction(name),
            packageCount: payload.packageCount,
          },
        };
      },
    },
    setRate: {
      reducer(state, action: PayloadAction<AnalyticsAction & { rate: Rate }>) {
        return { ...state, ...action.payload };
      },
      prepare({ name, payload }: { name: string; payload: Rate }) {
        return {
          payload: {
            ...getAnalyticsAction(name),
            rate: payload,
          },
        };
      },
    },

    completeShipment: {
      reducer(state, action: PayloadAction<AnalyticsAction>) {
        return { ...state, ...action.payload };
      },
      prepare({ name }: { name: string }) {
        return {
          payload: {
            ...getAnalyticsAction(name),
          },
        };
      },
    },

    shipAgain: {
      reducer(state, action: PayloadAction<AnalyticsAction>) {
        return { ...state, ...action.payload };
      },
      prepare({ name }: { name: string }) {
        return {
          payload: {
            ...getAnalyticsAction(name),
          },
        };
      },
    },

    addError: {
      reducer(state, action: PayloadAction<AnalyticsAction & { error: GeneralError }>) {
        if (!state.errors) {
          state.errors = [];
        }

        const payload = action.payload;
        state.errors.push(payload.error);
        state._analyticsActionId = payload._analyticsActionId;
        state._analyticsActionName = payload._analyticsActionName;
      },
      prepare({ name, payload }: { name: string; payload: GeneralError }) {
        return {
          payload: {
            ...getAnalyticsAction(name),
            error: payload,
          },
        };
      },
    },
  },
});

const getAnalyticsAction = (name: string): AnalyticsAction => {
  return {
    _analyticsActionName: name,
    _analyticsActionId: nanoid(),
  };
};

export const { updateViewStep, setOrigin, setDestination, setPackageCount, setRate, completeShipment, shipAgain, addError } =
  appInfoSlice.actions;

export default appInfoSlice.reducer;
