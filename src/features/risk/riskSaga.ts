import { PayloadAction } from '@reduxjs/toolkit';
import stageApi from 'api/stageApi';
import { Risk, Response, PaginationRequest } from 'models';
import { call, debounce, put, takeLatest } from 'redux-saga/effects';
import { riskActions } from './riskSlice';

function* fetchList(action: PayloadAction<PaginationRequest>) {
  try {
    const rs: Response<Risk> = yield call(stageApi.getAll, action.payload);
    yield put(riskActions.fetchListSuccess(rs));
  } catch (error) {
    yield put(riskActions.fetchListError());
  }
}
function* searchWithDebounce(action: PayloadAction<PaginationRequest>) {
  yield put(riskActions.setFilter(action.payload));
}
export default function* riskSaga() {
  yield takeLatest(riskActions.fetchList.type, fetchList);
  yield debounce(800, riskActions.setFilterWithDebounce.type, searchWithDebounce);
}
