import React from 'react';
import PropTypes from 'prop-types';
import styled from 'react-emotion';
import { withRouter } from 'react-router-dom';
import { Grey, MainContainer, CapitalizeFirstLetter } from '../general/GlobalCss';
import firebase from '../general/firebaseConfig';
import Loader from '../general/Loader';
import TimePlanner from '../planner/TimePlanner';

const SplitView = styled.div`
  display: flex;
`;

const SplitViewChild = styled.div`
  flex: 1;
`;

const NameField = styled.div`
  color: ${Grey};
`;

const Location = styled.div``;

class ProductDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      product: null,
    };
  }

  componentWillMount() {
    const { id } = this.props.match.params;
    const messagesRef = firebase.database().ref(`products/${id}`);

    messagesRef.once('value', (snapshot) => {
      if (snapshot.val() != null) {
        const product = snapshot.val();
        product.id = snapshot.key;
        this.setState({ product, loading: false });
      } else {
        this.props.history.push('/notfound');
      }
    });
  }

  componentWillUnmount() {
    const { id } = this.props.match.params;
    firebase
      .database()
      .ref(`products/${id}`)
      .off();
  }

  render() {
    return (
      <MainContainer>
        {!this.state.loading ? (
          <SplitView>
            <SplitViewChild>
              <img
                width="250"
                height="250"
                src={this.state.product.image}
                alt={this.state.product.title}
              />
            </SplitViewChild>
            <SplitViewChild>
              <h1>{this.state.product.title}</h1>
              <NameField>Ivo Kroon</NameField>
              <Location>
                <b>Sommelsdijk</b> Nicolaas beetsstraat 18
              </Location>
              <TimePlanner product={this.state.product} />
            </SplitViewChild>
          </SplitView>
        ) : (
          <Loader />
        )}
      </MainContainer>
    );
  }
}

ProductDetail.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

// ProductDetail.wrappedComponent.propTypes = {
//   user: PropTypes.shape({
//     user: PropTypes.shape({
//       id: PropTypes.number.isRequired,
//     }),
//   }).isRequired,
// };

export default withRouter(ProductDetail);
