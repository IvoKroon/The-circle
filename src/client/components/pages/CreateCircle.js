import React from 'react';
import { MainContainer } from '../general/GlobalCss';
import firebase from '../general/firebaseConfig';
import MultipleStepFrom from '../form/MultipleStepFrom';
import TitleStep from '../steps/createCircle/TitleStep';
import ImageStep from '../steps/createCircle/ImageStep';

class CreateCircle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      desc: 'test',
      status: true,
      img: 'https://picsum.photos/200/200/?random',
    };
    this.title = '';
    this.database = firebase.database();
  }

  onChangeImage(event) {
    console.log(event.target.files[0]);
  }

  createCircle() {
    if (this.state.title.length > 0) {
      const { title, desc, status } = this.state;
      // console.log(status);
      const ref = this.database.ref('circles');
      ref.push({
        title,
        desc,
        status,
        img: 'https://picsum.photos/200/200/?random',
      });
    } else {
      console.log('error');
    }
  }

  render() {
    return (
      <MainContainer>
        <MultipleStepFrom
          components={[
            <TitleStep
              titleValue={this.state.title}
              toggleState={this.state.status}
              onChangeToggle={e => this.setState({ status: e })}
              onChange={e => this.setState({ title: e.target.value })}
            />,
            <ImageStep onChange={e => this.onChangeImage(e)} />,
          ]}
        />
        <h1>Create circle</h1>
      </MainContainer>
    );
  }
}

export default CreateCircle;
