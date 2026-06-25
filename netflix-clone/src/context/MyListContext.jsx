import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext";

const MyListContext = createContext(null);

export const getMovieTitle = (movie) =>
  movie?.title || movie?.name || movie?.original_name || "Untitled";

export const getMediaType = (movie, fallback = "movie") =>
  movie?.media_type || fallback;

export const getMovieKey = (movie, fallbackMediaType = "movie") =>
  `${getMediaType(movie, fallbackMediaType)}-${movie.id}`;

const getStorageKey = (userId) => `netflix_my_list_${userId}`;

export const MyListProvider = ({ children }) => {
  const { user } = useAuth();
  const [myList, setMyList] = useState([]);

  useEffect(() => {
    if (!user) {
      setMyList([]);
      return;
    }

    try {
      const saved = localStorage.getItem(getStorageKey(user.id));
      setMyList(saved ? JSON.parse(saved) : []);
    } catch {
      setMyList([]);
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      localStorage.setItem(getStorageKey(user.id), JSON.stringify(myList));
    }
  }, [myList, user]);

  const isInList = (movie, fallbackMediaType = "movie") =>
    myList.some(
      (item) => getMovieKey(item) === getMovieKey(movie, fallbackMediaType)
    );

  const toggleMyList = (movie, fallbackMediaType = "movie") => {
    if (!user) return;

    const key = getMovieKey(movie, fallbackMediaType);

    setMyList((prev) => {
      if (prev.some((item) => getMovieKey(item) === key)) {
        return prev.filter((item) => getMovieKey(item) !== key);
      }

      return [
        ...prev,
        {
          id: movie.id,
          title: getMovieTitle(movie),
          poster_path: movie.poster_path,
          backdrop_path: movie.backdrop_path,
          media_type: getMediaType(movie, fallbackMediaType),
        },
      ];
    });
  };

  return (
    <MyListContext.Provider value={{ myList, isInList, toggleMyList }}>
      {children}
    </MyListContext.Provider>
  );
};

export const useMyList = () => {
  const context = useContext(MyListContext);
  if (!context) {
    throw new Error("useMyList must be used within MyListProvider");
  }
  return context;
};
