import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'react-emotion';
import ClosedArrowIcon from '../icons/ClosedArrowIcon';
import { LightGrey } from '../general/GlobalCss';
import TimeSlot from './TimeSlot';
import { PlanProduct } from '../firebaseRequests/ProductRequests';
import { CreateNotification } from '../firebaseRequests/NotificationRequests';
import { Redirect } from 'react-router-dom';

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
      selectedSlots: [],
      takenSlots: [],
      redirect: false,
    };
    this.setSelecter = this.setSelecter.bind(this);
    this.plan = this.plan.bind(this);
  }
  componentDidMount() {
    this.loadTimeSlots();
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

  plan() {
    const timeStamps = [];
    for (let i = 0; i < this.state.selectedSlots.length; i += 1) {
      const date = new Date();
      const hour = date.getHours() + this.state.selectedSlots[i] + 1;
      const day = date.getDay();
      const newDate = new Date(date.getFullYear(), date.getMonth(), day, hour);
      timeStamps.push(newDate.getTime());
    }
    const userId = JSON.parse(localStorage.getItem('user')).id;

    if (Number(this.props.product.userId) === Number(userId)) {
      PlanProduct(this.props.product.id, timeStamps, 0).then(() => {
        this.setState({ redirect: true });
      });
    } else {
      // Create notification
      PlanProduct(this.props.product.id, timeStamps, 1).then(() => {
        CreateNotification(this.props.product.id, userId, timeStamps).then((data) => {
          this.setState({ redirect: true });
        });
        // this.setState({ redirect: true });
      });
    }

    // Save one to many
    // product/$id/planned/
    // Push timestamp -> userId
  }

  loadTimeSlots() {
    // console.log(this.props.product.plan);
    // const plan
    if (this.props.product.plan) {
      const plan = Object.keys(this.props.product.plan);
      // const plan = [1528290000, 1528315200];
      const slots = [];
      for (let i = 0; i < plan.length; i += 1) {
        const timestamp = plan[i];
        const now = new Date();
        const startHour = now.getHours() + 1;
        const date = new Date(Number(timestamp));

        if (date.getHours() < startHour) {
          // NEXT DAY.
          slots.push(24 - startHour + date.getHours());
        } else {
          // console.log(date.getHours() - startHour);
          slots.push(date.getHours() - startHour);
        }
      }
      // console.log(slots);
      this.setState({ takenSlots: slots });
    }

    //

    // const hours = 14;

    // console.log(chosenHour);
    // // const timeStamps = [];
    // // if()
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to="/products/" />;
    }
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
        <button onClick={this.plan}>PLAN</button>
      </Holder>
    );
  }
}
TimePlanner.propTypes = {
  product: PropTypes.objectOf(PropTypes.any).isRequired,
};
