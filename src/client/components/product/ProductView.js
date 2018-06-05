import React from 'react';
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

const ProductView = () => (
  <Container>
    <ImageView src="https://placeimg.com/200/150/arch" alt="test" />
    <TextContainer>
      <Title>Product name</Title>
      <GroupName>Group name</GroupName>
    </TextContainer>
  </Container>
);

export default ProductView;
