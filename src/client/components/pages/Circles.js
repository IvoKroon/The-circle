import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { observer, inject } from 'mobx-react';

import CircleItem from '../circle/CircleItem';
import CircleItemAdd from '../circle/CircleItemAdd';
import CircleHolder from '../circle/CircleHolder';
import { MainContainer } from '../general/GlobalCss';
import Loader from '../general/Loader';
import firebase from '../general/firebaseConfig';

@inject('user', 'circles')
@observer
class Circles extends React.Component {
  constructor(props) {
    super(props);
    this.state = { loading: true, hasCircles: false };
    this.loading = true;
  }

  componentWillMount() {
    // console.log
    if (this.props.circles.circles.length !== 0) {
      console.log('here');
      this.loader = false;
      this.setState({ loading: false, hasCircles: true });
    } else {
      const messagesRef = firebase
        .database()
        .ref('circles/')
        .limitToLast(3);

      messagesRef.once('value', (snapshot) => {
        console.log(snapshot.val());
        if (snapshot.val() === null) {
          console.log('NO CIRCLES FOUND.');
          this.setState({ loading: null });
        } else {
          const value = snapshot.val();
          const keys = Object.keys(snapshot.val());
          const circles = [];
          for (let i = 0; i < keys.length; i += 1) {
            const key = keys[i];
            // id, title, desc, img
            const circle = { id: key, title: value[key].title, img: value[key].img };
            circles.push(circle);
          }
          this.loading = false;
          this.props.circles.setCircle(circles);
          this.setState({ loading: null, hasCircles: true });
        }
      });
    }
  }

  componentWillUnmount() {
    firebase
      .database()
      .ref('circles')
      .off();
  }

  render() {
    let component = null;
    if (!this.state.loading && this.state.hasCircles) {
      const data = [];
      for (let i = 0; i < this.props.circles.circles.length; i += 1) {
        const circle = this.props.circles.circles[i];
        const circleItems = (
          <Link key={circle.id} to={`/circle/${circle.id}`}>
            <CircleItem title={circle.title} imageSrc={circle.img}>
              {circle.title}
            </CircleItem>
          </Link>
        );
        data.push(circleItems);
      }
      const createCircle = (
        <Link key={0} to="createcircle">
          <CircleItemAdd title="+ add Circle" />
        </Link>
      );

      data.push(createCircle);
      component = <CircleHolder>{data}</CircleHolder>;
    } else {
      component = (
        <div>
          <h1>No circles found.</h1>
          <p>You can join or create one.</p>
          <Link to="createcircle">
            <CircleItemAdd title="+ add Circle" />
          </Link>
        </div>
      );
    }

    return <MainContainer>{!this.state.loading ? component : <Loader />}</MainContainer>;
  }
}

// WE NEED THIS BECAUSE WE INJECT (wrappedComponent).
Circles.wrappedComponent.propTypes = {
  user: PropTypes.shape({
    user: PropTypes.object.isRequired,
  }).isRequired,
  circles: PropTypes.shape({
    circles: PropTypes.object.isRequired,
    addCircle: PropTypes.func.isRequired,
    setCircle: PropTypes.func.isRequired,
  }).isRequired,
};

export default Circles;
