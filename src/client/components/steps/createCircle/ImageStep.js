import React from 'react';
import PropTypes from 'prop-types';
import styled from 'react-emotion';
import CircleItem from '../../circle/CircleItem';
import AddImageToCircle from '../../circle/AddImageToCircle';
import firebase from '../../general/firebaseConfig';

const ImageField = styled.input`
  display: none;
`;

class ImageStep extends React.Component {
  constructor(props) {
    super(props);
    this.imageLoader = null;
  }

  componentDidMount() {
    this.imageLoader = document.querySelector('#imageUploader');
  }

  render() {
    return (
      <div>
        <h1>Step 2 - image</h1>
        <p>Voeg een plaatje toe om de groep beter te herkennen</p>

        <AddImageToCircle
          src={this.props.image}
          onClick={() => this.imageLoader.click()}
          title="Add image"
        />
        <ImageField
          id="imageUploader"
          alt="test"
          onChange={e => this.props.onChange(e)}
          type="file"
        />
      </div>
    );
  }
}

ImageStep.propTypes = {
  image: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

ImageStep.defaultProps = {
  image: null,
};

export default ImageStep;
