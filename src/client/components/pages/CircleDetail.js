import React from 'react';
import PropTypes from 'prop-types';
import styled from 'react-emotion';
import { withRouter } from 'react-router-dom';
import firebase from '../general/firebaseConfig';
import { Grey, MainContainer, CapitalizeFirstLetter } from '../general/GlobalCss';
import Loader from '../general/Loader';
import Notification from '../notification/Notification';

class CircleDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      circle: null,
    };
  }

  componentWillMount() {
    const { id } = this.props.match.params;
    const messagesRef = firebase.database().ref(`circles/${id}`);

    messagesRef.once('value', (snapshot) => {
      console.log(snapshot.val());
      if (snapshot.val() != null) {
        const circle = snapshot.val();
        this.setState({ circle, loading: false });
      } else {
        this.props.history.push('/notfound');
      }
    });
  }

  componentWillUnmount() {
    const { id } = this.props.match.params;
    firebase
      .database()
      .ref(`circles/${id}`)
      .off();
  }
  render() {
    return !this.state.loading ? (
      <MainContainer>
        <h1>{CapitalizeFirstLetter(this.state.circle.title)}</h1>
        <Notification name="Ivo" type="Searching" item="Skrews" />
        <Notification name="Ivo" type="Searching" item="Skrews" />
        <Notification name="Ivo" type="Searching" item="Skrews" />
      </MainContainer>
    ) : (
      <MainContainer>
        <Loader />
      </MainContainer>
    );
  }
}

CircleDetail.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default withRouter(CircleDetail);
