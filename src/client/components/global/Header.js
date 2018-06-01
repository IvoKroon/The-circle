import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'react-emotion';
import { MainColor } from '../../config/color';

const HeaderContainer = styled('div')`
  background: ${MainColor};
`;
const ListItem = styled('li')`
  display: inline-block;
  padding: 10px;
  &:hover {
    background: rgba(5, 5, 5, 0.2);
    border-radius: 2px;
  }

  & a:visited,
  :link,
  :active {
    color: white;
  }
`;

const List = styled('ul')`
  padding-top: 10px;
  padding-bottom: 10px;
  margin-top: auto;
  margin-bottom: auto;
  & li {
    color: white;
    & a:hover {
      color: white;
    }
  }
`;

const Header = () => (
  <HeaderContainer>
    <List>
      <Link to="/">
        <ListItem>Home</ListItem>
      </Link>
      <Link to="/circles">
        <ListItem>Circles</ListItem>
      </Link>
      <Link to="/account">
        <ListItem>Account</ListItem>
      </Link>
    </List>
  </HeaderContainer>
);

export default Header;
