import React from 'react';
import PropTypes from 'prop-types';
import styled from 'react-emotion';
import CircleItem from '../../circle/CircleItem';
import CircleItemAdd from '../../circle/CircleItemAdd';
import firebase from '../../general/firebaseConfig';
import { Random } from '../../general/Functions';

const ImageField = styled.input`
  display: none;
`;

class ImageStep extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      image: null,
      imageSrc: null,
    };
    this.imageLoader = null;
    this.upload = this.upload.bind(this);
  }

  componentDidMount() {
    this.imageLoader = document.querySelector('#imageUploader');
  }

  onChange(event) {
    const reader = new FileReader();
    this.setState({ image: event.target.files[0] }, () => reader.readAsDataURL(this.state.image));

    reader.onload = () => {
      this.setState({ imageSrc: reader.result });
    };
  }

  upload() {
    const storage = firebase.storage();
    const storageRef = storage.ref(`/circle/${Random()}`);
    // const imagesRef = storageRef.child('images');

    storageRef.put(this.state.image).then((snapshot) => {
      console.log('Uploaded a blob or file!');
    });
  }

  render() {
    console.log(Random());
    return (
      <div>
        <h1>Step 2 - image</h1>
        <p>Voeg een plaatje toe om de groep beter te herkennen</p>
        {this.state.imageSrc ? (
          <CircleItem title="" imageSrc={this.state.imageSrc} />
        ) : (
          <CircleItemAdd onClick={() => this.imageLoader.click()} title="Add image" />
        )}
        <ImageField id="imageUploader" alt="test" onChange={e => this.onChange(e)} type="file" />
        <button onClick={() => this.upload()}>Upload</button>
      </div>
    );
  }
}

ImageStep.propTypes = {
  onChange: PropTypes.func.isRequired,
};

export default ImageStep;
