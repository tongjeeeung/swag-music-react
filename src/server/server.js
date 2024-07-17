import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import initializeDatabase from './initializeDatabase.js';
import { Blog, Playlist, Artist, User } from './models.js';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import multer from "multer";

const app = express();
const port = 3000;

// Настройка multer для сохранения файлов
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Папка для сохранения файлов
  },
  filename: (req, file, cb) => {
    cb(null, `${uuidv4()}-${file.originalname}`); // Уникальное имя файла
  },
});

const upload = multer({ storage });

// Middleware для парсинга JSON в теле запроса
app.use(bodyParser.json());

const allowedOrigins = [
  'http://localhost:5173',
  'https://tongjeeeung.github.io/swag-music-react',
  'http://localhost:4173/'
];

// Используем middleware cors
app.use(cors({
  origin: function (origin, callback) {
    // Если origin не указан (например, при запросах с того же домена), разрешаем его
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
}));

// Настройка статической директории
const __dirname = path.resolve();
app.use('/static', express.static(path.join(__dirname, '/static')));

// Эндпоинт для регистрации пользователя
app.post('/user/register', async (req, res) => {
  const { name, email, password, avatar } = req.body;

  try {
    // Проверяем, существует ли пользователь с такой же почтой
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Пользователь с таким email уже существует' });
    }

    // Хэшируем пароль
    const hashedPassword = await bcrypt.hash(password, 10);

    // Генерация токенов
    const accessToken = jwt.sign({ id: uuidv4() }, 'your_jwt_secret_key', { expiresIn: '1h' });
    const refreshToken = jwt.sign({ id: uuidv4() }, 'your_jwt_refresh_secret_key', { expiresIn: '7d' });

    // Создаем нового пользователя
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      avatar,
      accessToken,
      refreshToken,
    });

    // Сохраняем нового пользователя в базе данных
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (error) {
    console.error('Ошибка при регистрации пользователя:', error);
    if (error.name === 'ValidationError') {
      res.status(400).json({ message: 'Ошибка валидации', error: error.errors });
    } else {
      res.status(500).json({ message: 'Ошибка при регистрации пользователя', error });
    }
  }
});

// Эндпоинт для входа пользователя
app.post('/user/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Неверный email или пароль' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Неверный email или пароль' });
    }

    // Генерация accessToken и refreshToken
    const accessToken = jwt.sign({ id: user._id }, 'your_jwt_secret_key', { expiresIn: '1h' });
    const refreshToken = jwt.sign({ id: user._id }, 'your_jwt_refresh_secret_key', { expiresIn: '7d' });

    // Обновление токенов в базе данных
    user.accessToken = accessToken;
    user.refreshToken = refreshToken;
    await user.save();

    res.json({ accessToken, refreshToken });
  } catch (error) {
    res.status(500).json({ message: 'Ошибка при входе пользователя', error });
  }
});

// Эндпоинт для получения информации о пользователе
app.get('/user', async (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Токен не предоставлен' });
  }

  try {
    const decoded = jwt.verify(token, 'your_jwt_secret_key');
    const user = await User.findById(decoded.id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'Пользователь не найден' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Ошибка при получении информации о пользователе', error });
  }
});

// Эндпоинт для получения массива лайкнутых треков
app.get('/user/liked-tracks', async (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Токен не предоставлен' });
  }

  try {
    const decoded = jwt.verify(token, 'your_jwt_secret_key');
    const user = await User.findById(decoded.id).select('likedTracks');

    if (!user) {
      return res.status(404).json({ message: 'Пользователь не найден' });
    }

    res.json({ likedTracks: user.likedTracks });
  } catch (error) {
    res.status(500).json({ message: 'Ошибка при получении лайкнутых треков', error });
  }
});

