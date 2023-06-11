import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

import { DriverSlice } from './features/DriverSlice';
import { RaceSlice } from './features/RaceSlice';
import { TeamSlice } from './features/TeamSlice';

// Slice
export const store = configureStore({
  reducer: {
    team: TeamSlice.reducer,
    race: RaceSlice.reducer,
    driver: DriverSlice.reducer,
  },
});

export const useAppDispatch: () => typeof store.dispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<
  ReturnType<typeof store.getState>
> = useSelector;
