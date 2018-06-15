import React from 'react';
import PropTypes from 'prop-types';

const ClosedArrowIcon = ({ Left }) => (
  <svg
    transform={`rotate(${Left ? '0' : '180'})`}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="171 76 5.5 11"
    width="10"
    height="10"
  >
    <g transform="translate(-230 -684)">
      <path
        d="M880.363,847.832l-5.5,5.5,5.5,5.5Z"
        transform="translate(1281.363 1618.832) rotate(180)"
      />
    </g>
  </svg>
);

ClosedArrowIcon.propTypes = {
  Left: PropTypes.bool,
};

ClosedArrowIcon.defaultProps = {
  Left: false,
};

export default ClosedArrowIcon;
