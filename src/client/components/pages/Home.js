import React from 'react';
import ProductContainer from '../product/ProductContainer';
import ProductView from '../product/ProductView';
import { Title } from '../global/Headers';
import { MainContainer } from '../global/Global';
import ArrowIcon from '../icons/ArrowIcon';

const Home = () => (
  <MainContainer>
    <ArrowIcon height="20" />
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
