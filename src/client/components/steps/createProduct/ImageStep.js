import React from 'react';
import PropTypes from 'prop-types';
import styled from 'react-emotion';

const ImageInput = styled.input`
  display: none;
`;

const ImageLoader = styled.img`
  background: grey;
  width: 200px;
  height: 200px;
`;
const Container = styled.div`
  position: relative;
  width: 200px;
  height: 200px;
  cursor: pointer;
`;
const Holder = styled.div`
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  align-items: center;
  justify-content: center;
`;
const ImageLoaderTitle = styled.div`
  color: white;
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
    console.log(this.props.image);
    return (
      <div>
        <h1>Step 2 - image</h1>
        <p>Voeg een plaatje toe om de groep beter te herkennen</p>
        <Container onClick={() => this.imageLoader.click()}>
          <ImageLoader src={this.props.image} />
          <Holder>
            <ImageLoaderTitle>Add image</ImageLoaderTitle>
          </Holder>
        </Container>
        <ImageInput
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
