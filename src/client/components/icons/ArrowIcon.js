import React, { Component } from "react";
import { css } from "emotion";

const style = css`
  margin-top: 20px;
  fill: none;
  stroke: #050505;
  stroke-width: 3px;
`;

export default class ArrowIcon extends Component {
  render() {
    return (
      <svg
        height={this.props.height}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="1017.939 2373.939 13.182 22.121"
      >
        <path
          id="Path_11"
          data-name="Path 11"
          className={style}
          d="M1204.039,729.5l10,10-10,10"
          transform="translate(-185.039 1645.5)"
        />
      </svg>
    );
  }
}
