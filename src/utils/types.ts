export type TArtist = {
  name: string;
  image: string;
  about: string;
  playlists: TPlaylist[];
  _id: string;
}

export type TPlaylist = {
  _id: string;
  name: string;
  executor: string;
  image: string | File;
  information: string;
  tracks: TTrack[];
  executorImg?: string;
  executorID?: string;
}

export type TTrack = {
  _id: string;
  executor: string;
  name: string;
  duration: string;
  image: string;
  url: string;
  isLike: boolean;
  auditions: number;
  albumId: string;
  executorID: string;
}

export type TUser = {
  name: string;
  email: string;
  _id: string;
  avatar: string;
  addedPlaylists: string[];
  likedTracks: string[];
  password: string;
  accessToken: string;
  refreshToken: string;
}

export type TBlog = {
  _id: string;
  name: string;
  title: string;
  subtitle?: string;
  image: string;
  image_2?: string;
}