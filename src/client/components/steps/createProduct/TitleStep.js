import React from 'react';
import PropTypes from 'prop-types';
import TextField from '../../form/TextField';

const TitleStep = (props) => {
  const onChange = (e) => {
    onChange(e);
  };
  return (
    <div>
      <h1>Title toevoegen</h1>
      <p>Wat voor instellingen moeten wij de Circle geven?</p>
      <TextField onChange={props.onChange} placeHolder="Title" value={props.title} />
    </div>
  );
};

TitleStep.propTypes = {
  onChange: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
};

export default TitleStep;
