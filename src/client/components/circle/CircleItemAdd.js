import React from 'react';
import PropTypes from 'prop-types';
import { Inside, Title, Holder, Container } from './CircleItemStyle';

const CircleItem = ({ title, onClick }) => (
  <Holder onClick={onClick}>
    <Inside>
      <Title>{title}</Title>
    </Inside>
    <Container />
  </Holder>
);

CircleItem.propTypes = {
  title: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};

CircleItem.defaultProps = {
  onClick: () => {},
};

export default CircleItem;
