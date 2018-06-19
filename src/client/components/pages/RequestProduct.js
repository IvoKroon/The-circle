import React from 'react';
import PropTypes from 'prop-types';
import TextField from '../form/TextField';
import firebase from '../general/firebaseConfig';
import Redirect from 'react-router-dom/Redirect';

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
