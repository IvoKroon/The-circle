import React from 'react';
import PropTypes from 'prop-types';
import { MainContainer } from '../general/GlobalCss';
import Loader from '../general/Loader';
import firebase from '../general/firebaseConfig';

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
      const circle = snapshot.val();
      this.setState({ circle, loading: false });
      // const keys = Object.keys(snapshot.val());
      // const circles = [];
      // for (let i = 0; i < keys.length; i += 1) {
      //   const key = keys[i];
      //   const circle = { id: key, title: value[key].title, img: value[key].img };
      //   circles.push(circle);
      // }
      // this.setState({ circles, loading: false });
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
    return (
      <MainContainer>
        {!this.state.loading ? <h1>{this.state.circle.title}</h1> : <Loader />}
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
};

export default CircleDetail;
