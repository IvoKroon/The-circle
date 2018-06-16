import React from 'react';
import PropTypes from 'prop-types';
import { observer, inject } from 'mobx-react';
import styled, { css } from 'react-emotion';
import { withRouter } from 'react-router-dom';

import firebase from '../general/firebaseConfig';
import { MainContainer, CapitalizeFirstLetter } from '../general/GlobalCss';
import Loader from '../general/Loader';
import Notification from '../notification/Notification';
import { Holder } from '../circle/CircleItemStyle';
import ProductLoader from '../product/ProductLoader';

import { UserHasCircle, UserJoinsCircle, UserLeavesCircle } from '../firebaseRequests/UserRequests';

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

@inject('user', 'circles')
@observer
class CircleDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      circle: null,
      prive: false,
      joined: false,
    };
    this.joinCircle = this.joinCircle.bind(this);
  }

  componentWillMount() {
    const { id } = this.props.match.params;
    const circleRef = firebase.database().ref(`circles/${id}`);
    circleRef.once('value', (circleData) => {
      if (circleData.val() != null) {
        const circle = circleData.val();
        circle.key = circleData.key;
        UserHasCircle(circleData.key).then((userHas) => {
          let newState = this.state;
          if (userHas && circle.status) {
            newState = { prive: false, joined: true };
          } else if (!userHas && !circle.status) {
            newState = { prive: false, joined: false };
          } else {
            newState = { prive: true, joined: false };
          }
          newState.circle = circle;
          newState.loading = false;
          this.setState(newState);
        });
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

  joinCircle() {
    const { key } = this.state.circle;
    const joined = !this.state.joined;
    this.setState({ joined });
    if (!joined) {
      // First we set the mobx store and then we do the request.
      // Firebase pipes the request so they will be set.
      this.props.circles.findItemAndRemove(this.state.circle.key);
      UserLeavesCircle(key).then(() => {});
    } else {
      const { title, desc, img } = this.state.circle;
      this.props.circles.addCircle(key, title, desc, img);
      UserJoinsCircle(key, joined).then(() => {});
    }
  }

  render() {
    let image = null;
    if (!this.state.loading) {
      image = <Image width="250" height="250" src={this.state.circle.img} />;
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
            <button onClick={this.joinCircle}>{this.state.joined ? 'Leave' : 'Join'}</button>
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
        <div>
          <ProductLoader products={this.state.circle.products} />
        </div>
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
  circles: PropTypes.shape({
    circles: PropTypes.object.isRequired,
    addCircle: PropTypes.func.isRequired,
    setCircle: PropTypes.func.isRequired,
    findItemAndRemove: PropTypes.func.isRequired,
  }).isRequired,
};

export default withRouter(CircleDetail);
