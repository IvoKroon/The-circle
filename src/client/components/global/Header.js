import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'react-emotion';
import { MainColor } from '../../config/color';

const HeaderContainer = styled('div')`
  background: ${MainColor};
  height: 65px;
`;

const List = styled('ul')`
  & li {
    color: white;
    &:link {
      color: red;
    }
    &:hover {
      color: yellow;
    }
    &:active {
      color: green;
    }
  }
`;

const Header = () => (
  <HeaderContainer>
    <List>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/about">About</Link>
      </li>
      <li>
        <Link to="/topics">Topics</Link>
      </li>
    </List>
  </HeaderContainer>
);

export default Header;
