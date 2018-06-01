import React from 'react';
import PropTypes from 'prop-types';

const Circle = ({ match }) => <div>Circle : {match.params.id} </div>;
Circle.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default Circle;
