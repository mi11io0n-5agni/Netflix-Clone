import RowList from "../../components/RowsList/RowList";
import "../Movies/browse.css";

const Latest = () => {
  return (
    <div className="browse_page">
      <h1 className="browse_title">Latest & Trending</h1>
      <RowList variant="latest" />
    </div>
  );
};

export default Latest;