// Эндпоинт для добавления или удаления лайкнутого трека
app.post('/user/toggle-like-track', async (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  const { trackId } = req.body;

  if (!token) {
    return res.status(401).json({ message: 'Токен не предоставлен' });
  }

  if (!trackId) {
    return res.status(400).json({ message: 'ID трека не предоставлен' });
  }

  try {
    const decoded = jwt.verify(token, 'your_jwt_secret_key');
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(404).json({ message: 'Пользователь не найден' });
    }

    const trackIndex = user.likedTracks.indexOf(trackId);

    if (trackIndex > -1) {
      // Трек уже добавлен, удаляем его
      user.likedTracks.splice(trackIndex, 1);
      await user.save();
      return res.json({ message: 'Трек удален из лайкнутых', likedTracks: user.likedTracks });
    } else {
      // Трек не добавлен, добавляем его
      user.likedTracks.push(trackId);
      await user.save();
      return res.json({ message: 'Трек добавлен в лайкнутые', likedTracks: user.likedTracks });
    }
  } catch (error) {
    res.status(500).json({ message: 'Ошибка при изменении лайкнутого трека', error });
  }
});

// Эндпоинт для получения массива плейлистов пользователя
app.get('/user/playlists', async (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Токен не предоставлен' });
  }

  try {
    const decoded = jwt.verify(token, 'your_jwt_secret_key');
    const user = await User.findById(decoded.id).select('addedPlaylists');

    if (!user) {
      return res.status(404).json({ message: 'Пользователь не найден' });
    }

    res.json({ addedPlaylists: user.addedPlaylists });
  } catch (error) {
    res.status(500).json({ message: 'Ошибка при получении плейлистов пользователя', error });
  }
});

// Эндпоинт для добавления или удаления плейлиста
app.post('/user/toggle-added-playlist', async (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  const { playlistId } = req.body;

  if (!token) {
    return res.status(401).json({ message: 'Токен не предоставлен' });
  }

  if (!playlistId) {
    return res.status(400).json({ message: 'ID плейлиста не предоставлен' });
  }

  try {
    const decoded = jwt.verify(token, 'your_jwt_secret_key');
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(404).json({ message: 'Пользователь не найден' });
    }

    const playlistIndex = user.addedPlaylists.indexOf(playlistId);

    if (playlistIndex > -1) {
      // Плейлист уже добавлен, удаляем его
      user.addedPlaylists.splice(playlistIndex, 1);
      await user.save();
      return res.json({ message: 'Плейлист удален из добавленных', addedPlaylists: user.addedPlaylists });
    } else {
      // Плейлист не добавлен, добавляем его
      user.addedPlaylists.push(playlistId);
      await user.save();
      return res.json({ message: 'Плейлист добавлен в добавленные', addedPlaylists: user.addedPlaylists });
    }
  } catch (error) {
    res.status(500).json({ message: 'Ошибка при изменении добавленного плейлиста', error });
  }
});

// Эндпоинт для изменения имени, аватара и почты пользователя
app.put('/user/update-profile', async (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  const { name, avatar, email } = req.body;

  if (!token) {
    return res.status(401).json({ message: 'Токен не предоставлен' });
  }

  try {
    const decoded = jwt.verify(token, 'your_jwt_secret_key');
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(404).json({ message: 'Пользователь не найден' });
    }

    // Обновляем данные пользователя
    if (name) user.name = name;
    if (avatar) user.avatar = avatar;
    if (email) user.email = email;

    await user.save();

    res.json({ message: 'Профиль обновлен', user });
  } catch (error) {
    res.status(500).json({ message: 'Ошибка при обновлении профиля', error });
  }
});

// Эндпоинт для смены пароля по почте
app.put('/user/change-password', async (req, res) => {
  const { email, newPassword } = req.body;

  if (!email || !newPassword) {
    return res.status(400).json({ message: 'Почта и новый пароль должны быть предоставлены' });
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'Пользователь с такой почтой не найден' });
    }

    // Хэшируем новый пароль
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Обновляем пароль пользователя
    user.password = hashedPassword;
    await user.save();

    res.json({ message: 'Пароль успешно изменен' });
  } catch (error) {
    res.status(500).json({ message: 'Ошибка при смене пароля', error });
  }
});

