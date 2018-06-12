import React from 'react';
import Proptypes from 'prop-types';
import { Inside, Title, Holder, Container } from './CircleItemStyle';

const AddImageToCircle = ({ onClick, src }) => (
  <Holder onClick={onClick}>
    <Inside>
      <Title>+ Add image</Title>
    </Inside>
    <Container src={src} />
  </Holder>
);

AddImageToCircle.propTypes = {
  onClick: Proptypes.func.isRequired,
  src: Proptypes.string,
};

AddImageToCircle.defaultProps = {
  src: null,
};

export default AddImageToCircle;
