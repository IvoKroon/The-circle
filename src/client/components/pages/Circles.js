import React from 'react';

import CircleItem from '../circle/CircleItem';
import CircleItemAdd from '../circle/CircleItemAdd';
import CircleHolder from '../circle/CircleHolder';
import { MainContainer } from '../general/Global';
import firebase from '../../config/firebaseConfig';

class Circles extends React.Component {
  constructor(props) {
    super(props);
    this.state = { circles: [] };
  }
  componentWillMount() {
    console.log('DID MOUNT');
    const messagesRef = firebase
      .database()
      .ref('circles')
      .limitToLast(4);

    messagesRef.once('value', (snapshot) => {
      const value = snapshot.val();
      const keys = Object.keys(snapshot.val());
      const circles = [];
      for (let i = 0; i < keys.length; i += 1) {
        const key = keys[i];
        const circle = { id: key, title: value[key].title };
        circles.push(circle);
      }

      console.log('Circles', circles);
      // console.log(circles);
      // this.setState({ circles });
      // for (const key in snapshot.val()) {
      //   // => do what you need
      // }
    });

    // messagesRef.on(
    //   'value',
    //   (snapshot) => {
    //     const data = snapshot.val();
    //     const message = {
    //       img: data.img,
    //       title: data.title,
    //       desc: data.desc,
    //       id: snapshot.key,
    //     };
    //     this.setState({ circles: [message].concat(this.state.circles) });
    //     console.log(this.state.circles);
    //   },
    //   (err) => {
    //     console.log(err);
    //   },
    // );
  }

  render() {
    return (
      <MainContainer>
        <CircleHolder>
          <CircleItemAdd />
          {this.state.circles.map(message => (
            <CircleItem
              linkTo={`/circle/${message.id}`}
              circleName={message.title}
              imageSrc={message.img}
              key={message.id}
            >
              {message.title}
            </CircleItem>
          ))}
        </CircleHolder>
      </MainContainer>
    );
  }
}

export default Circles;
