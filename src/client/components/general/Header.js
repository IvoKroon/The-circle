import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'react-emotion';
import { MainColor } from '../general/GlobalCss';

const HeaderContainer = styled('div')`
  height: 70px;
  display: flex;
  background: ${MainColor};
  align-items: center;
  justify-content: center;
`;
const Image = styled.img`
  margin-right: 20px;
  cursor: poiner;
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
    <Link to="/">
      <Image
        width="60"
        height="60"
        alt="Circle logo"
        src="https://firebasestorage.googleapis.com/v0/b/circle-2252a.appspot.com/o/logobigger.png?alt=media&token=92772282-ff97-4973-90b1-1ec0ec9d945a" />
    </Link>
    <List>
      <Link to="/">
        <ListItem>Home</ListItem>
      </Link>
      <Link to="/circles">
        <ListItem>Circles</ListItem>
      </Link>
      <Link to="/products">
        <ListItem>Products</ListItem>
      </Link>
    </List>
  </HeaderContainer>
);

export default Header;
