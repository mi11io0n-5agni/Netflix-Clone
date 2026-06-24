import { useEffect, useState } from "react";
import axios from "../../Utils/axios";
import requests from "../../Utils/requests";
import { truncate } from "../../Utils/truncate";
import "./banner.css";

const Banner = () => {
  const [movie, setMovie] = useState({});

  useEffect(() => {
    (async () => {
      try {
        const request = await axios.get(requests.fetchNetflixOriginals);
        console.log( request.data.results);

        const results = request.data.results?.filter(
          (m) => m?.backdrop_path
        );

        if (!results?.length) return;

        const randomMovie =
          results[Math.floor(Math.random() * results.length)];

        setMovie(randomMovie);
      } catch (error) {
        console.log("Error:", error);
      }
    })();
  }, []);

  return (
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
          <button className="banner_button banner_button--play">Play</button>
          <button className="banner_button">My List</button>
        </div>

        <h1 className="banner_description">
          {truncate(movie?.overview, 150)}
        </h1>
      </div>

      <div className="banner_fadeBottom" />
    </header>
  );
};

export default Banner;
