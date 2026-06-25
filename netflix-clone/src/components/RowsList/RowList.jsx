import Row from "../Rows/Rows";
import requests from "../../Utils/requests";
import { useWatchHistory } from "../../context/WatchHistoryContext";

const RowList = ({ variant = "home" }) => {
  const { history } = useWatchHistory();

  if (variant === "movies") {
    return (
      <>
        <Row title="Top Rated Movies" fetchUrl={requests.fetchTopRated} />
        <Row title="Action Movies" fetchUrl={requests.fetchActionMovies} />
        <Row title="Comedy Movies" fetchUrl={requests.fetchComedyMovies} />
        <Row title="Horror Movies" fetchUrl={requests.fetchHorrorMovies} />
        <Row title="Romance Movies" fetchUrl={requests.fetchRomanceMovies} />
        <Row title="Documentaries" fetchUrl={requests.fetchDocumentaries} />
      </>
    );
  }

  if (variant === "tv") {
    return (
      <>
        <Row
          title="Netflix Originals"
          fetchUrl={requests.fetchNetflixOriginals}
          isLargeRow
          mediaType="tv"
        />
        <Row title="Popular TV Shows" fetchUrl={requests.fetchPopularTv} mediaType="tv" />
        <Row title="TV Shows" fetchUrl={requests.fetchTvshows} mediaType="tv" />
      </>
    );
  }

  if (variant === "latest") {
    return (
      <>
        <Row title="Trending Now" fetchUrl={requests.fetchTrending} mediaType="movie" />
        <Row title="Now Playing" fetchUrl={requests.fetchLatestMovies} />
        <Row title="Coming Soon" fetchUrl={requests.fetchUpcoming} />
      </>
    );
  }

  return (
    <>
      {history.length > 0 && (
        <Row title="Continue Watching" movies={history} mediaType="movie" />
      )}
      <Row
        title="NETFLIX ORIGINALS"
        fetchUrl={requests.fetchNetflixOriginals}
        isLargeRow
        mediaType="tv"
      />
      <Row title="Trending Now" fetchUrl={requests.fetchTrending} mediaType="movie" />
      <Row title="Top Rated" fetchUrl={requests.fetchTopRated} />
      <Row title="Action Movies" fetchUrl={requests.fetchActionMovies} />
      <Row title="Comedy Movies" fetchUrl={requests.fetchComedyMovies} />
      <Row title="Horror Movies" fetchUrl={requests.fetchHorrorMovies} />
      <Row title="Romance Movies" fetchUrl={requests.fetchRomanceMovies} />
      <Row title="Documentaries" fetchUrl={requests.fetchDocumentaries} />
    </>
  );
};

export default RowList;
