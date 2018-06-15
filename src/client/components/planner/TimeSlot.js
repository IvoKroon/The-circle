import React from 'react';
import PropTypes from 'prop-types';
import styled from 'react-emotion';
import { MainColor, Shadow, LightGrey } from '../general/GlobalCss';

const TakenHolder = styled.div`
  color: ${LightGrey};
  flex: 1;
  justify-content: center;
  height: 30px;
  position: relative;
  display: flex;
`;

const SlotHolder = styled.span`
  cursor: pointer;
  position: relative;
  display: flex;
  height: 30px;
  justify-content: center;
  flex: 1;
  background: ${props => (props.selected ? MainColor : 'white')};
  color: ${props => (props.selected ? 'white' : 'black')};
  margin-right: ${props => (props.active ? '2px' : '0')};
  &:before {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: -1;
    ${Shadow};
  }
  &:hover {
    background: ${MainColor};
    color: white;
  }
  &:first-of-type {
    border-radius: 5px 0 0 5px;
    &:before {
      border-radius: 5px 0 0 5px;
    }
  }
  &:last-of-type {
    border-radius: 0 5px 5px 0;
    &:before {
      border-radius: 0 5px 5px 0;
    }
  }
`;
const Hour = styled.div``;
const Slot = styled.div`
  display: flex;
  align-items: center;
`;
const Minutes = styled.div`
  margin-left: 1px;
  font-size: 50%;
`;

const TimeSlot = (props) => {
  const data = (
    <Slot>
      <Hour>{props.Hours}</Hour>
      <Minutes>{props.Minutes}</Minutes>
    </Slot>
  );
  let Holder = null;
  if (!props.taken) {
    Holder = (
      <SlotHolder onClick={props.onClick} active={props.active} selected={props.selected}>
        {data}
      </SlotHolder>
    );
  } else {
    Holder = <TakenHolder>{data}</TakenHolder>;
  }
  return Holder;
};

TimeSlot.propTypes = {
  Hours: PropTypes.number.isRequired,
  Minutes: PropTypes.string.isRequired,
  selected: PropTypes.bool,
  taken: PropTypes.bool,
  active: PropTypes.bool,
  onClick: PropTypes.func,
};

TimeSlot.defaultProps = {
  active: false,
  selected: false,
  taken: false,
  onClick: null,
};
export default TimeSlot;
