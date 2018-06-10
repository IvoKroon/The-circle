import React from 'react';
import PropTypes from 'prop-types';
import { observer, inject } from 'mobx-react';

import CircleItem from '../circle/CircleItem';
import CircleItemAdd from '../circle/CircleItemAdd';
import CircleHolder from '../circle/CircleHolder';
import { MainContainer } from '../general/GlobalCss';
import Loader from '../general/Loader';
import firebase from '../general/firebaseConfig';

@inject('store')
@observer
class Circles extends React.Component {
  constructor(props) {
    super(props);
    this.state = { loading: true };
    this.loading = true;
  }


  componentWillMount() {
    if (this.props.store.circles.length !== 0) {
      this.loader = false;
      this.setState({ loading: false });
    } else {
      const messagesRef = firebase
        .database()
        .ref('circles')
        .limitToLast(3);

      messagesRef.once('value', (snapshot) => {
        const value = snapshot.val();
        const keys = Object.keys(snapshot.val());
        const circles = [];
        for (let i = 0; i < keys.length; i += 1) {
          const key = keys[i];
          const circle = { id: key, title: value[key].title, img: value[key].img };
          circles.push(circle);
        }
        this.loading = false;
        this.props.store.setCircle(circles);
        this.setState({ loading: null });
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
    console.log('render');
    const data = [];
    // console.log(this.props.store.circles.length);
    for (let i = 0; i < this.props.store.circles.length; i += 1) {
      const circle = this.props.store.circles[i];
      // console.log(circle);
      const circleItems = (
        <CircleItem
          linkTo={`/circle/${circle.id}`}
          circleName={circle.title}
          imageSrc={circle.img}
          key={circle.id}
        >
          {circle.title}
        </CircleItem>
      );
      data.push(circleItems);
    }
    data.push(<CircleItemAdd key={0} />);

    return (
      <MainContainer>
        {!this.state.loading ? <CircleHolder>{data}</CircleHolder> : <Loader />}
      </MainContainer>
    );
  }
}

// WE NEED THIS BECAUSE WE INJECT (wrappedComponent).
Circles.wrappedComponent.propTypes = {
  store: PropTypes.shape({
    circles: PropTypes.object.isRequired,
    addCircle: PropTypes.func.isRequired,
    setCircle: PropTypes.func.isRequired,
  }).isRequired,
};

export default Circles;
