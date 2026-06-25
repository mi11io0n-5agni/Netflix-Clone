import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import YouTube from "react-youtube";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import AddIcon from "@mui/icons-material/Add";
import CheckIcon from "@mui/icons-material/Check";
import axios from "../../Utils/axios";
import requests from "../../Utils/requests";
import { getTrailerVideoId } from "../../Utils/trailer";
import { truncate } from "../../Utils/truncate";
import { getMovieTitle, useMyList } from "../../context/MyListContext";
import { useWatchHistory } from "../../context/WatchHistoryContext";
import Row from "../../components/Rows/Rows";
import "./detail.css";

const YOUTUBE_OPTS = {
  height: "480",
  width: "100%",
  playerVars: { autoplay: 1 },
};

const Detail = () => {
  const { mediaType, id } = useParams();
  const [details, setDetails] = useState(null);
  const [credits, setCredits] = useState(null);
  const [similar, setSimilar] = useState([]);
  const [loading, setLoading] = useState(true);
  const [trailerUrl, setTrailerUrl] = useState("");
  const { isInList, toggleMyList } = useMyList();
  const { addToHistory } = useWatchHistory();

  const type = mediaType === "tv" ? "tv" : "movie";
  const saved = details ? isInList(details, type) : false;

  useEffect(() => {
    window.scrollTo(0, 0);
    setLoading(true);

    (async () => {
      try {
        const detailsUrl =
          type === "tv"
            ? requests.fetchTvDetails(id)
            : requests.fetchMovieDetails(id);
        const creditsUrl =
          type === "tv"
            ? requests.fetchTvCredits(id)
            : requests.fetchMovieCredits(id);
        const similarUrl =
          type === "tv"
            ? requests.fetchSimilarTv(id)
            : requests.fetchSimilarMovies(id);

        const [detailsRes, creditsRes, similarRes] = await Promise.all([
          axios.get(detailsUrl),
          axios.get(creditsUrl),
          axios.get(similarUrl),
        ]);

        setDetails({ ...detailsRes.data, media_type: type });
        setCredits(creditsRes.data);
        setSimilar(similarRes.data.results?.slice(0, 12) || []);
      } catch {
        setDetails(null);
      } finally {
        setLoading(false);
      }
    })();
  }, [id, type]);

  const handlePlay = async () => {
    if (!details) return;
    addToHistory(details, type);
    const videoId = await getTrailerVideoId(details);
    if (videoId) setTrailerUrl(videoId);
  };

  if (loading) {
    return <div className="detail_loading">Loading...</div>;
  }

  if (!details) {
    return (
      <div className="detail_error">
        <p>Title not found.</p>
        <Link to="/">Back to Home</Link>
      </div>
    );
  }

  const backdrop = details.backdrop_path || details.poster_path;
  const cast = credits?.cast?.slice(0, 6).map((c) => c.name).join(", ");
  const year = (details.release_date || details.first_air_date || "").slice(0, 4);

  return (
    <div className="detail_page">
      <div
        className="detail_hero"
        style={{
          backgroundImage: backdrop
            ? `linear-gradient(to top, #111 10%, transparent 60%), url(https://image.tmdb.org/t/p/original${backdrop})`
            : "none",
        }}
      >
        <div className="detail_hero_content">
          <h1 className="detail_title">{getMovieTitle(details)}</h1>
          <div className="detail_meta">
            {details.vote_average > 0 && (
              <span className="detail_match">
                {Math.round(details.vote_average * 10)}% Match
              </span>
            )}
            {year && <span>{year}</span>}
            <span>{type === "tv" ? "TV Series" : "Movie"}</span>
          </div>
          <p className="detail_overview">{truncate(details.overview, 280)}</p>
          {cast && <p className="detail_cast">Cast: {cast}</p>}

          <div className="detail_actions">
            <button type="button" className="detail_play" onClick={handlePlay}>
              <PlayArrowIcon /> Play Trailer
            </button>
            <button
              type="button"
              className={`detail_list_btn ${saved ? "detail_list_btn--saved" : ""}`}
              onClick={() => toggleMyList(details, type)}
            >
              {saved ? <CheckIcon /> : <AddIcon />}
              {saved ? "In My List" : "My List"}
            </button>
          </div>
        </div>
      </div>

      {trailerUrl && (
        <div className="detail_trailer">
          <YouTube videoId={trailerUrl} opts={YOUTUBE_OPTS} />
        </div>
      )}

      {similar.length > 0 && (
        <div className="detail_similar">
          <Row
            title="More Like This"
            movies={similar.map((item) => ({ ...item, media_type: type }))}
            mediaType={type}
          />
        </div>
      )}
    </div>
  );
};

export default Detail;
