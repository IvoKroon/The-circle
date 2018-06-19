import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import TextField from '../form/TextField';
import Button from '../form/Button';
import firebase from '../general/firebaseConfig';
import { MainContainer } from '../general/GlobalCss';
import Loader from '../general/Loader';

export class PayBuyRequest extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      price: '',
      notification: null,
      loader: true,
      redirect: false,
    };
  }
  componentDidMount() {
    const { id, circleid } = this.props.match.params;
    console.log(id);
    console.log(circleid);
    const ref = firebase.database().ref(`/circles/${circleid}/requests/${id}`);
    ref.once('value').then((result) => {
      console.log(result.val());
      this.setState({ notification: result.val(), loader: false });
    });
  }

  pay() {
    this.setState({ loader: true });
    console.log('PAY');
    const { id, circleid } = this.props.match.params;
    const newPaid = this.state.notification.paid + 1;
    const url =
      'https://firebasestorage.googleapis.com/v0/b/circle-2252a.appspot.com/o/products%2Fla5i6qft7r?alt=media&token=3be3bbc2-c632-4591-8a29-e20ebc6775ea';
    firebase
      .database()
      .ref(`/circles/${circleid}/requests/${id}/paid/`)
      .set(newPaid)
      .then(() => {
        if (newPaid >= this.state.notification.payers) {
          //   const { title, desc } = this.state;
          //   const { id } = JSON.parse(localStorage.getItem('user'));
          const productSet = {
            title: this.state.notification.title,
            desc: 'test',
            userId: 0,
            image: url,
          };
          firebase
            .database()
            .ref('products')
            .push(productSet)
            .then((data) => {
              console.log('data', data.key);
              firebase
                .database()
                .ref(`circles/${circleid}/products/${data.key}`)
                .set(productSet)
                .then(() => {
                  firebase
                    .database()
                    .ref(`/circles/${circleid}/requests/${id}/`)
                    .remove()
                    .then(() => {
                      console.log('DONE');
                      this.redirect = true;
                      this.setState({ redirect: true });
                    });

                  // NEXT PAGE
                });
            });
          console.log('BUY PRODUCT');
        } else {
          this.setState({ redirect: true });
          console.log('MORE BUYERS PLZ');
        }
      });
  }

  render() {
    if (this.state.redirect) {
      const { circleid } = this.props.match.params;
      return <Redirect to={`/circle/${circleid}`} />;
    }
    return (
      <MainContainer>
        {this.state.loader ? (
          <Loader />
        ) : (
          <div>
            <h1>{this.state.notification.title}</h1>
            <h1>Price:€ {this.state.notification.pricePerPerson}</h1>

            <Button onClick={() => this.pay()}>Pay</Button>
          </div>
        )}
      </MainContainer>
    );
  }
}

PayBuyRequest.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
      circleid: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default PayBuyRequest;
