import React from 'react';
import PropTypes from 'prop-types';
import { MainContainer } from '../general/Global';

const data = [
  { title: 'Sommelsdijk' },
  { title: 'Boeken' },
  { title: 'Kroontjes' },
  { title: 'Nicolaas beetsstraat' },
];

const Circle = ({ match }) => (
  <MainContainer>
    <h1>{data[match.params.id]}</h1>
  </MainContainer>
);

Circle.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default Circle;
