import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { TPlaylist } from "../utils/types";
import { deleteUserPlaylist, getAllPlaylists, getPlaylistById, getPlaylistsByIds, postNewUserPlaylist, putUpdatePlaylist } from "../utils/api";

// Асинхронное действие для получения всех плейлистов.
export const getAllPlaylistsThunk = createAsyncThunk('playlists/fetchAll', async () => {
  const playlists = await getAllPlaylists();
  return playlists;
});

// Асинхронное действие для получения плейлиста по ID.
export const getPlaylistByIdThunk = createAsyncThunk('playlists/fetchById', async (id: string) => {
  const playlist = await getPlaylistById(id);
  return playlist;
});

// Асинхронное действие для получения плейлистов по массиву ID.
export const getUserPlaylistsThunk = createAsyncThunk('playlists/fetchByIds', async (ids: string[]) => {
  const playlists = await getPlaylistsByIds(ids);
  return playlists;
});

export const postNewUserPlaylistThunk = createAsyncThunk('playlists/postNewUserPlaylist', 
  async (playlist: TPlaylist) => {
    const _playlist = await postNewUserPlaylist(playlist.executorID!, playlist);
    return _playlist;
});

export const ubdateUserPlaylistThunk = createAsyncThunk('playlists/ubdateUserPlaylistThunk', 
  async (playlist: TPlaylist) => {
    const _playlist = await putUpdatePlaylist(playlist.executorID!, playlist);
    return _playlist;
});

export const deleteUserPlaylistThunk = createAsyncThunk('playlists/deleteUserPlaylistThunk', 
  async (playlist: TPlaylist) => {
    await deleteUserPlaylist(playlist.executorID!, playlist._id);
    return playlist;
});

export interface PlaylistsState {
  isLoading: boolean;
  isLoadingPlaylist: boolean;
  playlists: TPlaylist[] | null;
  userPlaylists: TPlaylist[] | null;
  playlist: TPlaylist | null;
}

export const initialState: PlaylistsState = {
  isLoading: false,
  isLoadingPlaylist: false,
  playlists: null,
  userPlaylists: null,
  playlist: null,
}

export const playlistsSlice = createSlice({
  name: 'playlists',
  initialState,
  reducers: {},
  selectors: {
    getPlaylists: (state) => state.playlists,
    getUserPlaylists: (state) => state.userPlaylists,
    getPlaylist: (state) => state.playlist,
    getIsLoading: (state) => state.isLoading,
    getIsLoadingPlaylist: (state) => state.isLoadingPlaylist
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllPlaylistsThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllPlaylistsThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.playlists = action.payload;
      })
      .addCase(getAllPlaylistsThunk.rejected, (state, action) => {
        state.isLoading = false;
        console.error(action.error.message);
      })

      .addCase(getPlaylistByIdThunk.pending, (state) => {
        state.isLoadingPlaylist = true;
      })
      .addCase(getPlaylistByIdThunk.fulfilled, (state, action) => {
        state.isLoadingPlaylist = false;
        state.playlist = action.payload;
      })
      .addCase(getPlaylistByIdThunk.rejected, (state, action) => {
        state.isLoadingPlaylist = false;
        console.error(action.error.message);
      })

      .addCase(getUserPlaylistsThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUserPlaylistsThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userPlaylists = action.payload;
      })
      .addCase(getUserPlaylistsThunk.rejected, (state, action) => {
        state.isLoading = false;
        console.error(action.error.message);
      })

      .addCase(postNewUserPlaylistThunk.pending, (state) => {
        state.isLoadingPlaylist = true
      })
      .addCase(postNewUserPlaylistThunk.rejected, (state, action) => {
        state.isLoadingPlaylist = false
        console.error(action.error.message);
      })
      .addCase(postNewUserPlaylistThunk.fulfilled, (state, action) => {
        state.isLoadingPlaylist = false
        state.userPlaylists?.push(action.payload.playlist);
        state.playlists?.push(action.payload.playlist);
        state.playlist = action.payload.playlist;
      })

      .addCase(ubdateUserPlaylistThunk.pending, (state) => {
        state.isLoadingPlaylist = true
      })
      .addCase(ubdateUserPlaylistThunk.rejected, (state, action) => {
        state.isLoadingPlaylist = false
        console.error(action.error.message);
      })
      .addCase(ubdateUserPlaylistThunk.fulfilled, (state, action) => {
        state.isLoadingPlaylist = false
        state.playlist = action.payload.playlist;
      })

      .addCase(deleteUserPlaylistThunk.pending, (state) => {
        state.isLoading = true
      })
      .addCase(deleteUserPlaylistThunk.rejected, (state, action) => {
        state.isLoading = false
        console.error(action.error.message);
      })
      .addCase(deleteUserPlaylistThunk.fulfilled, (state, action) => {
        state.isLoading = false
        state.playlist = null;
        console.log(state.playlists?.filter((playlist) => playlist._id !== action.payload._id))
        state.playlists = state.playlists?.filter((playlist) => playlist._id !== action.payload._id) ? state.playlists?.filter((playlist) => playlist._id !== action.payload._id) : state.playlists
      })
  }
})

export const { getPlaylists, getIsLoading, getUserPlaylists, getPlaylist, getIsLoadingPlaylist } = playlistsSlice.selectors;
export const playlists = playlistsSlice.reducer;