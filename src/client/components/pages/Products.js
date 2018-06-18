import React from 'react';
import { MainContainer } from '../general/GlobalCss';
import TimePlanner from '../planner/TimePlanner';
import Loader from '../general/Loader';
import firebase from '../general/firebaseConfig';
import {
  CreateNotification,
  GetLatestNotifications,
} from '../firebaseRequests/NotificationRequests';

class Products extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      loading: true,
    };
  }
  // componentWillMount() {
  //   const messagesRef = firebase
  //     .database()
  //     .ref('products')
  //     .limitToLast(3);

  //   messagesRef.once('value', (snapshot) => {
  //     const value = snapshot.val();
  //     const keys = Object.keys(snapshot.val());
  //     const circles = [];
  //     for (let i = 0; i < keys.length; i += 1) {
  //       const key = keys[i];
  //       const circle = { id: key, title: value[key].title, img: value[key].img };
  //       circles.push(circle);
  //     }
  //     this.setState({ products, loading: false });
  //   });
  // }
  render() {
    const userId = JSON.parse(localStorage.getItem('user')).id;
    // CreateNotification('-LF2X5i3P8f7jZflw4Jy', userId).then(() => {
    //   console.log('added');
    // });
    GetLatestNotifications(userId).then((data) => {
      console.log(data);
    });
    return <MainContainer />;
  }
}

export default Products;
