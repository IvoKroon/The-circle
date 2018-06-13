import React from 'react';
import PropTypes from 'prop-types';
import styled from 'react-emotion';
import { Shadow } from '../general/GlobalCss';

const Container = styled('div')`
  width: 200px;
  height: 250px;
  ${Shadow} margin-left: 20px;
  &:first-child {
    margin-left: 0;
  }
`;

const ImageView = styled('img')`
  height: 150px;
  width: 200px;
`;

const TextContainer = styled('div')`
  margin-top: 5px;
  margin-left: 10px;
`;

const Title = styled('div')`
  font-weight: bold;
`;

const GroupName = styled('div')`
  color: #cdcdcd;
`;

const ProductView = ({ image, title }) => (
  <Container>
    <ImageView src={image} alt="test" />
    <TextContainer>
      <Title>{title}</Title>
      <GroupName>Group name</GroupName>
    </TextContainer>
  </Container>
);

ProductView.propTypes = {
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default ProductView;
