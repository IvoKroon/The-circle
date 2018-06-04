import React from 'react';
import { Link } from 'react-router-dom';

import CircleItem from '../circle/CircleItem';
import CircleItemAdd from '../circle/CircleItemAdd';
import CircleHolder from '../circle/CircleHolder';
import { MainContainer } from '../general/Global';

const Circles = () => (
  <MainContainer>
    <CircleHolder>
      <Link to="/createcircle">
        <CircleItemAdd />
      </Link>
      <CircleItem
        circleName="Sommelsdijk"
        imageSrc="https://placeimg.com/200/150/arch"
      />
      <CircleItem
        circleName="Boeken"
        imageSrc="https://placeimg.com/200/150/arch"
      />
      <CircleItem
        circleName="Kroontjes"
        imageSrc="https://placeimg.com/200/150/arch"
      />
      <CircleItem
        circleName="Nicolaas beetsstraat"
        imageSrc="https://placeimg.com/200/150/arch"
      />
    </CircleHolder>
  </MainContainer>
);

export default Circles;
