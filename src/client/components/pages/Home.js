import React from 'react';
import ProductContainer from '../product/ProductContainer';
import ProductView from '../product/ProductView';
import { Title } from '../general/Headers';
import { MainContainer } from '../general/Global';

const Home = () => (
  <MainContainer>
    <Title>Product View</Title>
    <ProductContainer>
      <ProductView />
      <ProductView />
      <ProductView />
      <ProductView />
    </ProductContainer>
  </MainContainer>
);

export default Home;
