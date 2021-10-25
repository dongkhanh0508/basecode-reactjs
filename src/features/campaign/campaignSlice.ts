import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'app/store';
import { Campaign, PaginationRequest, Response } from 'models';
import { toast } from 'react-toastify';
import i18n from 'translation/i18n';

interface State {
  loading: boolean;
  lists: Response<Campaign>;
  filter: PaginationRequest;
  refresh: number;
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
  refresh: 1,
};
const campaignSlice = createSlice({
  name: 'campaign',
  initialState,
  reducers: {
    // poi brands
    fetchList(state, action: PayloadAction<PaginationRequest>) {
      state.loading = true;
    },
    fetchListSuccess(state, action: PayloadAction<Response<Campaign>>) {
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
    setRefresh(state) {
      state.refresh += 1;
    },
  },
});
// actions
export const campaignActions = campaignSlice.actions;
// selectors
export const selectLoading = (state: RootState) => state.campaign.loading;
export const selectCampaignList = (state: RootState) => state.campaign.lists;
export const selectFilter = (state: RootState) => state.campaign.filter;
export const selectRefresh = (state: RootState) => state.campaign.refresh;
// options
export const selectCampaignOptions = createSelector(selectCampaignList, (campaigns) =>
  campaigns?.results?.map((campaign) => ({
    name: campaign.name,
    id: campaign.id,
  }))
);

// reducers
const campaignReducer = campaignSlice.reducer;
export default campaignReducer;
