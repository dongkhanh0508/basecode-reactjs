import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'app/store';
import { CampaignPackage, PaginationRequest, Response } from 'models';
import { toast } from 'react-toastify';
import i18n from 'translation/i18n';

interface State {
  loading: boolean;
  lists: Response<CampaignPackage>;
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
const packageSlice = createSlice({
  name: 'package',
  initialState,
  reducers: {
    // poi brands
    fetchList(state, action: PayloadAction<PaginationRequest>) {
      state.loading = true;
    },
    fetchListSuccess(state, action: PayloadAction<Response<CampaignPackage>>) {
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
export const packageActions = packageSlice.actions;
// selectors
export const selectLoading = (state: RootState) => state.package.loading;
export const selectCampaignPackageList = (state: RootState) => state.package.lists;
export const selectFilter = (state: RootState) => state.package.filter;
// reducers
const packageReducer = packageSlice.reducer;
export default packageReducer;
