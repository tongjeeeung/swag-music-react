import { getCookie } from "./cookie.ts";
import { TArtist, TPlaylist, TUser, TTrack, TBlog } from "./types";
import axios from 'axios';

const API_URL = 'https://swag-music-react.onrender.com';

export const logOutApi = () => {
  console.log('logOut')
}

export const getCurrentApi = () => {
  const current = localStorage.getItem('current');
  if (current) {
    const currents = JSON.parse(current);
    currents.playing = false;
    currents.current = {
      name: '',
      executor: '',
      image: '',
      url: '',
      duration: '',
      isLike: false,
      _id: '',
      albumId: '',
    };
    return currents;
  }
  else return {
    current: {
      name: '',
      executor: '',
      image: '',
      url: '',
      duration: '',
      isLike: false,
      _id: '',
      albumId: '',
    },
    playing: false,
    repeating: false,
    shuffle: false,
    volume: 0.4,
    lastvolume: 0,
    threme: 'default',
  }
}

export const registerUser = async (name: string, email: string, password: string) => {
  const avatar = "/static/images/avatar.jpg";
  const response = await axios.post(`${API_URL}/user/register`, { name, email, password, avatar });
  return response.data;
};

export const loginUser = async (email: string, password: string) => {
  const response = await axios.post(`${API_URL}/user/login`, { email, password });
  return response.data;
};

