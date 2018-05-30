import React, { Component } from "react";
import { injectGlobal } from "emotion";
import Home from "./components/pages/Home";

injectGlobal(`
  body {
    margin:0;
    padding:0;
    box-sizing: border-box;
    font-family: "HelveticaNeue-Light", "Helvetica Neue Light", "Helvetica Neue", Helvetica, Arial, "Lucida Grande", sans-serif; 
  }
`);
export default class App extends Component {
  render() {
    return (
      <div>
        <Home />
      </div>
    );
  }
}
