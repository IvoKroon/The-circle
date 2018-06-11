import React from 'react';
import PropTypes from 'prop-types';
import styled from 'react-emotion';

const Input = styled.input`
  border: none;
  border-bottom: solid black 2px;
  width: 200px;
  font-size: 16px;
`;

const TextField = ({ placeHolder, onChange, value }) => (
  <Input value={value} onChange={e => onChange(e)} type="text" placeholder={placeHolder} />
);

TextField.propTypes = {
  value: PropTypes.string.isRequired,
  placeHolder: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default TextField;
