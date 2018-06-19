import React from 'react';
import styled from 'react-emotion';
import { MainColor } from './GlobalCss';

const Container = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 40px;
  background: ${MainColor};
  color: white;
`;

const Footer = () => <Container />;

export default Footer;
