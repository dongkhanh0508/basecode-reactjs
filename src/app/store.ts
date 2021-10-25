import createSagaMiddleware from 'redux-saga';
import { Action, combineReducers, configureStore, ThunkAction } from '@reduxjs/toolkit';
import authReducer from 'features/auth/authSlice';
import campaignReducer from 'features/campaign/campaignSlice';
import packageReducer from 'features/package/packageSlice';
import stageReducer from 'features/stage/stageSlice';
import riskReducer from 'features/risk/riskSlice';
import rootSaga from './rootSaga';

const rootReducer = combineReducers({
  auth: authReducer,
  campaign: campaignReducer,
  package: packageReducer,
  stage: stageReducer,
  risk: riskReducer,
});

const sagaMiddleware = createSagaMiddleware();
export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: true,
    }).concat(sagaMiddleware),
});
sagaMiddleware.run(rootSaga);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
