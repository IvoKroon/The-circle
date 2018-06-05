import React from 'react';
import styled from 'react-emotion';
import PropTypes from 'prop-types';
import { Shadow, MainColor, SecondaryTextColor } from '../general/GlobalCss';

const Holder = styled.div`
  margin-top: 10px;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
`;
const Switch = styled.div`
  position: relative;
  display: inline-block;
  width: 40px;
  height: 20px;
`;

const Slider = styled('div')`
  ${Shadow};
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  transition: 0.2s;
  border-radius: 34px;

  &:before {
    position: absolute;
    content: '';
    height: 18px;
    width: 18px;
    left: 2px;
    bottom: 1px;
    background-color: ${MainColor};
    transition: 0.2s;
    border-radius: 50%;
    transform: translateX(${props => (props.active ? '0' : '18')}px);
  }
`;

const Text = styled.div`
  color: ${({ active }) => (active ? 'inherit' : SecondaryTextColor)};
  display: inline-block;
  padding-left: 10px;
  &:first-child {
    padding-left: 0;
    padding-right: 10px;
  }
`;

const ToggleButton = props => (
  <Holder>
    {props.trueValue && <Text active={props.checked}>{props.trueValue}</Text>}
    <Switch>
      <Slider onClick={() => props.onChange(!props.checked)} active={props.checked} />
    </Switch>
    {props.trueValue && <Text active={!props.checked}>{props.falseValue}</Text>}
  </Holder>
);

ToggleButton.propTypes = {
  checked: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  trueValue: PropTypes.string,
  falseValue: PropTypes.string,
};

ToggleButton.defaultProps = {
  trueValue: null,
  falseValue: null,
};

export default ToggleButton;
