import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

const trackSchema = new mongoose.Schema({
  name: { type: String, required: true },
  duration: { type: String, required: true },
  url: { type: String, required: true },
  image: { type: String, default: "/static/images/default_track_image.jpg" },
  isLike: { type: Boolean, default: false },
  auditions: { type: Number, default: 0 },
  albumId: { type: String, default: () => uuidv4() },
  albumName: { type: String, required: true },
  executor: { type: String, required: true },
  executorID: { type: String, required: true }, // Добавлено поле executorID
  _id: { type: String, default: () => uuidv4() },
});

const Track = mongoose.model("Track", trackSchema);

const playlistSchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String, required: true },
  information: { type: String, required: true },
  tracks: { type: [trackSchema], default: [], required: true },
  executor: { type: String, required: true },
  executorID: { type: String, required: true }, // Добавлено поле executorID
  _id: { type: String, default: () => uuidv4() },
});

const Playlist = mongoose.model("Playlist", playlistSchema);

const artistSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  image: { type: String, required: true },
  about: { type: String, required: true },
  playlists: { type: [playlistSchema], default: [], required: true },
  _id: { type: String, default: () => uuidv4() },
  allAuditions: { type: Number, default: 0 },
});

const Artist = mongoose.model("Artist", artistSchema);

// Схема пользователя
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  _id: { type: String, default: () => uuidv4() },
  avatar: { type: String, required: true },
  addedPlaylists: { type: [String], default: [], required: true }, // Обновлено для хранения списка _id плейлистов
  likedPlaylist: {
    type: playlistSchema,
    default: {
      name: "Liked Songs",
      executor: "none",
      _id: "likedSongs",
      information: "Your liked songs.",
      image: "/swag-music-react/static/images/default/avatar.jpg",
      tracks: [],
      executorID: "none",
    },
    required: true,
  },
  likedTracks: { type: [String], default: [], required: true },
  password: { type: String, required: true },
  accessToken: { type: String, default: () => uuidv4() },
  refreshToken: { type: String, default: () => uuidv4() },
});

const User = mongoose.model("User", userSchema);

// Схема для статьи блога
const blogSchema = new mongoose.Schema({
  _id: { type: String, default: () => uuidv4() },
  name: { type: String, required: true },
  title: { type: String, required: true },
  subtitle: { type: String },
  image: { type: String, required: true },
  image_2: { type: String },
});

const Blog = mongoose.model("Blog", blogSchema);

export { Track, Playlist, Artist, User, Blog };
