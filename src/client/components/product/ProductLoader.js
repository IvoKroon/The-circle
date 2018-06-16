import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

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
    if (this.props.products) {
      const arrayProducts = Object.keys(this.props.products);
      for (let i = 0; i < arrayProducts.length; i += 1) {
        const promise = new Promise((resolve) => {
          const id = arrayProducts[i];
          const messagesRef = firebase.database().ref(`products/${id}`);

          messagesRef.once('value', (snapshot) => {
            const data = snapshot.val();
            data.id = id;
            resolve(data);
          });
        });

        promises.push(promise);
      }

      Promise.all(promises).then((values) => {
        this.setState({ products: values });
      });
    }
  }

  render() {
    const components = [];
    if (!this.loading) {
      for (let i = 0; i < this.state.products.length; i += 1) {
        const { id, title, image } = this.state.products[i];
        components.push(<Link key={i} to={`/products/${id}`}>
          <ProductView title={title} image={image} />
                        </Link>);
      }
    }
    return (
      <MainContainer>
        {!this.state.loading ? (
          <ProductContainer>
            {this.props.products ? (
              components
            ) : (
              <div>
                <h1>No Products found</h1>
                <h3>Add some right now.</h3>
              </div>
            )}
          </ProductContainer>
        ) : (
          <Loader />
        )}
      </MainContainer>
    );
  }
}

ProductLoader.propTypes = {
  products: PropTypes.objectOf(PropTypes.any.isRequired),
};
ProductLoader.defaultProps = {
  products: null,
};
