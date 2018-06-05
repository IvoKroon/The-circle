import React from 'react';
import TextField from '../form/TextField';

import { MainContainer } from '../general/GlobalCss';
import firebase from '../general/firebaseConfig';

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
        <h1>Create Product</h1>
        <TextField
          onChange={e => this.setState({ title: e.target.value })}
          placeHolder="Product title"
        />
        <TextField
          onChange={e => this.setState({ desc: e.target.value })}
          placeHolder="Product description"
        />
        <button onClick={() => this.createProduct()}>Create</button>
      </MainContainer>
    );
  }
}
