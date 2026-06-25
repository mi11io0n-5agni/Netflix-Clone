import movieTrailer from "movie-trailer";
import { getMovieTitle } from "../context/MyListContext";

export const getTrailerVideoId = async (movie) => {
  try {
    const url = await movieTrailer(getMovieTitle(movie));
    const urlParams = new URLSearchParams(new URL(url).search);
    return urlParams.get("v");
  } catch {
    return null;
  }
};
