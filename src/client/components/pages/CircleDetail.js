import React from 'react';
import PropTypes from 'prop-types';
import { inject } from 'mobx-react';
import styled, { css } from 'react-emotion';
import { withRouter } from 'react-router-dom';

import firebase from '../general/firebaseConfig';
import { MainContainer, CapitalizeFirstLetter } from '../general/GlobalCss';
import Loader from '../general/Loader';
import Notification from '../notification/Notification';
import { Holder } from '../circle/CircleItemStyle';

const NotificationHolder = styled.div`
  margin-top: 30px;
`;
const Container = styled.div`
  display: flex;
`;

const HolderLeft = styled.div`
  flex: 1;
`;
const HolderRight = styled.div`
  flex: 1;
`;

const Image = styled.img`
  min-width: 250px;
  min-height: 250px;
  max-width: 100%;
  max-height: 100%;
  object-fit: cover;
`;
@inject('user')
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
    const messagesRef = firebase.database().ref(`circles/${this.props.user.user.id}/${id}`);

    messagesRef.once('value', (snapshot) => {
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
    console.log('render');
    console.log(this.state.circle);
    let image = null;
    if (!this.state.loading) {
      image = (
        <Image
          // style="object-fit: cover;"
          width="250"
          height="250"
          // src='http://qnimate.com/wp-content/uploads/2014/03/images2.jpg'
          src={this.state.circle.img}
        />
      );
    }
    return !this.state.loading ? (
      <MainContainer>
        <Container>
          <HolderLeft>
            <div>
              {image}
              <h3>Beschrijving</h3>
              <p>desc</p>
            </div>
          </HolderLeft>
          <HolderRight>
            <h1>{CapitalizeFirstLetter(this.state.circle.title)}</h1>
            <p>
              <b>Sommelsdijk</b> Nicolaas beetsstraat 18
            </p>
            <NotificationHolder>
              <Notification name="Ivo" type="Searching" item="Skrews" />
              <Notification name="Ivo" type="Searching" item="Skrews" />
              <Notification name="Ivo" type="Searching" item="Skrews" />
            </NotificationHolder>
          </HolderRight>
        </Container>
        <h1>Producten</h1>
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

CircleDetail.wrappedComponent.propTypes = {
  user: PropTypes.shape({
    user: PropTypes.shape({
      id: PropTypes.number.isRequired,
    }),
  }).isRequired,
};

export default withRouter(CircleDetail);
