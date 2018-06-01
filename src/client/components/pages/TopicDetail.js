import React from 'react';
import PropTypes from 'prop-types';

const TopicsDetail = ({ match }) => <div>TOPICS : {match.params.id} </div>;
TopicsDetail.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default TopicsDetail;
