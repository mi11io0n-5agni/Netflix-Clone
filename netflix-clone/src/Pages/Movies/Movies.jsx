import RowList from "../../components/RowsList/RowList";
import "./browse.css";

const Movies = () => {
  return (
    <div className="browse_page">
      <h1 className="browse_title">Movies</h1>
      <RowList variant="movies" />
    </div>
  );
};

export default Movies;