// Эндпоинт для получения всех пользователей
app.get('/users', async (req, res) => {
  try {
    const users = await User.find().select('-password'); // Исключаем поле пароля из результата
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Ошибка при получении пользователей', error });
  }
});

// Эндпоинт для очистки всех пользователей
app.delete('/users', async (req, res) => {
  try {
    await User.deleteMany({});
    res.json({ message: 'Все пользователи были удалены' });
  } catch (error) {
    res.status(500).json({ message: 'Ошибка при удалении пользователей', error });
  }
});



// Эндпоинт для получения всех артистов
app.get('/artists', async (req, res) => {
  try {
    const artists = await Artist.find();
    res.json(artists);
  } catch (error) {
    res.status(500).json({ message: 'Ошибка при получении артистов', error });
  }
});

//Эндпоинт для получения артиста по ID
app.get('/artists/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const artist = await Artist.findById(id);

    if (!artist) {
      return res.status(404).json({ message: 'Артист не найден' });
    }

    res.json(artist);
  } catch (error) {
    res.status(500).json({ message: 'Ошибка при получении артиста', error });
  }
});

// Эндпоинт получения всех плейлистов
app.get('/playlists', async (req, res) => {
  try {
    const artists = await Artist.find({}, 'playlists'); // Получаем только поле playlists у всех артистов
    const artistPlaylists = artists.reduce((acc, artist) => acc.concat(artist.playlists), []);

    // Получение всех плейлистов пользователей
    const users = await User.find({}, 'addedPlaylists');
    const userPlaylistsIds = users.reduce((acc, user) => acc.concat(user.addedPlaylists), []);

    let userPlaylists = [];
    if (userPlaylistsIds.length > 0) {
      userPlaylists = await Playlist.find({ _id: { $in: userPlaylistsIds } });
    }

    // Объединяем плейлисты артистов с плейлистами пользователей
    const allPlaylists = artistPlaylists.concat(userPlaylists);

    res.json(allPlaylists);
  } catch (error) {
    res.status(500).json({ message: 'Ошибка при получении плейлистов', error });
  }
});


// Эндпоинт для сохранения плейлиста
app.post('/playlists/create', upload.single('image'), async (req, res) => {
  const { userId, name, info, tracks, userName } = req.body;

  if (!userId || !name) {
    return res.status(400).json({ error: 'userId and name are required' });
  }

  try {
    const playlist = {
      _id: uuidv4(),
      name: name,
      executor: userName,
      image: req.file ? `/uploads/${req.file.filename}` : '',
      information: info ? info : ' ',
      tracks: JSON.parse(tracks),
      executorID: userId,
      executorImg: '',
    };

    const newPlaylist = new Playlist(playlist);
    await newPlaylist.save();

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    user.addedPlaylists.push(newPlaylist._id);
    await user.save();

    res.status(201).json({ message: 'Playlist saved successfully', playlist: newPlaylist });
  } catch (error) {
    console.error('Error saving playlist:', error);
    res.status(500).json({ message: 'Error saving playlist', error });
  }
});


