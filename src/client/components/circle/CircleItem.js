import React from 'react';
import PropTypes from 'prop-types';
import { Title, Inside, Holder, Container } from './CircleItemStyle';
import { CapitalizeFirstLetter } from '../general/GlobalCss';

const CircleItem = ({ title, imageSrc }) => (
  <Holder>
    <Inside>
      <Title>{CapitalizeFirstLetter(title)}</Title>
    </Inside>
    <Container alt={title} src={imageSrc} />
  </Holder>
);

CircleItem.propTypes = {
  title: PropTypes.string.isRequired,
  imageSrc: PropTypes.string.isRequired,
};

export default CircleItem;
