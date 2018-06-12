import React from 'react';
import { MainContainer } from '../general/GlobalCss';
import MultipleStepFrom from '../form/MultipleStepFrom';
import firebase from '../general/firebaseConfig';

// import TitleStep from '../steps/createProduct/TitleStep';
// import ImageStep from '../steps/createProduct/ImageStep';
import AddToCircelStep from '../steps/createProduct/AddToCircelStep';

export default class CreateProduct extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      img: 'https://picsum.photos/200/200/?random',
      userId: 1,
      desc: '',
    };
    this.title = '';
    this.database = firebase.database();
  }

  createProduct() {
    if (this.state.title.length > 0) {
      const {
        title, desc, img, userId,
      } = this.state;
      const ref = this.database.ref('products');
      ref.push({
        title,
        desc,
        userId,
        img,
      });
    } else {
      console.log('error');
    }
  }

  render() {
    return (
      <MainContainer>
        <MultipleStepFrom
          nextStepPossible={this.state.step}
          nextStep={step => this.validate(step)}
          finalAction={() => {
            this.upload();
          }}
          components={[<div>test</div>]}
        />
      </MainContainer>
    );
  }
}
