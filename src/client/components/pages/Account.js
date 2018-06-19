import React from 'react';
import TextField from '../form/TextField';
import Button from '../form/Button';
import firebase from '../general/firebaseConfig';
import Notification from '../notification/Notification';

export default class Account extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      price: '',
      notifications: [],
    };
  }

  render() {
    return (
      <div>
        <h1>Account</h1>
      </div>
    );
  }
}
