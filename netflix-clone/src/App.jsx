import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { MyListProvider } from "./context/MyListContext";
import { WatchHistoryProvider } from "./context/WatchHistoryContext";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import Layout from "./components/Layout/Layout";
import Home from "./Pages/Home/Home.jsx";
import Movies from "./Pages/Movies/Movies.jsx";
import TvShows from "./Pages/TvShows/TvShows.jsx";
import Latest from "./Pages/Latest/Latest.jsx";
import MyList from "./Pages/MyList/MyList.jsx";
import Detail from "./Pages/Detail/Detail.jsx";
import Login from "./Pages/Login/Login.jsx";
import Signup from "./Pages/Signup/Signup.jsx";

export default function App() {
  return (
    <AuthProvider>
      <MyListProvider>
        <WatchHistoryProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />

              <Route element={<ProtectedRoute />}>
                <Route element={<Layout />}>
                  <Route path="/" element={<Home />} />
                  <Route path="/movies" element={<Movies />} />
                  <Route path="/tv" element={<TvShows />} />
                  <Route path="/latest" element={<Latest />} />
                  <Route path="/my-list" element={<MyList />} />
                  <Route path="/detail/:mediaType/:id" element={<Detail />} />
                </Route>
              </Route>

              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </BrowserRouter>
        </WatchHistoryProvider>
      </MyListProvider>
    </AuthProvider>
  );
}
