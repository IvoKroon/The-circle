import React from 'react';
import CircleItem from '../circle/CircleItem';
import CircleItemAdd from '../circle/CircleItemAdd';
import CircleHolder from '../circle/CircleHolder';
import { MainContainer } from '../global/Global';

const Circles = () => (
  <MainContainer>
    <CircleHolder>
      <CircleItemAdd />
      <CircleItem />
      <CircleItem />
      <CircleItem />
      <CircleItem />
    </CircleHolder>
  </MainContainer>
);

export default Circles;
