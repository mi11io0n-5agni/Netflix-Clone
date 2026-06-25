import { useNavigate } from "react-router-dom";
import YouTube from "react-youtube";
import AddIcon from "@mui/icons-material/Add";
import CheckIcon from "@mui/icons-material/Check";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { useEffect, useRef, useState } from "react";
import axios from "../../Utils/axios";
import { getTrailerVideoId } from "../../Utils/trailer";
import { truncate } from "../../Utils/truncate";
import { getMovieTitle, useMyList } from "../../context/MyListContext";
import { useWatchHistory } from "../../context/WatchHistoryContext";
import RowSkeleton from "../RowSkeleton/RowSkeleton";
import "./rows.css";

const YOUTUBE_OPTS = {
  height: "390",
  width: "100%",
  playerVars: { autoplay: 1 },
};

const Row = ({
  title,
  fetchUrl,
  isLargeRow,
  mediaType = "movie",
  movies: presetMovies,
}) => {
  const [movies, setMovies] = useState(presetMovies || []);
  const [loading, setLoading] = useState(!presetMovies);
  const [trailerUrl, setTrailerUrl] = useState("");
  const [hoveredKey, setHoveredKey] = useState(null);
  const scrollRef = useRef(null);
  const { isInList, toggleMyList } = useMyList();
  const { addToHistory } = useWatchHistory();
  const navigate = useNavigate();

  const baseUrl = "https://image.tmdb.org/t/p/original/";

  useEffect(() => {
    if (presetMovies) {
      setMovies(presetMovies);
      setLoading(false);
      return;
    }

    setLoading(true);
    (async () => {
      try {
        const { data } = await axios.get(fetchUrl);
        setMovies(data.results || []);
      } catch {
        setMovies([]);
      } finally {
        setLoading(false);
      }
    })();
  }, [fetchUrl, presetMovies]);

  const scrollRow = (direction) => {
    if (!scrollRef.current) return;
    const amount = scrollRef.current.clientWidth * 0.75;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  const playTrailer = async (movie, type) => {
    addToHistory(movie, type);
    const videoId = await getTrailerVideoId(movie);
    if (videoId) setTrailerUrl(videoId);
  };

  const goToDetail = (movie, type) => {
    navigate(`/detail/${type}/${movie.id}`);
  };

  const handleToggleList = (event, movie, type) => {
    event.stopPropagation();
    toggleMyList(movie, type);
  };

  if (loading) {
    return <RowSkeleton isLargeRow={isLargeRow} />;
  }

  if (!movies.length) return null;

  return (
    <div className="row">
      <h2>{title}</h2>
      <div className="row_container">
        <button
          type="button"
          className="row_arrow row_arrow--left"
          aria-label="Scroll left"
          onClick={() => scrollRow("left")}
        >
          <ChevronLeftIcon fontSize="large" />
        </button>

        <div className="row_posters" ref={scrollRef}>
          {movies.map((movie) => {
            const type = movie.media_type || mediaType;
            const key = `${type}-${movie.id}`;
            const saved = isInList(movie, type);
            const isHovered = hoveredKey === key;
            const imagePath = isLargeRow
              ? movie.poster_path
              : movie.backdrop_path || movie.poster_path;

            if (!imagePath) return null;

            return (
              <div
                key={key}
                className={`row_poster_wrapper ${isHovered ? "row_poster_wrapper--hovered" : ""}`}
                onMouseEnter={() => setHoveredKey(key)}
                onMouseLeave={() => setHoveredKey(null)}
                onClick={() => goToDetail(movie, type)}
              >
                <img
                  src={`${baseUrl}${imagePath}`}
                  alt={getMovieTitle(movie)}
                  className={`row_poster ${isLargeRow ? "row_posterLarge" : ""}`}
                />

                {isHovered && (
                  <div className="row_hover_card">
                    <p className="row_hover_title">{getMovieTitle(movie)}</p>
                    <div className="row_hover_meta">
                      {movie.vote_average > 0 && (
                        <span className="row_hover_rating">
                          {Math.round(movie.vote_average * 10)}% Match
                        </span>
                      )}
                      <span>{type === "tv" ? "TV Series" : "Movie"}</span>
                    </div>
                    <p className="row_hover_desc">
                      {truncate(movie.overview, 100)}
                    </p>
                    <div className="row_hover_actions">
                      <button
                        type="button"
                        className="row_hover_play"
                        onClick={(e) => {
                          e.stopPropagation();
                          playTrailer(movie, type);
                        }}
                      >
                        <PlayArrowIcon /> Play
                      </button>
                      <button
                        type="button"
                        className={`row_add_btn row_add_btn--visible ${saved ? "row_add_btn--saved" : ""}`}
                        aria-label={
                          saved ? "Remove from My List" : "Add to My List"
                        }
                        onClick={(e) => handleToggleList(e, movie, type)}
                      >
                        {saved ? (
                          <CheckIcon fontSize="small" />
                        ) : (
                          <AddIcon fontSize="small" />
                        )}
                      </button>
                    </div>
                  </div>
                )}

                {!isHovered && (
                  <button
                    type="button"
                    className={`row_add_btn ${saved ? "row_add_btn--saved" : ""}`}
                    aria-label={
                      saved ? "Remove from My List" : "Add to My List"
                    }
                    onClick={(e) => handleToggleList(e, movie, type)}
                  >
                    {saved ? (
                      <CheckIcon fontSize="small" />
                    ) : (
                      <AddIcon fontSize="small" />
                    )}
                  </button>
                )}
              </div>
            );
          })}
        </div>

        <button
          type="button"
          className="row_arrow row_arrow--right"
          aria-label="Scroll right"
          onClick={() => scrollRow("right")}
        >
          <ChevronRightIcon fontSize="large" />
        </button>
      </div>

      {trailerUrl && (
        <div className="row_trailer">
          <YouTube videoId={trailerUrl} opts={YOUTUBE_OPTS} />
        </div>
      )}
    </div>
  );
};

export default Row;
