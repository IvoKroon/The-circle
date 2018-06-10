import React from 'react';
import ProductContainer from '../product/ProductContainer';
import ProductView from '../product/ProductView';
import RequestNotification from '../notification/RequestNotification';
import { Title } from '../general/Headers';
import { MainContainer } from '../general/GlobalCss';
import Button from '../form/Button';

const Home = () => (
  <MainContainer>
    <RequestNotification user="Ivo" item="Landmower" />
    <Button>dsaf</Button>
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
