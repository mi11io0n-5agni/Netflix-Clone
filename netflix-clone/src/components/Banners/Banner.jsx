import { useEffect, useState } from "react";
import YouTube from "react-youtube";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import axios from "../../Utils/axios";
import requests from "../../Utils/requests";
import { getTrailerVideoId } from "../../Utils/trailer";
import { truncate } from "../../Utils/truncate";
import { useMyList } from "../../context/MyListContext";
import { useWatchHistory } from "../../context/WatchHistoryContext";
import "../RowSkeleton/rowskeleton.css";
import "./banner.css";

const YOUTUBE_OPTS = {
  height: "390",
  width: "100%",
  playerVars: { autoplay: 1 },
};

const Banner = () => {
  const [movie, setMovie] = useState({});
  const [loading, setLoading] = useState(true);
  const [trailerUrl, setTrailerUrl] = useState("");
  const { isInList, toggleMyList } = useMyList();
  const { addToHistory } = useWatchHistory();
  const inList = movie?.id ? isInList(movie, "tv") : false;

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(requests.fetchNetflixOriginals);
        const results = data.results?.filter((m) => m?.backdrop_path);

        if (results?.length) {
          setMovie(results[Math.floor(Math.random() * results.length)]);
        }
      } catch {
        setMovie({});
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const handlePlay = async () => {
    if (!movie?.id) return;
    addToHistory(movie, "tv");
    const videoId = await getTrailerVideoId(movie);
    if (videoId) setTrailerUrl(videoId);
  };

  if (loading) {
    return <div className="banner_skeleton" />;
  }

  return (
    <>
      <header
        className="banner"
        style={{
          backgroundImage: movie?.backdrop_path
            ? `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`
            : "none",
        }}
      >
        <div className="banner_contents">
          <h1 className="banner_title">
            {movie?.title || movie?.name || movie?.original_name}
          </h1>

          <div className="banner_buttons">
            <button
              type="button"
              className="banner_button banner_button--play"
              onClick={handlePlay}
            >
              <PlayArrowIcon /> Play
            </button>
            <button
              type="button"
              className={`banner_button ${inList ? "banner_button--active" : ""}`}
              onClick={() => movie?.id && toggleMyList(movie, "tv")}
            >
              {inList ? "✓ My List" : "My List"}
            </button>
          </div>

          <p className="banner_description">
            {truncate(movie?.overview, 150)}
          </p>
        </div>

        <div className="banner_fadeBottom" />
      </header>

      {trailerUrl && (
        <div className="banner_trailer">
          <YouTube videoId={trailerUrl} opts={YOUTUBE_OPTS} />
        </div>
      )}
    </>
  );
};

export default Banner;
