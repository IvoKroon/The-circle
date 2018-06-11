import React from 'react';
import PropTypes from 'prop-types';
import { Inside, Title, Holder, Container } from './CircleItemStyle';

const CircleItem = ({ title }) => (
  <Holder>
    <Inside>
      <Title>{title}</Title>
    </Inside>
    <Container />
  </Holder>
);

CircleItem.propTypes = {
  title: PropTypes.string.isRequired,
};

export default CircleItem;
