import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { observer, inject } from 'mobx-react';
import { MainContainer } from '../general/GlobalCss';
import firebase from '../general/firebaseConfig';
import MultipleStepFrom from '../form/MultipleStepFrom';
import TitleStep from '../steps/createCircle/TitleStep';
import ImageStep from '../steps/createCircle/ImageStep';
import Loader from '../general/Loader';
import { Random } from '../general/Functions';

@inject('circles', 'user')
@observer
class CreateCircle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      desc: 'test',
      status: true,
      step: 0,
      image: false,
      imageSrc: null,
      redirect: false,
      loading: false,
    };
    this.title = '';
    this.database = firebase.database();
    this.userId = JSON.parse(localStorage.getItem('user')).id;
    console.log('USEERID', this.userId);
    // console.log(this.props.user.user.id);
  }
  // Load image that is
  onChangeImage(event) {
    const reader = new FileReader();
    this.setState({ image: event.target.files[0] }, () => reader.readAsDataURL(this.state.image));

    reader.onload = () => {
      this.setState({ imageSrc: reader.result });
    };
  }

  // The validator for the next step
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

  upload() {
    const imageName = Random();
    const storage = firebase.storage();
    const storageRef = storage.ref(`/circle/${imageName}`);
    const metadata = { contentType: this.state.image.type };
    // START LOADING.
    this.setState({ loading: true });

    storageRef.put(this.state.image, metadata).then((snapshot) => {
      snapshot.ref.getDownloadURL().then((downloadURL) => {
        this.createCircle(downloadURL);
      });
    });
  }

  createCircle(imageName) {
    if (this.state.title.length > 0) {
      const { title, desc, status } = this.state;

      const ref = this.database.ref('circles');
      ref
        .push({
          title,
          desc,
          status,
          img: imageName,
        })
        .then((data) => {
          console.log(data);
          // ADD CIRCLE TO USER
          const { key } = data;
          const userRef = this.database.ref(`users/${this.userId}/circles`);
          const set = {};
          // set[key] = true;
          set[key] = true;
          userRef.set(set).then(() => {
            this.props.circles.addCircle(key, title, desc, imageName);
            this.setState({ redirect: true });
          });
        });
    } else {
      console.log('error');
    }
  }

  render() {
    const { redirect } = this.state;

    if (redirect) {
      return <Redirect to="/circles" />;
    }

    return (
      <MainContainer>
        {!this.state.loading ? (
          <MultipleStepFrom
            nextStepPossible={this.state.step}
            nextStep={step => this.validate(step)}
            finalAction={() => {
              this.upload();
            }}
            components={[
              <TitleStep
                titleValue={this.state.title}
                toggleState={this.state.status}
                onChangeToggle={e => this.setState({ status: e })}
                onChange={e => this.setState({ title: e.target.value })}
              />,
              <ImageStep image={this.state.imageSrc} onChange={e => this.onChangeImage(e)} />,
            ]}
          />
        ) : (
          <Loader />
        )}
      </MainContainer>
    );
  }
}

CreateCircle.wrappedComponent.propTypes = {
  user: PropTypes.shape({
    user: PropTypes.shape({
      id: PropTypes.number.isRequired,
    }),
  }).isRequired,
  circles: PropTypes.shape({
    circles: PropTypes.object.isRequired,
    addCircle: PropTypes.func.isRequired,
  }).isRequired,
};

export default CreateCircle;
