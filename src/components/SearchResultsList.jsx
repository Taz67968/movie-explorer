import PropTypes from "prop-types";

export const SetResultList = ({ results }) => {
  return (
    <div className="result-list">
      {results.map((result, id) => {
        return <div key={id}>{result.title}</div>
})}
    </div>
  );
};
SetResultList.propTypes = {
  results: PropTypes.object.isRequired,

};