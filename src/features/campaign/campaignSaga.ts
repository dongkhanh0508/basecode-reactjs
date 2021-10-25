import { PayloadAction } from '@reduxjs/toolkit';
import campaignApi from 'api/campaignApi';
import { Campaign, PaginationRequest, Response } from 'models';
import { call, debounce, put, takeLatest } from 'redux-saga/effects';
import { campaignActions } from './campaignSlice';

function* fetchList(action: PayloadAction<PaginationRequest>) {
  try {
    const rs: Response<Campaign> = yield call(campaignApi.getAll, action.payload);
    yield put(campaignActions.fetchListSuccess(rs));
  } catch (error) {
    yield put(campaignActions.fetchListError());
  }
}
function* searchWithDebounce(action: PayloadAction<PaginationRequest>) {
  yield put(campaignActions.setFilter(action.payload));
}
export default function* campaignSaga() {
  yield takeLatest(campaignActions.fetchList.type, fetchList);
  yield debounce(800, campaignActions.setFilterWithDebounce.type, searchWithDebounce);
}
