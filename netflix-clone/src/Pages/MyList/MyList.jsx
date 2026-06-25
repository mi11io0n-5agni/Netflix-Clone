import { Link } from "react-router-dom";
import { useMyList, getMovieTitle } from "../../context/MyListContext";
import "./mylist.css";

const BASE_URL = "https://image.tmdb.org/t/p/w500";

const MyList = () => {
  const { myList, toggleMyList } = useMyList();

  return (
    <div className="mylist_page">
      <h1 className="mylist_title">My List</h1>

      {myList.length === 0 ? (
        <p className="mylist_empty">
          Your list is empty. Add movies and shows from the home page or search.
        </p>
      ) : (
        <div className="mylist_grid">
          {myList.map((item) => (
            <Link
              key={`${item.media_type}-${item.id}`}
              to={`/detail/${item.media_type}/${item.id}`}
              className="mylist_item"
            >
              <img
                src={`${BASE_URL}${item.poster_path || item.backdrop_path}`}
                alt={getMovieTitle(item)}
                className="mylist_poster"
              />
              <div className="mylist_overlay">
                <p className="mylist_item_title">{getMovieTitle(item)}</p>
                <button
                  type="button"
                  className="mylist_remove_btn"
                  onClick={(e) => {
                    e.preventDefault();
                    toggleMyList(item, item.media_type);
                  }}
                >
                  Remove
                </button>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyList;
