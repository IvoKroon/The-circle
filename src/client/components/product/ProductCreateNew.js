import React from 'react';
import styled from 'react-emotion';
import { Link } from 'react-router-dom';

const Holder = styled.div`
  background: black;
  width: 200px;
  height: 250px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  margin-left:20px;
  &:nth-child(7){
    background:red;
  }
`;

const ProductCreateNew = () => (
  <Link to="createproduct">
    <Holder>
      <div>Product toevoegen</div>
    </Holder>
  </Link>
);

export default ProductCreateNew;
