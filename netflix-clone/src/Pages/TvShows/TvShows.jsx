import RowList from "../../components/RowsList/RowList";
import "../Movies/browse.css";

const TvShows = () => {
  return (
    <div className="browse_page">
      <h1 className="browse_title">TV Shows</h1>
      <RowList variant="tv" />
    </div>
  );
};

export default TvShows;
