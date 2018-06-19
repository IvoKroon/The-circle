import React from 'react';
import PropTypes from 'prop-types';
import styled from 'react-emotion';
import { Link } from 'react-router-dom';
import { Shadow } from '../general/GlobalCss';

const Container = styled('div')`
  color: black;
  width: 200px;
  height: 250px;
  ${Shadow};
  margin-bottom:20px;
`;

const ImageView = styled('img')`
height: 140px;
width: auto;
max-width: 190px;
padding: 5px;
display: block;
margin-left: auto;
margin-right: auto;
}
`;

const TextContainer = styled('div')`
  margin-top: 10px;
  margin-left: 10px;
`;

const Title = styled('div')`
  font-weight: bold;
`;

const GroupName = styled('div')`
  color: #cdcdcd;
`;

const NewLink = styled(Link)`
  margin-left: 20px;
  &:first-child {
    margin-left: 0;
  }
  &:nth-child(5){
    margin-left:0;
  }
`;

const ProductView = ({
  id, image, title, groupName,
}) => (
  <NewLink to={`/products/${id}`}>
    <Container>
      <ImageView src={image} alt="test" />
      <TextContainer>
        <Title>{title}</Title>
        <GroupName>{groupName}</GroupName>
      </TextContainer>
    </Container>
  </NewLink>
);

ProductView.propTypes = {
  id: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  groupName: PropTypes.string,
};

ProductView.defaultProps = {
  groupName: null,
};

export default ProductView;
