import { PayloadAction } from '@reduxjs/toolkit';
import packageApi from 'api/packageApi';
import { CampaignPackage, PaginationRequest, Response } from 'models';
import { call, debounce, put, takeLatest } from 'redux-saga/effects';
import { packageActions } from './packageSlice';

function* fetchList(action: PayloadAction<PaginationRequest>) {
  try {
    const rs: Response<CampaignPackage> = yield call(packageApi.getAll, action.payload);
    yield put(packageActions.fetchListSuccess(rs));
  } catch (error) {
    yield put(packageActions.fetchListError());
  }
}
function* searchWithDebounce(action: PayloadAction<PaginationRequest>) {
  yield put(packageActions.setFilter(action.payload));
}
export default function* packageSaga() {
  yield takeLatest(packageActions.fetchList.type, fetchList);
  yield debounce(800, packageActions.setFilterWithDebounce.type, searchWithDebounce);
}
