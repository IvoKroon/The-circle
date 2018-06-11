import React from 'react';
import PropTypes from 'prop-types';
import TextField from '../../form/TextField';
import ToggleButton from '../../form/ToggleButton';

const ImageStep = ({
  onChange, onChangeToggle, toggleState, titleValue,
}) => (
  <div>
    <h1>Step 1 - Title</h1>
    <p>Voeg een plaatje toe om de groep beter te herkennen</p>
    <TextField onChange={e => onChange(e)} placeHolder="Title" value={titleValue} />
    <ToggleButton
      onChange={value => onChangeToggle(value)}
      trueValue="Open"
      falseValue="Privé"
      checked={toggleState}
    />
    <button>Create</button>
  </div>
);

ImageStep.propTypes = {
  onChange: PropTypes.func.isRequired,
  onChangeToggle: PropTypes.func.isRequired,
  toggleState: PropTypes.bool.isRequired,
  titleValue: PropTypes.string.isRequired,
};

export default ImageStep;
