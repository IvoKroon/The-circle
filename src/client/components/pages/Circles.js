import React from 'react';
import { observer } from "mobx-react"

import CircleItem from '../circle/CircleItem';
import CircleItemAdd from '../circle/CircleItemAdd';
import CircleHolder from '../circle/CircleHolder';
import { MainContainer } from '../general/GlobalCss';
import Loader from '../general/Loader';
import firebase from '../general/firebaseConfig';

class Circles extends React.Component {
  constructor(props) {
    super(props);
    this.state = { circles: [], loading: true };
    // console.log(this.props.store)
  }
  
  componentWillMount() {
    const messagesRef = firebase
      .database()
      .ref('circles')
      .limitToLast(3);

    messagesRef.once('value', (snapshot) => {
      const value = snapshot.val();
      const keys = Object.keys(snapshot.val());
      const circles = [];
      for (let i = 0; i < keys.length; i += 1) {
        const key = keys[i];
        const circle = { id: key, title: value[key].title, img: value[key].img };
        circles.push(circle);
      }
      this.setState({ circles, loading: false });
    });
  }

  componentWillUnmount() {
    firebase
      .database()
      .ref('circles')
      .off();
  }

  render() {
    const data = [];
    for (let i = 0; i < this.state.circles.length; i += 1) {
      const circle = this.state.circles[i];
      const circleItems = (
        <CircleItem
          linkTo={`/circle/${circle.id}`}
          circleName={circle.title}
          imageSrc={circle.img}
          key={circle.id}
        >
          {circle.title}
        </CircleItem>
      );
      data.push(circleItems);
    }
    data.push(<CircleItemAdd key={0} />);

    return (
      <MainContainer>
        {!this.state.loading ? <CircleHolder>{data}</CircleHolder> : <Loader />}
      </MainContainer>
    );
  }
}

export default Circles;
