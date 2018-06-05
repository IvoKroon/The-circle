import React from 'react';
import PropTypes from 'prop-types';
import styled from 'react-emotion';

const Input = styled.textarea`
  border: none;
  border-bottom: solid black 2px;
  width: 200px;
  font-size: 16px;
`;

const TextField = ({ placeHolder, onChange }) => (
  <Input onChange={e => onChange(e)} type="text" placeholder={placeHolder} />
);

TextField.propTypes = {
  placeHolder: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default TextField;
