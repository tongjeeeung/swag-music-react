import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { TUser } from "../utils/types";
import { changePassword, fetchLikedTracks, fetchUserPlaylists, getUserInfo, loginUser, logOutApi, registerUser, toggleAddedPlaylist, toggleLikeTrack, updateProfile, UpdateProfilePayload } from "../utils/api";
import { deleteCookie, setCookie } from "../utils/cookie";

//регистрация пользователя
export const registerUserThunk = createAsyncThunk(
  'user/register',
  async ({ name, email, password }: { name: string; email: string; password: string; }) => {
    const response = await registerUser(name, email, password);
    setCookie('accessToken', response.accessToken); // Сохраняем accessToken в куки
    localStorage.setItem('refreshToken', response.refreshToken); // Сохраняем refreshToken в localStorage
    return response;
  }
);

//вход
export const loginUserThunk = createAsyncThunk(
  'user/login',
  async ({ email, password }: { email: string; password: string }) => {
    const response = await loginUser(email, password);
    setCookie('accessToken', response.accessToken); // Сохраняем accessToken в куки
    localStorage.setItem('refreshToken', response.refreshToken); // Сохраняем refreshToken в localStorage
    return response;
  }
);

export const getUserInfoThunk = createAsyncThunk('user/getUserInfo', async () => {
  const response = await getUserInfo();
  return response;
});


//смена пароля по email
export const changePasswordThunk = createAsyncThunk(
  'user/changePassword',
  async ({ email, password }: { email: string; password: string }) => {
    const response = await changePassword(email, password);
    return response;
  }
);

//export const getUserThunk = createAsyncThunk('user/getUserApi', getUserApi)

export const fetchLikedTracksThunk = createAsyncThunk(
  'user/fetchLikedTracks',
  async (_, { rejectWithValue }) => {
    try {
      const likedTracks = await fetchLikedTracks();
      return likedTracks;
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      } else {
        return rejectWithValue('Неизвестная ошибка');
      }
    }
  }
);

export const toggleLikeTrackThunk = createAsyncThunk(
  'user/toggleLikeTrack',
  async (trackId: string, { rejectWithValue }) => {
    try {
      const likedTracks = await toggleLikeTrack(trackId);
      return likedTracks;
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      } else {
        return rejectWithValue('Неизвестная ошибка');
      }
    }
  }
);

export const fetchUserPlaylistsThunk = createAsyncThunk(
  'user/fetchUserPlaylists',
  async (_, { rejectWithValue }) => {
    try {
      const addedPlaylists = await fetchUserPlaylists();
      return addedPlaylists;
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      } else {
        return rejectWithValue('Неизвестная ошибка');
      }
    }
  }
);

export const toggleAddedPlaylistThunk = createAsyncThunk(
  'user/toggleAddedPlaylist',
  async (playlistId: string, { rejectWithValue }) => {
    try {
      const addedPlaylists = await toggleAddedPlaylist(playlistId);
      return addedPlaylists;
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      } else {
        return rejectWithValue('Неизвестная ошибка');
      }
    }
  }
);

export const logOutThunk = createAsyncThunk('user/logOutApi', () => {
  logOutApi
  localStorage.removeItem('refreshToken');
  deleteCookie('accessToken');
})

export const updateUserProfileThunk = createAsyncThunk(
  'user/updateProfile',
  async (payload: UpdateProfilePayload, { rejectWithValue }) => {
    try {
      const user = await updateProfile(payload);
      return user;
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      } else {
        return rejectWithValue('Неизвестная ошибка');
      }
    }
  }
);

export interface UserState {
  isAuth: boolean;
  user: TUser | null;
  error: string;
}

