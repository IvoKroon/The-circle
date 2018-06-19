import React from 'react';
import styled from 'react-emotion';
import PropTypes from 'prop-types';
import TextField from '../../form/TextField';

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

const TitleStep = (props) => {
  const onChange = (e) => {
    onChange(e);
  };
  return (
    <Holder>
      <Header>Add Product</Header>
      <Desc>How is the product called?</Desc>
      <TextFieldHolder>
        <TextField onChange={props.onChange} placeHolder="Title" value={props.title} />
      </TextFieldHolder>
    </Holder>
  );
};

TitleStep.propTypes = {
  onChange: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
};

export default TitleStep;
