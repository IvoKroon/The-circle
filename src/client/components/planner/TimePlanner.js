import React from 'react';
import styled, { css } from 'react-emotion';
import ClosedArrowIcon from '../icons/ClosedArrowIcon';
import { LightGrey } from '../general/GlobalCss';
import TimeSlot from './TimeSlot';

const Holder = styled.div`
  width: 300px;
`;

const DayHolder = styled.div`
  display: flex;
  width: 200px;
  align-items: center;
  margin-left: auto;
  margin-right: auto;
`;

const Month = styled.div`
  font-size: 18px;
  text-align: center;
`;

const Day = styled.div`
  font-size: 14px;
  color: ${LightGrey};
  flex: 1;
  text-align: center;
`;

const ActiveDay = styled.div`
  font-size: 18px;
  color: black;
  flex: 2;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  align-content: stretch;
`;

const flexItem = css`
  flex: 1;
`;

const HourHolder = styled.div``;

const Row = styled.div`
  margin-bottom: 10px;
  display: flex;
`;

export default class TimePlanner extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedSlots: [0, 1],
      takenSlots: [2, 3],
    };
    this.setSelecter = this.setSelecter.bind(this);
  }
  setSelecter(key) {
    const array = this.state.selectedSlots;
    array.push(key);
    this.setState({ selectedSlots: array });
  }

  removeSelected(key) {
    const deselect = this.state.selectedSlots.findIndex(slot => slot === key);
    const data = this.state.selectedSlots;
    data.splice(deselect, 1);
    this.setState({ selectedSlots: data });
  }

  render() {
    const d = new Date();
    const hour = d.getHours() + 1;
    const timePlanner = [];
    for (let i = 0; i < 4; i += 1) {
      const elements = [];
      for (let j = 0; j < 6; j += 1) {
        const element = i * 6 + j;
        if (this.state.takenSlots.indexOf(element) > -1) {
          elements.push(<TimeSlot key={element} taken Hours={(element + hour) % 24} Minutes="00" />);
        } else if (this.state.selectedSlots.indexOf(element) > -1) {
          elements.push(<TimeSlot
            onClick={() => this.removeSelected(element)}
            key={element}
            selected
            Hours={(element + hour) % 24}
            Minutes="00"
          />);
        } else {
          elements.push(<TimeSlot
            onClick={() => this.setSelecter(element)}
            key={element}
            Hours={(element + hour) % 24}
            Minutes="00"
          />);
        }
      }
      timePlanner.push(<Row key={i}>{elements}</Row>);
    }
    return (
      <Holder>
        <Month>Mei</Month>
        <DayHolder>
          <Day>ma</Day>
          <Day>di</Day>
          <ActiveDay>
            <ClosedArrowIcon className={flexItem} /> <div className={flexItem}>wo</div>{' '}
            <ClosedArrowIcon Left />
          </ActiveDay>
          <Day>do</Day>
          <Day>vr</Day>
        </DayHolder>
        <HourHolder>{timePlanner}</HourHolder>
      </Holder>
    );
  }
}
