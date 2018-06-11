import React from 'react';
import PropTypes from 'prop-types';
import TextField from '../../form/TextField';
import ToggleButton from '../../form/ToggleButton';

const ImageStep = ({
  onChange, onChangeToggle, toggleState, titleValue,
}) => (
  <div>
    <h1>Title toevoegen</h1>
    <p>Wat voor instellingen moeten wij de Circle geven?</p>
    <TextField onChange={e => onChange(e)} placeHolder="Title" value={titleValue} />
    <ToggleButton
      onChange={value => onChangeToggle(value)}
      trueValue="Open"
      falseValue="Privé"
      checked={toggleState}
    />
  </div>
);

ImageStep.propTypes = {
  onChange: PropTypes.func.isRequired,
  onChangeToggle: PropTypes.func.isRequired,
  toggleState: PropTypes.bool.isRequired,
  titleValue: PropTypes.string.isRequired,
};

export default ImageStep;
