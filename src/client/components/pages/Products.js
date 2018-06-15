import React from 'react';
import { MainContainer } from '../general/GlobalCss';
import TimePlanner from '../planner/TimePlanner';
import Loader from '../general/Loader';
import firebase from '../general/firebaseConfig';

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
    return (
      <MainContainer>
        <TimePlanner />
      </MainContainer>
    );
  }
}

export default Products;
