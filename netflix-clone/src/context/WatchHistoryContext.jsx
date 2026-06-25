import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext";
import {
  getMediaType,
  getMovieKey,
  getMovieTitle,
} from "./MyListContext";

const WatchHistoryContext = createContext(null);

const getStorageKey = (userId) => `netflix_watch_history_${userId}`;

export const WatchHistoryProvider = ({ children }) => {
  const { user } = useAuth();
  const [history, setHistory] = useState([]);

  useEffect(() => {
    if (!user) {
      setHistory([]);
      return;
    }

    try {
      const saved = localStorage.getItem(getStorageKey(user.id));
      setHistory(saved ? JSON.parse(saved) : []);
    } catch {
      setHistory([]);
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      localStorage.setItem(getStorageKey(user.id), JSON.stringify(history));
    }
  }, [history, user]);

  const addToHistory = (movie, fallbackMediaType = "movie") => {
    if (!user || !movie?.id) return;

    const entry = {
      id: movie.id,
      title: getMovieTitle(movie),
      poster_path: movie.poster_path,
      backdrop_path: movie.backdrop_path,
      media_type: getMediaType(movie, fallbackMediaType),
      watchedAt: Date.now(),
    };

    setHistory((prev) => {
      const key = getMovieKey(entry);
      const filtered = prev.filter((item) => getMovieKey(item) !== key);
      return [entry, ...filtered].slice(0, 12);
    });
  };

  return (
    <WatchHistoryContext.Provider value={{ history, addToHistory }}>
      {children}
    </WatchHistoryContext.Provider>
  );
};

export const useWatchHistory = () => {
  const context = useContext(WatchHistoryContext);
  if (!context) {
    throw new Error("useWatchHistory must be used within WatchHistoryProvider");
  }
  return context;
};
