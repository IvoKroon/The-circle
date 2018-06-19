import React from 'react';
import PropTypes from 'prop-types';
import styled from 'react-emotion';
import Redirect from 'react-router-dom/Redirect';
import TextField from '../form/TextField';
import firebase from '../general/firebaseConfig';
import Button from '../form/Button';

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
margin-top:20px;
  text-align: center;
`;

const ButtonHolder = styled.div`
  margin-top: 20px;
`;

export default class RequestProduct extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      request: '',
      redirect: false,
    };
  }
  request() {
    // CREATE REQUEST
    // add to circle
    const { id } = this.props.match.params;
    const userId = JSON.parse(localStorage.getItem('user')).id;
    const ref = firebase.database().ref(`circles/${id}/requests`);
    ref
      .push({
        userId,
        circleId: id,
        title: this.state.request,
        state: 2,
      })
      .then(() => {
        this.setState({ redirect: true });
        console.log('added');
      });
  }
  render() {
    if (this.state.redirect) {
      const { id } = this.props.match.params;
      return <Redirect to={`/circle/${id}`} />;
    }
    return (
      <Holder>
        <Header>Request Product</Header>
        <Desc>Fill in the title of the requested product.</Desc>
        <TextFieldHolder>
          <TextField
            onChange={e => this.setState({ request: e.target.value })}
            value={this.state.request}
            placeHolder="Product Name"
          />
        </TextFieldHolder>
        <ButtonHolder>
          <Button onClick={() => this.request()}>Request</Button>
        </ButtonHolder>
      </Holder>
    );
  }
}

RequestProduct.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};
