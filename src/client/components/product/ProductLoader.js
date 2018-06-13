import React from 'react';
import Loader from '../general/Loader';
import { MainContainer } from '../general/GlobalCss';
import firebase from '../general/firebaseConfig';
import ProductView from '../product/ProductView';
import ProductContainer from '../product/ProductContainer';

export default class ProductLoader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      products: [],
    };
  }
  componentDidMount() {
    const promises = [];
    const myValuesInArray = Object.values(this.props.products);
    for (let i = 0; i < myValuesInArray.length; i += 1) {
      // for (const productId in this.props.products) {
      const promise = new Promise((resolve) => {
        const messagesRef = firebase.database().ref(`products/${myValuesInArray[i]}`);

        messagesRef.once('value', (snapshot) => {
          resolve(snapshot.val());
        });
      });

      promises.push(promise);
    }

    Promise.all(promises).then((values) => {
      console.log('data');
      console.log(values);
      this.setState({ products: values });
    });
  }

  render() {
    const components = [];
    if (!this.loading) {
      for (let i = 0; i < this.state.products.length; i += 1) {
        const { title, image } = this.state.products[i];
        components.push(<ProductView title={title} image={image} key={i} />);
      }
    }
    return (
      <MainContainer>
        {!this.state.loading ? <ProductContainer>{components}</ProductContainer> : <Loader />}
      </MainContainer>
    );
  }
}
