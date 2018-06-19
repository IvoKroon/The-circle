import React from 'react';
import PropTypes from 'prop-types';
import Redirect from 'react-router/Redirect';
import styled from 'react-emotion';
import TextField from '../form/TextField';
import Button from '../form/Button';
import firebase from '../general/firebaseConfig';

const Holder = styled.div`
  width: 300px;
  margin-left: auto;
  margin-right: auto;
`;

const Desc = styled.div`
  margin-top: 20px;
`;

const TextFieldHolder = styled.div`
  margin-top: 20px;
`;

const Header = styled.h1`
  margin-top: 20px;
  text-align: center;
`;

export default class CreateBuyRequest extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      price: '',
      redirect: false,
    };
  }
  submit() {
    const { id } = this.props.match.params;
    const { title, price } = this.state;
    const payers = 4;
    const pricePerPerson = Number(price) / payers;
    const data = {
      title,
      price,
      state: 1,
      pricePerPerson,
      paid: 0,
      payers,
    };
    firebase
      .database()
      .ref(`/circles/${id}/requests`)
      .push(data)
      .then((result) => {
        console.log('added');
        this.setState({ redirect: true });
      });
  }
  render() {
    if (this.state.redirect) {
      const { id } = this.props.match.params;
      return <Redirect to={`/circle/${id}`} />;
    }

    return (
      <Holder>
        <Header>Buy products together</Header>
        <Desc>For buying a product we need a product name and the price.</Desc>
        <TextFieldHolder>
          <TextField
            placeHolder="Product name"
            value={this.state.title}
            onChange={e => this.setState({ title: e.target.value })}
          />
        </TextFieldHolder>
        <TextFieldHolder>
          <TextField
            placeHolder="Price"
            value={this.state.price}
            onChange={e => this.setState({ price: e.target.value })}
          />
        </TextFieldHolder>
        <Button onClick={() => this.submit()}>Submit</Button>
      </Holder>
    );
  }
}

CreateBuyRequest.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};
