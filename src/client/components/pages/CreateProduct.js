import React from 'react';
import PropTypes from 'prop-types';
import { observer, inject } from 'mobx-react';

import { MainContainer } from '../general/GlobalCss';
import MultipleStepFrom from '../form/MultipleStepFrom';
import firebase from '../general/firebaseConfig';
import TitleStep from '../steps/createProduct/TitleStep';
import ImageStep from '../steps/createProduct/ImageStep';
import AddToCircleStep from '../steps/createProduct/AddToCircleStep';
import { Random } from '../general/Functions';
import { LoadCircles } from '../firebaseRequests/UserRequests';
import { AddNewProduct } from '../firebaseRequests/ProductRequests';
import {
  GetCirclesByCircleIds,
  CancelGetCirclesByCircleIds,
  AddProductToCircle,
} from '../firebaseRequests/CircleRequests';
import Loader from '../general/Loader';
import { Redirect } from 'react-router-dom';

@inject('user', 'circles')
@observer
export default class CreateProduct extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      desc: 'EMPTY',
      allCircles: true,
      image: null,
      imageSrc: null,
      circles: [],
      loading: false,
      redirect: false,
    };
    this.title = '';
    this.database = firebase.database();
    this.changeTitle = this.changeTitle.bind(this);
  }
  // WE NEED TO LOAD THE CIRCLES.
  componentDidMount() {
    LoadCircles().then((circlesIds) => {
      GetCirclesByCircleIds(circlesIds).then((circles) => {
        circles.map((data) => {
          const newData = data;
          newData.state = true;
          return newData;
        });
        this.setState({ circles });
      });
    });
  }

  onChangeImage(event) {
    const reader = new FileReader();
    this.setState({ image: event.target.files[0] }, () => reader.readAsDataURL(this.state.image));

    reader.onload = () => {
      this.setState({ imageSrc: reader.result });
    };
  }

  upload() {
    const imageName = Random();
    const storage = firebase.storage();
    const storageRef = storage.ref(`/products/${imageName}`);
    const metadata = { contentType: this.state.image.type };
    // START LOADING.
    this.setState({ loading: true });

    storageRef.put(this.state.image, metadata).then((snapshot) => {
      snapshot.ref.getDownloadURL().then((downloadURL) => {
        this.createProduct(downloadURL);
      });
    });
  }

  createProduct(url) {
    if (this.state.title.length > 0) {
      this.setState({ loading: true });
      const { title, desc } = this.state;
      const { id } = JSON.parse(localStorage.getItem('user'));
      const productSet = {
        title,
        desc,
        userId: id,
        image: url,
      };
      firebase
        .database()
        .ref('products')
        .push(productSet)
        .then((data) => {
          for (let i = 0; i < this.state.circles.length; i += 1) {
            if (this.state.circles[i].state) {
              const circleId = this.state.circles[i].id;
              firebase
                .database()
                .ref(`circles/${circleId}/products/${data.key}`)
                .update({
                  title,
                  desc,
                  userId: id,
                  image: url,
                })
                .then(() => {
                  console.log('DONE');
                  this.setState({ redirect: true });
                });
            }
          }
        });
    }
  }

  changeTitle(e) {
    this.setState({ title: e.target.value });
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to="/products/" />;
    }
    return (
      <MainContainer>
        {this.state.loading ? (
          <Loader />
        ) : (
          <MultipleStepFrom
            nextStepPossible={this.state.step}
            nextStep={step => true}
            finalAction={() => {
              this.upload();
            }}
            components={[
              <TitleStep title={this.state.title} onChange={this.changeTitle} />,
              <ImageStep image={this.state.imageSrc} onChange={e => this.onChangeImage(e)} />,
              <AddToCircleStep
                update={circles => this.setState(circles)}
                allCircles={this.state.allCircles}
                circles={this.state.circles}
              />,
            ]}
          />
        )}
      </MainContainer>
    );
  }
}
CreateProduct.wrappedComponent.propTypes = {
  user: PropTypes.shape({
    user: PropTypes.object.isRequired,
  }).isRequired,
};