export const getUserInfo = async () => {
  const token = getCookie('accessToken');
  if (!token) {
    throw new Error('Токен не найден');
  }
  const response = await axios.get(`${API_URL}/user`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export interface UpdateProfilePayload {
  name?: string;
  avatar?: string;
  email?: string;
}

export const updateProfile = async (payload: UpdateProfilePayload): Promise<TUser> => {
  const token = getCookie('accessToken');
  if (!token) {
    throw new Error('Токен не найден');
  }

  try {
    const response = await axios.put(`${API_URL}/user/update-profile`, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.user;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Ошибка при обновлении профиля');
    } else {
      throw new Error('Неизвестная ошибка');
    }
  }
};

export const changePassword = async (email: string, newPassword: string) => {
  const response = await axios.put(`${API_URL}/change-password`, { email, newPassword });
  return response.data;
};

// Получение массива лайкнутых треков
export const fetchLikedTracks = async (): Promise<string[]> => {
  const token = getCookie('accessToken');
  if (!token) {
    throw new Error('Токен не найден');
  }

  const response = await axios.get('/user/liked-tracks', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data.likedTracks;
};

// Добавление или удаление лайкнутого трека
export const toggleLikeTrack = async (trackId: string): Promise<string[]> => {
  const token = getCookie('accessToken');
  if (!token) {
    throw new Error('Токен не найден');
  }

  const response = await axios.post(
    `${API_URL}/user/toggle-like-track`,
    { trackId },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data.likedTracks;
};

// Получение массива плейлистов пользователя
export const fetchUserPlaylists = async (): Promise<string[]> => {
  const token = getCookie('accessToken');
  if (!token) {
    throw new Error('Токен не найден');
  }

  const response = await axios.get('/user/playlists', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data.addedPlaylists;
};

// Добавление или удаление плейлиста
export const toggleAddedPlaylist = async (playlistId: string): Promise<string[]> => {
  const token = getCookie('accessToken');
  if (!token) {
    throw new Error('Токен не найден');
  }

  const response = await axios.post(
    `${API_URL}/user/toggle-added-playlist`,
    { playlistId },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data.addedPlaylists;
};

export const getAllUsers = async () => {
  const response = await axios.get(`${API_URL}/users`);
  return response.data;
};

// Получение всех плейлистов.
export const getAllPlaylists = async (): Promise<TPlaylist[]> => {
  try {
    const response = await axios.get(`${API_URL}/playlists`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Ошибка при получении плейлистов');
    } else {
      throw new Error('Неизвестная ошибка при получении плейлистов');
    }
  }
};

// Получение плейлиста по ID.
export const getPlaylistById = async (id: string): Promise<TPlaylist> => {
  try {
    const response = await axios.get(`${API_URL}/playlists/${id}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Ошибка при получении плейлиста');
    } else {
      throw new Error('Неизвестная ошибка при получении плейлиста');
    }
  }
};

// Получение плейлистов по массиву ID.
export const getPlaylistsByIds = async (ids: string[]): Promise<TPlaylist[]> => {
  try {
    const response = await axios.post(`${API_URL}/playlists/by-ids`, { ids });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Ошибка при получении плейлистов');
    } else {
      throw new Error('Неизвестная ошибка при получении плейлистов');
    }
  }
};

// Поиск трека по ID во всех плейлистах
export const searchTrackById = async (trackId: string): Promise<{track: TTrack;
  playlist: TPlaylist}> => {
  try {
    const response = await axios.get<{track: TTrack;
      playlist: TPlaylist;}>(`${API_URL}/search-track?trackId=${trackId}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Ошибка при получении трека');
    } else {
      throw new Error('Неизвестная ошибка при получении трека');
    }
  }
};

// Получение всех executors.
export const getAllExecutors = async (): Promise<TArtist[]> => {
  try {
    const response = await axios.get(`${API_URL}/artists`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Ошибка при получении исполнителей');
    } else {
      throw new Error('Неизвестная ошибка при получении исполнителей');
    }
  }
};

// Получение executor по ID.
export const getExecutorById = async (id: string): Promise<TArtist> => {
  try {
    const response = await axios.get(`${API_URL}/artists/${id}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Ошибка при получении исполнителя');
    } else {
      throw new Error('Неизвестная ошибка при получении исполнителя');
    }
  }
};

// Получение popular.
export const getPopularApi = async (): Promise<{topTracks: TTrack[], popularPlaylists: TPlaylist[]}> => {
  try {
    const response = await axios.get(`${API_URL}/popular`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Ошибка при получении популярных');
    } else {
      throw new Error('Неизвестная ошибка при получении популярных');
    }
  }
};

// Получение статьи по ID.
export const getArticleById = async (id: string): Promise<TBlog> => {
  try {
    const response = await axios.get(`${API_URL}/blog/${id}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Ошибка при получении статьи');
    } else {
      throw new Error('Неизвестная ошибка при получении статьи');
    }
  }
};

// Получение блога.
export const getArticlesApi = async (): Promise<TBlog[]> => {
  try {
    const response = await axios.get(`${API_URL}/blog`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Ошибка при получении блога');
    } else {
      throw new Error('Неизвестная ошибка при получении блога');
    }
  }
};

export const postNewUserPlaylist = async (userId: string, playlist: TPlaylist): Promise<{message: string, playlist: TPlaylist}> => {
  try {
    const formData = new FormData();
    formData.append('userId', userId);
    formData.append('name', playlist.name);
    formData.append('info', playlist.information);
    formData.append('image', playlist.image);
    formData.append('userName', playlist.executor);
    formData.append('tracks', JSON.stringify(playlist.tracks));

    const response = await axios.post(`${API_URL}/playlists/create`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Ошибка при добавлении плейлиста');
    } else {
      throw new Error('Неизвестная ошибка при добавлении плейлиста');
    }
  }
};

export const putUpdatePlaylist = async (userId: string, playlist: TPlaylist): Promise<{message: string, playlist: TPlaylist}> => {
  try {
    const formData = new FormData();
    formData.append('userId', userId);
    formData.append('name', playlist.name);
    formData.append('info', playlist.information);
    formData.append('image', playlist.image);
    formData.append('tracks', JSON.stringify(playlist.tracks));
    
    const response = await fetch(`${API_URL}/playlists/create/${playlist._id}`, {
      method: 'PUT',
      body: formData,
    });
    const updatedPlaylist = await response.json();
    return updatedPlaylist;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Ошибка при обновлении плейлиста');
    } else {
      throw new Error('Неизвестная ошибка при обновлении плейлиста');
    }
  }
};

export const deleteUserPlaylist = async (userId: string, playlistId: string) => {
  try {
    const response = await axios.delete(`${API_URL}/playlists/delete/${playlistId}`, {
      data: { userId }
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Ошибка при удалении плейлиста');
    } else {
      throw new Error('Неизвестная ошибка при удалении плейлиста');
    }
  }
}