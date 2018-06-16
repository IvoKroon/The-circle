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
      const { title, desc } = this.state;
      const { id } = JSON.parse(localStorage.getItem('user'));
      AddNewProduct(title, desc, url).then((data) => {
        for (let i = 0; i < this.state.circles.length; i += 1) {
          if (this.state.circles[i].state) {
            const circleId = this.state.circles[i].id;
            AddProductToCircle(circleId, data.key).then(() => {
              console.log('DONE');
            });
          }
        }
      });

      // const productRef = this.database.ref('products');
      // productRef
      //   .push({
      //     title,
      //     desc,
      //     userId: id,
      //     image: url,
      //   })
      //   .then((data) => {
      //     console.log(data.key);
      //     // NOW WE NEED TO SET THIS KEY TO ALL THE SELECTED CIRLCES
      //     // const
      //     // const updates = {};
      //     for (let i = 0; i < this.state.circles.length; i += 1) {
      //       if (this.state.circles[i].state) {
      //         const circleId = this.state.circles[i].id;
      //         firebase
      //           .database()
      //           .ref(`circles/${circleId}/products`)
      //           .push(data.key)
      //           .then((error) => {
      //             console.log('DONE');
      //             console.log(error);
      //           });
      //       }
      //     }
      //   });
    } else {
      console.log('error');
    }
  }

  changeTitle(e) {
    this.setState({ title: e.target.value });
  }

  render() {
    return (
      <MainContainer>
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
        <button onClick={() => console.log(this.state)}>Submit</button>
      </MainContainer>
    );
  }
}
CreateProduct.wrappedComponent.propTypes = {
  user: PropTypes.shape({
    user: PropTypes.object.isRequired,
  }).isRequired,
};
