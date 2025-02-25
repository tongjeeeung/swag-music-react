import {
  AppMusic,
  ArticlePage,
  BlogPage,
  ExecutorPage,
  ForgotPage,
  InformationPage,
  LoginPage,
  NotFound404,
  PlaylistPage,
  ProfilePage,
  RegistrationPage,
} from "../../pages";
import { AppHeader } from "../app-header";
import { Footer } from "../footer";
import { Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import { getAllPlaylistsThunk } from "../../services/playlistsSlice";
import { useDispatch, useSelector } from "../../services/store";
import { useEffect } from "react";
import { getUser, getUserInfoThunk } from "../../services/userSlice";
import {
  getCurrentThunk,
  getState,
  trueCookie,
} from "../../services/currentSlice";
import { Controler } from "../controler";
import { PlaylistsPage } from "../../pages/playlists";
import { getArticlesThunk } from "../../services/blogSlice";
import { deleteCookie, getCookie } from "../../utils/cookie";
import { getArtistsThunk } from "../../services/executorSlice";
import { ProtectedRoute } from "../protectedRoute";
import { CreatePlaylist } from "../create-playlist";
import { CangePlaylist } from "../change-playlist";
import { Cookie } from "../cookie";

function App() {
  const dispatch = useDispatch();
  const location = useLocation();
  const user = useSelector(getUser);
  const state = useSelector(getState);

  useEffect(() => {
    const current = localStorage.getItem("current");

    if (current) {
      dispatch(trueCookie());
    }
  }, [0]);

  useEffect(() => {
    const toket = getCookie("accessToken");

    if (toket) {
      dispatch(getUserInfoThunk());
    } else {
      deleteCookie("accessToken");
    }

    dispatch(getArtistsThunk());
    dispatch(getAllPlaylistsThunk());
    dispatch(getCurrentThunk());
    dispatch(getArticlesThunk());
  }, [user?.accessToken]);

  return (
    <>
      <AppHeader></AppHeader>
      <Routes location={location}>
        <Route path="*" element={<NotFound404></NotFound404>}></Route>
        <Route
          path="/swag-music-react/home"
          element={<AppMusic></AppMusic>}
        ></Route>
        <Route
          path="/swag-music-react/playlists"
          element={<PlaylistsPage></PlaylistsPage>}
        ></Route>
        <Route
          path="/swag-music-react/playlists/:id"
          element={<PlaylistPage />}
        ></Route>
        <Route
          path="/swag-music-react/blog"
          element={<BlogPage></BlogPage>}
        ></Route>
        <Route
          path="/swag-music-react/information"
          element={<InformationPage></InformationPage>}
        ></Route>
        <Route
          path="/swag-music-react/blog/:id"
          element={<ArticlePage></ArticlePage>}
        ></Route>
        <Route
          path="/swag-music-react/executor/:id"
          element={<ExecutorPage></ExecutorPage>}
        ></Route>
        <Route
          path="/swag-music-react/login"
          element={
            <ProtectedRoute onlyUnAuth>
              <LoginPage></LoginPage>
            </ProtectedRoute>
          }
        ></Route>
        <Route
          path="/swag-music-react/registration"
          element={
            <ProtectedRoute onlyUnAuth>
              <RegistrationPage></RegistrationPage>
            </ProtectedRoute>
          }
        ></Route>
        <Route
          path="/swag-music-react/forgot"
          element={
            <ProtectedRoute onlyUnAuth>
              <ForgotPage></ForgotPage>
            </ProtectedRoute>
          }
        ></Route>
        <Route
          path="/swag-music-react/profile"
          element={
            <ProtectedRoute>
              <ProfilePage></ProfilePage>
            </ProtectedRoute>
          }
        ></Route>
        <Route
          path="/swag-music-react/playlists/create/new-playlist"
          element={
            <ProtectedRoute>
              <CreatePlaylist></CreatePlaylist>
            </ProtectedRoute>
          }
        ></Route>
        <Route
          path="/swag-music-react/playlists/update/:id"
          element={
            <ProtectedRoute>
              <CangePlaylist></CangePlaylist>
            </ProtectedRoute>
          }
        ></Route>
      </Routes>
      <Controler></Controler>
      <Cookie isCookie={state.isCookie}></Cookie>
      <Footer></Footer>
    </>
  );
}

export default App;