// Эндпоинт для обновления плейлиста
app.put('/playlists/create/:id', upload.single('image'), async (req, res) => {
  const { id } = req.params;
  const { userId, name, info, tracks, image } = req.body;
  
  if (!userId || !name) {
    return res.status(400).json({ error: 'userId and name are required' });
  }

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    if (!user.addedPlaylists.includes(id)) {
      return res.status(403).json({ error: 'User does not have permission to update this playlist' });
    }

    const updatedPlaylist = await Playlist.findById(id);

    if (!updatedPlaylist) {
      return res.status(404).json({ error: 'updatedPlaylist not found' });
    }

    updatedPlaylist.name = name;
    updatedPlaylist.image = req.file ? `/uploads/${req.file.filename}` : image;
    updatedPlaylist.information = info ? info : ' ';
    updatedPlaylist.tracks = JSON.parse(tracks);

    await updatedPlaylist.save();

    if (!updatedPlaylist) {
      return res.status(404).json({ error: 'Playlist not found' });
    }

    res.json({ message: 'Playlist updated successfully', playlist: updatedPlaylist });
  } catch (error) {
    console.error('Error updating playlist:', error); // Логирование ошибки
    res.status(500).json({ message: 'Error updating playlist', error });
  }
});


//эндпоинт удаления плейлиста
app.delete('/playlists/delete/:id', async (req, res) => {
  const playlistId = req.params.id;
  const { userId } = req.body;

  if (!userId) {
    return res.status(400).json({ error: 'userId is required' });
  }

  try {
    // Проверка, что плейлист принадлежит пользователю
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    if (!user.addedPlaylists.includes(playlistId)) {
      return res.status(403).json({ error: 'User does not have permission to delete this playlist' });
    }

    // Удаление плейлиста из коллекции Playlist
    const deletedPlaylist = await Playlist.findByIdAndDelete(playlistId);

    if (!deletedPlaylist) {
      return res.status(404).json({ error: 'Playlist not found' });
    }

    // Удаление идентификатора плейлиста из массива addedPlaylists у пользователя
    user.addedPlaylists = user.addedPlaylists.filter(id => id.toString() !== playlistId);
    await user.save();

    res.json({ message: 'Playlist deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting playlist', error });
  }
});

//поиск плей листа по id
app.get('/playlists/:id', async (req, res) => {
  const playlistId = req.params.id;

  try {
    // Ищем артиста, у которого есть плейлист с переданным ID
    const artist = await Artist.findOne({ 'playlists._id': playlistId }, { 'playlists.$': 1 });

    if (artist) {
      // Плейлист будет в массиве artist.playlists
      const playlist = artist.playlists[0];
      return res.json(playlist);
    }

    // Если плейлист не найден у артиста, ищем среди пользовательских плейлистов
    const userPlaylist = await Playlist.findById(playlistId);

    if (userPlaylist) {
      return res.json(userPlaylist);
    }

    // Если плейлист не найден ни у артиста, ни у пользователя
    return res.status(404).json({ message: 'Плейлист не найден' });
  } catch (error) {
    res.status(500).json({ message: 'Ошибка при получении плейлиста', error });
  }
});

// Эндпоинт получения плейлистов юзера
app.post('/playlists/by-ids', async (req, res) => {
  const { ids } = req.body;

  if (!ids || !Array.isArray(ids)) {
    return res.status(400).json({ message: 'Массив идентификаторов не указан или имеет неверный формат' });
  }

  try {
    // Ищем плейлисты среди плейлистов артистов
    const artists = await Artist.find({ 'playlists._id': { $in: ids } }, 'playlists');
    const artistPlaylists = artists.reduce((acc, artist) => {
      const filteredPlaylists = artist.playlists.filter(playlist => ids.includes(playlist._id));
      return acc.concat(filteredPlaylists);
    }, []);

    // Ищем плейлисты среди пользовательских плейлистов
    const userPlaylists = await Playlist.find({ _id: { $in: ids } });

    // Объединяем плейлисты артистов и пользовательские плейлисты
    const allPlaylists = artistPlaylists.concat(userPlaylists);

    res.json(allPlaylists);
  } catch (error) {
    res.status(500).json({ message: 'Ошибка при получении плейлистов', error });
  }
});

