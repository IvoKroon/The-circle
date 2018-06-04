import React from 'react';
import PropTypes from 'prop-types';
import { Title, Inside, Holder, Container } from './CircleItemStyle';

const CircleItem = ({ imageSrc, circleName }) => (
  <Holder>
    <Inside>
      <Title>{circleName}</Title>
    </Inside>
    <Container src={imageSrc} />
  </Holder>
);

CircleItem.propTypes = {
  circleName: PropTypes.string.isRequired,
  imageSrc: PropTypes.string.isRequired,
};

export default CircleItem;
