import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { TPlaylist, TTrack } from "../utils/types";
import { getCurrentApi, getPlaylistById, searchTrackById } from "../utils/api";

export const getCurrentThunk = createAsyncThunk('current/getCurrentApi', () => {
  const current = getCurrentApi();
  localStorage.setItem('current', JSON.stringify(current));
  return current;
})

export const postCurrentTrackThunk = createAsyncThunk(
  'current/postCurrentTrackApi',
  async (trackId: string) => {
    const results = await searchTrackById(trackId);
    return results;
  }
);

// Асинхронное действие для получения плейлиста по ID.
export const getPlaylistByIdForCurrentThunk = createAsyncThunk('current/getPlaylistByIdForCurrentThunk', async (id: string) => {
  const playlist = await getPlaylistById(id);
  return playlist;
});


export interface currentState {
  current: TTrack;
  currentPlaylist: TPlaylist;
  playing: boolean;
  repeating: boolean;
  shuffle: boolean;
  volume: number;
  lastvolume: number;
  threme: string;
  isLoadingState: boolean;
}

export const initialState: currentState = {
  current: {
    name: '',
    executor: '',
    image: '',
    url: '',
    duration: '',
    isLike: false,
    _id: '',
    auditions: 0,
    albumId: '',
    executorID: ""
  },
  currentPlaylist: {
    _id: "",
    name: "",
    executor: "",
    image: "",
    information: "",
    tracks: []
  },
  playing: false,
  repeating: false,
  shuffle: false,
  volume: 0.4,
  lastvolume: 0,
  threme: 'default',
  isLoadingState: false,
}

export const currentSlice = createSlice({
  name: 'current',
  initialState,
  reducers: {
    togglePlaying: (state) => {
      state.playing = !state.playing
    },
    truePlaying: (state) => {
      state.playing = true;
    },
    falsePlaying: (state) => {
      state.playing = false;
    },
    setVolume: (state, {payload}) => {
      state.volume = payload;
      localStorage.setItem('current', JSON.stringify(state));
    },
    volumeMute: (state) => {
      if (state.volume === 0) {
        state.volume = state.lastvolume;
        state.lastvolume = 0;
      }
      else {
        state.lastvolume = state.volume;
        state.volume = 0;
      }
      localStorage.setItem('current', JSON.stringify(state));
    },
    toggleShuffle: (state) => {
      state.shuffle = !state.shuffle;
      localStorage.setItem('current', JSON.stringify(state));
    },
    toggleRepeat: (state) => {
      state.repeating = !state.repeating;
      localStorage.setItem('current', JSON.stringify(state));
    },
    setThreme: (state, { payload }) => {
      state.threme = payload;
      localStorage.setItem('current', JSON.stringify(state));
    },
    toggleLikeTrack: (state) => {
      state.current.isLike = !state.current.isLike;
      localStorage.setItem('current', JSON.stringify(state));
    },
  },
  selectors: {
    getState: (state) => state,
    getIsloadingState: (state) => state.isLoadingState
  },
  extraReducers: (builder) => {
    builder.addCase(getCurrentThunk.pending, (state) => {
      state.isLoadingState = true
    })
    builder.addCase(getCurrentThunk.fulfilled, (state, { payload }) => {
      state.isLoadingState = false
      state.lastvolume = payload.lastvolume;
      state.volume = payload.volume;
      state.repeating = payload.repeating;
      state.shuffle = payload.shuffle;
      state.threme = payload.threme;
    })
    
    builder.addCase(postCurrentTrackThunk.pending, () => {
    })
    builder.addCase(postCurrentTrackThunk.fulfilled, (state, { payload }) => {
      state.current = payload.track;
      localStorage.setItem('current', JSON.stringify(state))
    })

    builder.addCase(getPlaylistByIdForCurrentThunk.pending, (state) => {
      state.isLoadingState = true
    })
    builder.addCase(getPlaylistByIdForCurrentThunk.fulfilled, (state, { payload }) => {
      state.isLoadingState = false
      state.currentPlaylist = payload;
      localStorage.setItem('current', JSON.stringify(state))
    })
  }
})

export const { togglePlaying, toggleLikeTrack, truePlaying, falsePlaying, setVolume, volumeMute, toggleShuffle, toggleRepeat, setThreme } =currentSlice.actions;
export const { getState, getIsloadingState } = currentSlice.selectors;
export const current = currentSlice.reducer;