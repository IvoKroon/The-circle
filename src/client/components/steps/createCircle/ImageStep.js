import React from 'react';
import PropTypes from 'prop-types';
import styled from 'react-emotion';
import CircleItem from '../../circle/CircleItem';

class ImageStep extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      image: null,
      imageSrc: null,
    };
    this.imageLoader = null;
    this.onClick = this.onClick.bind(this);
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

  render() {
    return (
      <div>
        <h1>Step 2 - image</h1>
        <p>Voeg een plaatje toe om de groep beter te herkennen</p>
        {this.state.imageSrc ? (
          <CircleItem title="test" imageSrc={this.state.imageSrc} />
        ) : (
          <b>niks</b>
        )}

        <button onClick={() => this.imageLoader.click()}>Add Image</button>
        <input id="imageUploader" alt="test" onChange={e => this.onChange(e)} type="file" />
      </div>
    );
  }
}

ImageStep.propTypes = {
  onChange: PropTypes.func.isRequired,
};

export default ImageStep;
