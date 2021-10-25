import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'app/store';
import { Risk, PaginationRequest, Response } from 'models';
import { toast } from 'react-toastify';
import i18n from 'translation/i18n';

interface State {
  loading: boolean;
  lists: Response<Risk>;
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
const riskSlice = createSlice({
  name: 'risk',
  initialState,
  reducers: {
    // poi brands
    fetchList(state, action: PayloadAction<PaginationRequest>) {
      state.loading = true;
    },
    fetchListSuccess(state, action: PayloadAction<Response<Risk>>) {
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
export const riskActions = riskSlice.actions;
// selectors
export const selectLoading = (state: RootState) => state.risk.loading;
export const selectRiskList = (state: RootState) => state.risk.lists;
export const selectFilter = (state: RootState) => state.risk.filter;
// reducers
const riskReducer = riskSlice.reducer;
export default riskReducer;
