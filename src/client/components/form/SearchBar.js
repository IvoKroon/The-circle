import React from 'react';
import PropTypes from 'prop-types';
import styled from 'react-emotion';
import { MainColor, Shadow } from '../general/GlobalCss';

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
  ${props => (props.shadow ? Shadow : null)};
`;

const TextField = styled.input`
  border: none;
  height: 50px;
  box-sizing: unset;
  width: 300px;
  border-radius: 8px 0 0 8px;
  padding-left: 10px;
  font-size: 18px;
  ${props => (props.shadow ? Shadow : null)};
`;

const SearchBar = ({
  shadow, onClick, onChange, placeholder,
}) => (
  <Container>
    <Holder>
      <TextField shadow={shadow} onChange={e => onChange(e)} placeholder={placeholder} />
      <SearchButton shadow={shadow} onClick={onClick}>
        Search
      </SearchButton>
    </Holder>
  </Container>
);

SearchBar.propTypes = {
  onClick: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  shadow: PropTypes.bool,
  placeholder: PropTypes.string.isRequired,
};

SearchBar.defaultProps = {
  shadow: true,
};

export default SearchBar;
