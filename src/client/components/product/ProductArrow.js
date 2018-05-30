import React, { Component } from "react";
import styled from "react-emotion";

const Container = styled("div")`
  width: 200px;
  height: 250px;
  box-shadow: 0 3px 6px #d1cccc;
  margin-left: 20px;
`;

export default class ProductContainer extends Component {
  render() {
    return <Container>{this.props.children}</Container>;
  }
}
