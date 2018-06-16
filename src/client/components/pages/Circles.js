import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { observer, inject } from 'mobx-react';

import CircleItem from '../circle/CircleItem';
import CircleItemAdd from '../circle/CircleItemAdd';
import CircleHolder from '../circle/CircleHolder';
import { MainContainer } from '../general/GlobalCss';
import Loader from '../general/Loader';
import { LoadCircles } from '../firebaseRequests/UserRequests';
import { GetCirclesByCircleIds, CancelGetCirclesByCircleIds } from '../firebaseRequests/CircleRequests';

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
      this.loader = false;
      this.setState({ loading: false, hasCircles: true });
    } else {
      // Load the circles
      LoadCircles().then((circlesIds) => {
        if (circlesIds.length > 0) {
          GetCirclesByCircleIds(circlesIds).then((data) => {
            this.props.circles.setCircle(data);
            this.setState({ loading: null, hasCircles: true });
          });
        } else {
          this.setState({ loading: null, hasCircles: false });
        }
      });
    }
  }

  componentWillUnmount() {
    CancelGetCirclesByCircleIds();
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
  circles: PropTypes.shape({
    circles: PropTypes.object.isRequired,
    addCircle: PropTypes.func.isRequired,
    setCircle: PropTypes.func.isRequired,
  }).isRequired,
};

export default Circles;
