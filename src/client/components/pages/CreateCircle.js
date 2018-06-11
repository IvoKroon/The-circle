import React from 'react';
import { MainContainer } from '../general/GlobalCss';
import firebase from '../general/firebaseConfig';
import { LoadImage, LoadMultipleImages } from '../general/FirebaseActions';
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
      step: 0,
      image: false,
      link: null,
    };
    this.title = '';
    this.database = firebase.database();
  }
  componentDidMount() {
    const imageList = ['8q674hjhqi', 'gvnc4ghcz1', 'hnxo4gjiru'];
    LoadMultipleImages(imageList, 'circle').then((urls) => {
      for (let i = 0; i < urls.length; i += 1) {
        document.querySelectorAll('.image')[i].src = urls[i];
      }
    });
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

  validate(step) {
    switch (step) {
      case 0:
        if (this.state.title.length > 2) {
          return true;
        }
        break;
      case 1:
        if (this.state.image) {
          return true;
        }
        break;
      default:
        return false;
    }
    return false;
  }

  render() {
    return (
      <MainContainer>
        <img className="image" src={this.state.link} alt="" />
        <img className="image" src={this.state.link} alt="" />
        <img className="image" src={this.state.link} alt="" />
        <MultipleStepFrom
          nextStepPossible={this.state.step}
          nextStep={step => this.validate(step)}
          components={[
            <TitleStep
              titleValue={this.state.title}
              toggleState={this.state.status}
              onChangeToggle={e => this.setState({ status: e })}
              onChange={e => this.setState({ title: e.target.value })}
            />,
            <ImageStep onChange={e => this.onChangeImage(e)} />,
            <ImageStep onChange={e => this.onChangeImage(e)} />,
          ]}
        />
      </MainContainer>
    );
  }
}

export default CreateCircle;
