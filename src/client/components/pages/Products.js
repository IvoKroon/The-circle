import React from 'react';
import styled from 'react-emotion';
import { Link } from 'react-router-dom';
import { MainContainer } from '../general/GlobalCss';
import TimePlanner from '../planner/TimePlanner';
import Loader from '../general/Loader';
import firebase from '../general/firebaseConfig';
import ProductCreateNew from '../product/ProductCreateNew';

import {
  CreateNotification,
  GetLatestNotifications,
} from '../firebaseRequests/NotificationRequests';
import ProductView from '../product/ProductView';

const Holder = styled.div`
  display: flex;
  width: 1000px;
  flex-direction: row;
  flex-wrap: wrap;
  flex: 1;
`;

const Filler = styled.div`
  min-width: 200px;
  width: 200px;
  height: 250px;
`;

class Products extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      loading: true,
    };
  }
  componentWillMount() {
    const userId = JSON.parse(localStorage.getItem('user')).id;
    console.log(userId);
    const messagesRef = firebase
      .database()
      .ref('products')
      .orderByChild('userId')
      .equalTo(userId);

    messagesRef.once('value', (snapshot) => {
      if (snapshot.val()) {
        const products = Object.values(snapshot.val());
        const keys = Object.keys(snapshot.val());
        for (let i = 0; i < products.length; i += 1) {
          products[i].id = keys[i];
        }
        this.setState({ products, loading: false });
      } else {
        this.setState({ products: [], loading: false });
      }
    });
  }
  render() {
    console.log(this.state);
    const products = [];
    if (!this.state.loading) {
      for (let i = 0; i < this.state.products.length; i += 1) {
        products.push(<ProductView
          key={i + 1}
          id={this.state.products[i].id}
          title={this.state.products[i].title}
          image={this.state.products[i].image}
        />);
      }
      products.push(<ProductCreateNew key={0} />);
    }
    return this.state.loading ? (
      <MainContainer>
        <Loader />
      </MainContainer>
    ) : (
      <MainContainer>
        <h1>My products</h1>
        <Holder>{products}</Holder>
      </MainContainer>
    );
  }
}

export default Products;
