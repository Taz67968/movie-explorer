import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

export const SetResultList = ({ results }) => {
  const navigate = useNavigate();

const handleMovieClick = (movie) => {
   navigate(`/Details/${movie.id}`, { state: { movie } });
 };

  return (
    <div className="result-list">
      {results.map((result, id) => {
        return <div key={id} onClick={() => handleMovieClick(result)}>{result.title}</div>
})}
    </div>
  );
};
SetResultList.propTypes = {
  results: PropTypes.object.isRequired,

};