import axions from "axios";
const instance = axions.create({
  baseURL: "https://api.themoviedb.org/3",
});
export default instance;