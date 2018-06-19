import React from 'react';
import PropTypes from 'prop-types';
import styled from 'react-emotion';
import CircleItem from '../../circle/CircleItem';
import AddImageToCircle from '../../circle/AddImageToCircle';
import firebase from '../../general/firebaseConfig';

const ImageField = styled.input`
  display: none;
`;
const ImageButtonHolder = styled.div`
margin-top:20px;
  width:150px;
  height:150px;
  margin-left:auto;
  margin-right:auto;
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
        <h1>Create Circle</h1>
        <p>Add a recognizable picture</p>
        <ImageButtonHolder>
          <AddImageToCircle
            src={this.props.image}
            onClick={() => this.imageLoader.click()}
            title="Add image"
          />
        </ImageButtonHolder>
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
