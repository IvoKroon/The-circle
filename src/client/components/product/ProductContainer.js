import React, { Component } from 'react';
import styled from 'react-emotion';

const Container = styled('div')`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`;

export default class ProductContainer extends Component {
  render() {
    return <Container>{this.props.children}</Container>;
  }
}
