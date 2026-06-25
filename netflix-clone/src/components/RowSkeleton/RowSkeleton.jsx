import "./rowskeleton.css";

const RowSkeleton = ({ isLargeRow = false }) => {
  return (
    <div className="row_skeleton">
      <div className="row_skeleton_title" />
      <div className="row_skeleton_posters">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className={`row_skeleton_poster ${isLargeRow ? "row_skeleton_poster--large" : ""}`}
          />
        ))}
      </div>
    </div>
  );
};

export default RowSkeleton;
