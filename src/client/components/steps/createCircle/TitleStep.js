import React from 'react';
import styled from 'react-emotion';
import PropTypes from 'prop-types';
import TextField from '../../form/TextField';
import ToggleButton from '../../form/ToggleButton';

const Holder = styled.div`
  width: 250px;
`;

const Desc = styled.div`
  margin-top: 10px;
`;

const TextFieldHolder = styled.div`
  margin-top: 20px;
`;

const Header = styled.h1`
  text-align: center;
`;

const ImageStep = ({
  onChange, onChangeToggle, toggleState, titleValue,
}) => (
  <Holder>
    <Header>Create Circle</Header>
    <Desc>For creating a new circle we need you to fill in a title.</Desc>
    <TextFieldHolder>
      <TextField onChange={e => onChange(e)} placeHolder="Title" value={titleValue} />
    </TextFieldHolder>
    <ToggleButton
      onChange={value => onChangeToggle(value)}
      trueValue="Open"
      falseValue="Privé"
      checked={toggleState}
    />
  </Holder>
);

ImageStep.propTypes = {
  onChange: PropTypes.func.isRequired,
  onChangeToggle: PropTypes.func.isRequired,
  toggleState: PropTypes.bool.isRequired,
  titleValue: PropTypes.string.isRequired,
};

export default ImageStep;
