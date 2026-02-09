// client/src/app/hooks.ts

// Custom hooks for Redux state and dispatch with TypeScript support

import { useDispatch, useSelector, type TypedUseSelectorHook } from 'react-redux';
import type { RootState, AppDispatch } from './store';

// Use throughout the app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch: () => AppDispatch = useDispatch; // Type-safe dispatch hook
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector; // Type-safe selector hook