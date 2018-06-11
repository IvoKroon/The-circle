import React from 'react';
import PropTypes from 'prop-types';
import styled from 'react-emotion';
import { MainColor } from '../general/GlobalCss';

const Holder = styled.div`
  margin-left: auto;
  margin-right: auto;
  display: flex;
`;

const Container = styled.div`
  min-height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SearchButton = styled.button`
  margin: 0;
  padding: 0;
  border: none;
  cursor: pointer;
  padding-left: 20px;
  padding-right: 20px;
  font-size: 16px;
  border-radius: 0 8px 8px 0;
  height: 50px;
  background: ${MainColor};
  color: white;
`;

const TextField = styled.input`
  border: none;
  height: 50px;
  box-sizing: unset;
  width: 300px;
  border-radius: 8px 0 0 8px;
  padding-left: 10px;
  font-size: 18px;
`;

const SearchBar = ({ onClick, onChange }) => (
  <Container>
    <Holder>
      <TextField onChange={e => onChange(e)} placeholder="Ik ben opzoek naar..." type="text" />
      <SearchButton onClick={onClick}>Zoeken</SearchButton>
    </Holder>
  </Container>
);

SearchBar.propTypes = {
  onClick: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default SearchBar;
