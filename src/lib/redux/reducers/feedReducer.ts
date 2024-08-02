import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SearchParams } from '@src/lib/services/interfaces';

export interface FeedState {
  searchParams: Omit<SearchParams, 'page'>;
}

const initialState: FeedState = {
  searchParams: {},
};

export const articleSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {
    setPreferences: (
      state,
      action: PayloadAction<Omit<SearchParams, 'page'>>
    ) => {
      state.searchParams = action.payload;
    },
    fetchPreferencesRequest: () => {},
  },
});

export const { fetchPreferencesRequest, setPreferences } = articleSlice.actions;

export default articleSlice.reducer;
