import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { TArtist } from "../utils/types";
import { getAllExecutors, getExecutorById } from "../utils/api";

export const getArtistsThunk = createAsyncThunk('executor/getArtistsApi', async () => {
  return await getAllExecutors();
});

export const getArtistThunk = createAsyncThunk('executor/getArtistApi', 
  async (id: string) => {
    return await getExecutorById(id);
  }
)

export interface executorState {
  isLoading: boolean;
  artists: TArtist[];
  artist: TArtist | null;
}

export const initialState: executorState = {
  isLoading: false,
  artists: [],
  artist: null
}

export const executorSlice = createSlice({
  name: 'executor',
  initialState,
  reducers: {},
  selectors: {
    getExecutors: (state) => state.artists,
    getIsLoading: (state) => state.isLoading,
    getExecutor: (state) => state.artist,
  },
  extraReducers: (builder) => {
    builder.addCase(getArtistsThunk.pending, (state) => {
      state.isLoading = true;
    })
    builder.addCase(getArtistsThunk.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.artists = payload;
    })
    
    builder.addCase(getArtistThunk.pending, (state) => {
      state.isLoading = true;
    })
    builder.addCase(getArtistThunk.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.artist = payload
    })
  }
})

export const { getExecutors, getIsLoading, getExecutor } = executorSlice.selectors;
export const executor = executorSlice.reducer;
