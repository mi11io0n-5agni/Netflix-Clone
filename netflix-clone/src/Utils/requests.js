const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const requests = {
  fetchTrending: `/trending/all/week?api_key=${API_KEY}&language=en-US`,
  fetchNetflixOriginals: `/discover/tv?api_key=${API_KEY}&with_networks=213`,
  fetchTopRated: `/movie/top_rated?api_key=${API_KEY}&language=en-US`,
  fetchActionMovies: `/discover/movie?api_key=${API_KEY}&with_genres=28`,
  fetchComedyMovies: `/discover/movie?api_key=${API_KEY}&with_genres=35`,
  fetchHorrorMovies: `/discover/movie?api_key=${API_KEY}&with_genres=27`,
  fetchRomanceMovies: `/discover/movie?api_key=${API_KEY}&with_genres=10749`,
  fetchDocumentaries: `/discover/movie?api_key=${API_KEY}&with_genres=99`,
  fetchTvshows: `/discover/tv?api_key=${API_KEY}&with_genres=10770`,
  fetchPopularTv: `/tv/popular?api_key=${API_KEY}&language=en-US`,
  fetchLatestMovies: `/movie/now_playing?api_key=${API_KEY}&language=en-US`,
  fetchUpcoming: `/movie/upcoming?api_key=${API_KEY}&language=en-US`,
  fetchSearch: (query) =>
    `/search/multi?api_key=${API_KEY}&language=en-US&query=${encodeURIComponent(query)}`,
  fetchMovieDetails: (id) =>
    `/movie/${id}?api_key=${API_KEY}&language=en-US`,
  fetchTvDetails: (id) => `/tv/${id}?api_key=${API_KEY}&language=en-US`,
  fetchSimilarMovies: (id) =>
    `/movie/${id}/similar?api_key=${API_KEY}&language=en-US`,
  fetchSimilarTv: (id) =>
    `/tv/${id}/similar?api_key=${API_KEY}&language=en-US`,
  fetchMovieCredits: (id) =>
    `/movie/${id}/credits?api_key=${API_KEY}&language=en-US`,
  fetchTvCredits: (id) =>
    `/tv/${id}/credits?api_key=${API_KEY}&language=en-US`,
};

export default requests;
