import React from 'react';
import styled from 'react-emotion';
import { MainColor } from './GlobalCss';
import LoadIcon from '../icons/LoadIcon';

const Holder = styled.div`
  margin-left: auto;
  margin-right: auto;
  width: 40px;
`;

const Loader = () => (
  <Holder>
    <LoadIcon width="40" height="40" color={MainColor} />
  </Holder>
);

export default Loader;
