import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'app/store';
import { Stage, PaginationRequest, Response } from 'models';
import { toast } from 'react-toastify';
import i18n from 'translation/i18n';

interface State {
  loading: boolean;
  lists: Response<Stage>;
  filter: PaginationRequest;
}
const initialState: State = {
  loading: false,
  filter: {
    page: 1,
    pageSize: 10,
  },
  lists: {
    pageNumber: 1,
    pageSize: 10,
    results: [],
    totalNumberOfPages: 0,
    totalNumberOfRecords: 0,
  },
};
const stageSlice = createSlice({
  name: 'stage',
  initialState,
  reducers: {
    // poi brands
    fetchList(state, action: PayloadAction<PaginationRequest>) {
      state.loading = true;
    },
    fetchListSuccess(state, action: PayloadAction<Response<Stage>>) {
      state.lists = action.payload;
      state.loading = false;
    },
    fetchListError(state) {
      toast.error(i18n.t('common.errorText'));
      state.loading = false;
    },
    // filter
    setFilter(state, action: PayloadAction<PaginationRequest>) {
      state.filter = action.payload;
    },
    setFilterWithDebounce(state, action: PayloadAction<PaginationRequest>) {},
  },
});
// actions
export const stageActions = stageSlice.actions;
// selectors
export const selectLoading = (state: RootState) => state.stage.loading;
export const selectStageList = (state: RootState) => state.stage.lists;
export const selectFilter = (state: RootState) => state.stage.filter;
// reducers
const stageReducer = stageSlice.reducer;
export default stageReducer;