// Эндпоинт поиска трека по ID во всех плейлистах
app.get('/search-track', async (req, res) => {
  const { trackId } = req.query;

  if (!trackId) {
    return res.status(400).json({ message: 'Необходимо указать ID трека для поиска' });
  }

  try {
    const artist = await Artist.findOneAndUpdate(
      { 'playlists.tracks._id': trackId },
      { $inc: { 'playlists.$[].tracks.$[track].auditions': 1 } },
      { arrayFilters: [{ 'track._id': trackId }], new: true }
    );

    if (!artist) {
      return res.status(404).json({ message: 'Трек не найден' });
    }

    const artists = await Artist.find({}, 'playlists'); // Получаем только поле playlists у всех артистов
    const playlists = artists.reduce((acc, artist) => acc.concat(artist.playlists), []); // Получаем все плейлисты
    let foundTrack = null;
    let foundPlaylist = null;

    for (const playlist of playlists) {
      const track = playlist.tracks.find(t => t._id === trackId);
      if (track) {
        foundTrack = track;
        foundPlaylist = playlist;
        break;
      }
    }

    if (foundTrack && foundPlaylist) {
      res.json({ track: foundTrack, playlist: foundPlaylist });
    } else {
      res.status(404).json({ message: 'Трек не найден' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Ошибка при поиске трека', error });
  }
});

app.get('/popular', async (req, res) => {
  try {
    // Получаем всех артистов с их плейлистами
    const artists = await Artist.find({}, 'playlists').populate('playlists.tracks');

    // Извлекаем все плейлисты
    const playlists = artists.reduce((acc, artist) => acc.concat(artist.playlists), []);

    // Извлекаем все треки из плейлистов и создаем карту треков с их прослушиваниями
    const trackMap = new Map();
    playlists.forEach(playlist => {
      playlist.tracks.forEach(track => {
        if (trackMap.has(track._id.toString())) {
          trackMap.get(track._id.toString()).auditions += track.auditions;
        } else {
          trackMap.set(track._id.toString(), { ...track.toObject() });
        }
      });
    });

    // Преобразуем Map в массив и сортируем по количеству прослушиваний
    const tracks = Array.from(trackMap.values()).sort((a, b) => b.auditions - a.auditions);

    // Выбираем топ-7 треков
    const topTracks = tracks.slice(0, 7);

    // Ищем плейлисты, содержащие первые три популярных трека
    const topTrackIds = topTracks.slice(0, 3).map(track => track._id.toString());

    const popularPlaylists = [];
    const addedPlaylists = new Set();

    for (const trackId of topTrackIds) {
      for (const playlist of playlists) {
        if (playlist.tracks.some(track => track._id.toString() === trackId) && !addedPlaylists.has(playlist._id.toString())) {
          popularPlaylists.push(playlist);
          addedPlaylists.add(playlist._id.toString());
          break; // Переходим к следующему треку
        }
      }
    }

    // Если у нас меньше трех уникальных плейлистов, повторяем уже добавленные плейлисты
    while (popularPlaylists.length < 3) {
      popularPlaylists.push(...popularPlaylists.slice(0, 3 - popularPlaylists.length));
    }

    res.json({
      topTracks,
      popularPlaylists
    });
  } catch (error) {
    res.status(500).json({ message: 'Ошибка при получении популярных треков и плейлистов', error });
  }
});

// Эндпоинт для получения всех блогов
app.get('/blog', async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get('/blog/:id', async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ message: 'Блог не найден' });
    }
    res.json(blog);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Эндпоинт для очистки всех блогов
app.delete('/blog/clear', async (req, res) => {
  try {
    await Blog.deleteMany({});
    res.status(200).json({ message: 'Все блоги успешно удалены' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Подключение к базе данных и запуск сервера
mongoose.connect('mongodb://localhost:27017/musicapp')
  .then(() => {
    console.log('Подключено к базе данных');
    initializeDatabase();
    app.listen(port, () => {
      console.log(`Сервер запущен на http://localhost:${port}`);
    });
  })
  .catch(error => {
    console.error('Ошибка подключения к базе данных:', error);
  });