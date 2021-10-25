import { PayloadAction } from '@reduxjs/toolkit';
import stageApi from 'api/stageApi';
import { Stage, StagePagingRequest, Response } from 'models';
import { call, debounce, put, takeLatest } from 'redux-saga/effects';
import { stageActions } from './stageSlice';

function* fetchList(action: PayloadAction<StagePagingRequest>) {
  try {
    const rs: Response<Stage> = yield call(stageApi.getAll, action.payload);
    yield put(stageActions.fetchListSuccess(rs));
  } catch (error) {
    yield put(stageActions.fetchListError());
  }
}
function* searchWithDebounce(action: PayloadAction<StagePagingRequest>) {
  yield put(stageActions.setFilter(action.payload));
}
export default function* stageSaga() {
  yield takeLatest(stageActions.fetchList.type, fetchList);
  yield debounce(800, stageActions.setFilterWithDebounce.type, searchWithDebounce);
}
