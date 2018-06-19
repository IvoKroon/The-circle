import React from 'react';
import PropTypes from 'prop-types';
import TextField from '../form/TextField';
import firebase from '../general/firebaseConfig';

export default class RequestProduct extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      request: '',
    };
  }
  request() {
    // CREATE REQUEST
    // add to circle
    const { id } = this.props.match.params;
    const userId = JSON.parse(localStorage.getItem('user')).id;
    const ref = firebase.database().ref(`circles/${id}/requests`);
    ref.push({ userId, circleId: id, title: this.state.request }).then(() => console.log('added'));
  }
  render() {
    return (
      <div>
        <h1>Request Product</h1>
        <TextField
          onChange={e => this.setState({ request: e.target.value })}
          value={this.state.request}
          placeHolder="Product Name"
        />
        <button onClick={() => this.request()}>Request</button>
      </div>
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