export const initialState: UserState = {
  isAuth: false,
  user: null,
  error: '',
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  selectors: {
    getUser: (state) => state.user,
    getIsAuth: (state) => state.isAuth,
  },
  extraReducers: (builder) => {
    builder
    .addCase(logOutThunk.pending, (state) => {
      state.isAuth = true;
    })
    .addCase(logOutThunk.fulfilled, (state) => {
      state.isAuth = false;
      state.user = null;
    })

    .addCase(fetchLikedTracksThunk.pending, (state) => {
      state.isAuth = true;
    })
    .addCase(fetchLikedTracksThunk.fulfilled, (state, action) => {
      state.isAuth = true;
      if (state.user) {
        state.user.likedTracks = action.payload;
      }
      state.error = '';
    })
    .addCase(fetchLikedTracksThunk.rejected, (state, action) => {
      state.isAuth = true;
      state.error = action.payload as string;
    })

    .addCase(toggleLikeTrackThunk.pending, (state) => {
      state.isAuth = true;
    })
    .addCase(toggleLikeTrackThunk.fulfilled, (state, action) => {
      state.isAuth = true;
      if (state.user) {
        state.user.likedTracks = action.payload;
      }
      state.error = '';
    })
    .addCase(toggleLikeTrackThunk.rejected, (state, action) => {
      state.isAuth = true;
      state.error = action.payload as string;
    })

    .addCase(fetchUserPlaylistsThunk.fulfilled, (state, action) => {
      if (state.user) {
        state.user.addedPlaylists = action.payload;
      }
      state.error = '';
    })
    .addCase(fetchUserPlaylistsThunk.rejected, (state, action) => {
      state.error = action.payload as string;
    })

    .addCase(toggleAddedPlaylistThunk.fulfilled, (state, action) => {
      if (state.user) {
        state.user.addedPlaylists = action.payload;
      }
      state.error = '';
    })
    .addCase(toggleAddedPlaylistThunk.rejected, (state, action) => {
      state.error = action.payload as string;
    })


    .addCase(updateUserProfileThunk.pending, (state) => {
      state.isAuth = true;
    })
    .addCase(updateUserProfileThunk.fulfilled, (state, action) => {
      state.isAuth = true;
      state.user = action.payload;
      state.error = '';
    })
    .addCase(updateUserProfileThunk.rejected, (state, action) => {
      state.isAuth = true;
      state.error = action.payload as string;
    })

    .addCase(getUserInfoThunk.pending, (state) => {
      state.isAuth = false;
    })
    .addCase(getUserInfoThunk.fulfilled, (state, action) => {
      state.isAuth = true;
      state.user = action.payload;
      state.error = '';
    })
    .addCase(getUserInfoThunk.rejected, (state, action) => {
      state.isAuth = false;
      state.error = action.error.message || 'Ошибка при получении информации о пользователе';
    })

    .addCase(registerUserThunk.pending, (state) => {
      state.isAuth = false;
    })
    .addCase(registerUserThunk.fulfilled, (state, action) => {
      state.isAuth = true;
      state.user = action.payload;
      state.error = '';
    })
    .addCase(registerUserThunk.rejected, (state, action) => {
      state.isAuth = false;
      state.error = action.error.message || 'Ошибка при регистрации пользователя';
    })

    .addCase(loginUserThunk.pending, (state) => {
      state.isAuth = false;
    })
    .addCase(loginUserThunk.fulfilled, (state, action) => {
      state.isAuth = true;
      state.user = action.payload;
      state.error = '';
    })
    .addCase(loginUserThunk.rejected, (state, action) => {
      state.isAuth = false;
      state.error = action.error.message || 'Ошибка при входе пользователя';
    })

    .addCase(changePasswordThunk.pending, (state) => {
      state.isAuth = false;
      state.error = '';
    })
    .addCase(changePasswordThunk.fulfilled, (state) => {
      state.isAuth = false;
      state.error = '';
    })
    .addCase(changePasswordThunk.rejected, (state, action) => {
      state.isAuth = false;
      state.error = action.error.message || 'Ошибка при смене пароля';
    })
  }
})

export const { getUser, getIsAuth } = userSlice.selectors;
export const user = userSlice.reducer;