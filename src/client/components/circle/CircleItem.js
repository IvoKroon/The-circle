import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Title, Inside, Holder, Container } from './CircleItemStyle';

const CircleItem = ({ imageSrc, circleName, linkTo }) => (
  <Link to={linkTo}>
    <Holder to={linkTo}>
      <Inside>
        <Title>{circleName}</Title>
      </Inside>
      <Container src={imageSrc} />
    </Holder>
  </Link>
);

CircleItem.propTypes = {
  circleName: PropTypes.string.isRequired,
  imageSrc: PropTypes.string.isRequired,
  linkTo: PropTypes.string.isRequired,
};

export default CircleItem;
