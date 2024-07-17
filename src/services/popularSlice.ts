import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { TPlaylist, TTrack } from "../utils/types";
import { getPopularApi } from "../utils/api";

export const getPopularThunk = createAsyncThunk('popular/getPopularTracksApi', await getPopularApi);

export interface PlaylistsState {
  isLoading: boolean;
  popularTracks: TTrack[];
  popularPlaylists: TPlaylist[];
}

export const initialState: PlaylistsState = {
  isLoading: false,
  popularTracks: [],
  popularPlaylists: [],
}

export const popularSlice = createSlice({
  name: 'popular',
  initialState,
  reducers: {},
  selectors: {
    getPopular: (state) => state.popularTracks,
    getPopularPlaylists: (state) => state.popularPlaylists,
    getIsLoadingPopular: (state) => state.isLoading,
  },
  extraReducers: (builder) => {
    builder.addCase(getPopularThunk.pending, (state) => {
      state.isLoading = true;
    })
    builder.addCase(getPopularThunk.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.popularTracks = payload.topTracks;
      state.popularPlaylists = payload.popularPlaylists;
    })
  }
})

export const { getPopular, getIsLoadingPopular, getPopularPlaylists } = popularSlice.selectors;
export const popular = popularSlice.reducer;