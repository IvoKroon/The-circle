import React from 'react';
import PropTypes from 'prop-types';
import styled from 'react-emotion';

const Holder = styled('div')`
  display: flex;
  justify-content: space-between;
`;

const CircleHolder = ({ children }) => <Holder>{children}</Holder>;

CircleHolder.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
};

export default CircleHolder;
