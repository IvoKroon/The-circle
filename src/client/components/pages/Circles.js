import React from 'react';
import styled from 'react-emotion';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { observer, inject } from 'mobx-react';

import firebase from '../general/firebaseConfig';
import SearchBar from '../form/SearchBar';
import CircleItem from '../circle/CircleItem';
import CircleItemAdd from '../circle/CircleItemAdd';
import CircleHolder from '../circle/CircleHolder';
import { MainContainer } from '../general/GlobalCss';
import Loader from '../general/Loader';
import { LoadCircles } from '../firebaseRequests/UserRequests';
import {
  GetCirclesByCircleIds,
  CancelGetCirclesByCircleIds,
} from '../firebaseRequests/CircleRequests';

const SearchBarHolder = styled.div`
  height: 100px;
  width: 100%;
`;

const CircleAddHolder = styled.div`
  margin-top: 20px;
`;

@inject('user', 'circles')
@observer
class Circles extends React.Component {
  constructor(props) {
    super(props);
    this.state = { loading: true, hasCircles: false, results: [] };
    this.loading = true;
    this.searchTerm = '';
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
  search() {
    firebase
      .database()
      .ref('circles')
      .orderByChild('title')
      .equalTo(this.searchTerm)
      .once('value')
      .then((circles) => {
        if (circles.val() !== null) {
          console.log(circles.val());
          const keys = Object.keys(circles.val());
          const values = Object.values(circles.val());

          values.map((circle, key) => {
            const newCircle = circle;
            newCircle.id = keys[key];
            return newCircle;
          });
          console.log(values);
          this.setState({ results: values });
        } else {
          console.log('NOT FOUND');
        }
      });
  }

  render() {
    const searchResults = [];
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
          <h1>Let's find some circles</h1>
          <p>Or you can just create one!</p>
          <CircleAddHolder>
            <Link to="createcircle">
              <CircleItemAdd title="+ add Circle" />
            </Link>
          </CircleAddHolder>
        </div>
      );
    }

    if (this.state.results.length !== 0) {
      for (let i = 0; i < this.state.results.length; i += 1) {
        const circleData = this.state.results[i];
        searchResults.push(<Link key={circleData.id} to={`/circle/${circleData.id}`}>
          <CircleItem title={circleData.title} imageSrc={circleData.img}>
            {this.state.results[i].title}
          </CircleItem>
                           </Link>);
      }
    }

    return (
      <MainContainer>
        <SearchBarHolder>
          <SearchBar
            placeholder="Find a circle..."
            onClick={() => this.search()}
            onChange={(e) => {
              this.searchTerm = e.target.value;
            }}
          />
        </SearchBarHolder>
        <CircleHolder>{searchResults}</CircleHolder>

        {!this.state.loading ? component : <Loader />}
      </MainContainer>
    );
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
