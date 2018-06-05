import React from 'react';
import { Link } from 'react-router-dom';
import { Inside, Title, Holder, Container } from './CircleItemStyle';

const CircleItem = () => (
  <Link to="createcircle">
    <Holder>
      <Inside>
        <Title>+ Create circle</Title>
      </Inside>
      <Container />
    </Holder>
  </Link>
);

export default CircleItem;
