import authSaga from 'features/auth/authSaga';
import campaignSaga from 'features/campaign/campaignSaga';
import packageSaga from 'features/package/packageSaga';
import riskSaga from 'features/risk/riskSaga';
import stageSaga from 'features/stage/stageSaga';
import { all } from 'redux-saga/effects';

export default function* rootSaga() {
  yield all([authSaga(), campaignSaga(), packageSaga(), stageSaga(), riskSaga()]);
}
