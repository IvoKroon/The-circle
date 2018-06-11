import React from 'react';
import PropTypes from 'prop-types';
import styled from 'react-emotion';
import { Shadow } from '../general/GlobalCss';

const ButtonStyle = styled.button`
  ${Shadow} border:none;
  padding-left: 20px;
  padding-right: 20px;
  padding-top: 5px;
  padding-bottom: 5px;
  border-radius: 4px;
  color: ${props => props.textColor};
  background: ${props => props.backgroundColor};
  cursor: pointer;
  font-size: 16px;
  margin-right: 5px;
  flex: 1;
`;

const Button = props => (
  <ButtonStyle click={props.onClick} {...props}>
    {props.children}
  </ButtonStyle>
);

Button.propTypes = {
  textColor: PropTypes.string,
  backgroundColor: PropTypes.string,
  children: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};

Button.defaultProps = {
  textColor: 'black',
  backgroundColor: 'white',
  onClick: () => {},
};
export default Button;
