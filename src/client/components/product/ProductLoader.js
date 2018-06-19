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
      loading: true,
      products: [],
    };
  }
  componentDidMount() {
    if (this.props.circleId) {
      const ref = firebase.database().ref(`circles/${this.props.circleId}/products`);

      ref.once('value', (snapshot) => {
        const data = snapshot.val();
        const products = Object.values(data);
        const keys = Object.keys(data);

        products.map((product, key) => {
          const newProduct = product;
          newProduct.id = keys[key];
          return newProduct;
        });

        this.setState({ products, loading: false });
        console.log(data);
        // data.id = id;
      });
    }
  }

  render() {
    const components = [];
    if (!this.loading) {
      for (let i = 0; i < this.state.products.length; i += 1) {
        const { id, title, image } = this.state.products[i];
        components.push(<ProductView key={i} id={id} title={title} image={image} />);
      }
    }
    return (
      <MainContainer>
        {!this.state.loading ? (
          <ProductContainer>
            {this.props.circleId ? (
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
  circleId: PropTypes.string,
};
ProductLoader.defaultProps = {
  circleId: null,
};
