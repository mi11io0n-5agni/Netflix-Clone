import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import CheckIcon from "@mui/icons-material/Check";
import axios from "../../Utils/axios";
import requests from "../../Utils/requests";
import { getMovieTitle, useMyList } from "../../context/MyListContext";
import "./searchbar.css";

const BASE_URL = "https://image.tmdb.org/t/p/w92";

const SearchBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const containerRef = useRef(null);
  const { isInList, toggleMyList } = useMyList();
  const navigate = useNavigate();

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const timer = setTimeout(async () => {
      setLoading(true);
      try {
        const { data } = await axios.get(requests.fetchSearch(query.trim()));
        const filtered = (data.results || []).filter(
          (item) =>
            (item.media_type === "movie" || item.media_type === "tv") &&
            item.poster_path
        );
        setResults(filtered.slice(0, 8));
      } catch {
        setResults([]);
      } finally {
        setLoading(false);
      }
    }, 400);

    return () => clearTimeout(timer);
  }, [query]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setIsOpen(false);
        setQuery("");
        setResults([]);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const closeSearch = () => {
    setIsOpen(false);
    setQuery("");
    setResults([]);
  };

  const goToDetail = (item) => {
    navigate(`/detail/${item.media_type}/${item.id}`);
    closeSearch();
  };

  return (
    <div className="search_container" ref={containerRef}>
      <button
        type="button"
        className="search_toggle"
        aria-label="Search"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <SearchIcon />
      </button>

      {isOpen && (
        <div className="search_panel">
          <input
            type="text"
            className="search_input"
            placeholder="Titles, people, genres"
            value={query}
            autoFocus
            onChange={(e) => setQuery(e.target.value)}
          />
          <button
            type="button"
            className="search_close"
            aria-label="Close search"
            onClick={closeSearch}
          >
            <CloseIcon fontSize="small" />
          </button>
        </div>
      )}

      {isOpen && query.trim() && (
        <div className="search_results">
          {loading && <p className="search_message">Searching...</p>}
          {!loading && results.length === 0 && (
            <p className="search_message">No results found.</p>
          )}
          {!loading &&
            results.map((item) => {
              const saved = isInList(item, item.media_type);

              return (
                <div
                  key={`${item.media_type}-${item.id}`}
                  className="search_result"
                  onClick={() => goToDetail(item)}
                >
                  <img
                    src={`${BASE_URL}${item.poster_path}`}
                    alt={getMovieTitle(item)}
                    className="search_result_poster"
                  />
                  <div className="search_result_info">
                    <p className="search_result_title">
                      {getMovieTitle(item)}
                    </p>
                    <p className="search_result_type">
                      {item.media_type === "tv" ? "TV Show" : "Movie"}
                    </p>
                  </div>
                  <button
                    type="button"
                    className={`search_add_btn ${saved ? "search_add_btn--saved" : ""}`}
                    aria-label={
                      saved ? "Remove from My List" : "Add to My List"
                    }
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleMyList(item, item.media_type);
                    }}
                  >
                    {saved ? (
                      <CheckIcon fontSize="small" />
                    ) : (
                      <AddIcon fontSize="small" />
                    )}
                  </button>
                </div>
              );
            })}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
