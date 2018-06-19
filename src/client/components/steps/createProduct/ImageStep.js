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
margin-top:20px;
  position: relative;
  width: 200px;
  height: 200px;
  cursor: pointer;
  margin-left:auto;
  margin-right:auto;
`;
const ImageContainer = styled.div`
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

const Holder = styled.div`
  width: 250px;
`;

const Desc = styled.div`
  margin-top: 10px;
`;

const Header = styled.h1`
  text-align: center;
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
      <Holder>
        <Header>Create product</Header>
        <Desc>Add a recognizable picture</Desc>
        <Container onClick={() => this.imageLoader.click()}>
          <ImageLoader src={this.props.image} />
          <ImageContainer>
            <ImageLoaderTitle>Add image</ImageLoaderTitle>
          </ImageContainer>
        </Container>
        <ImageInput
          id="imageUploader"
          alt="test"
          onChange={e => this.props.onChange(e)}
          type="file"
        />
      </Holder>
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
