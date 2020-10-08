import React, { Component } from "react";
import requireAuth from "./requireAuth";

class Feature extends Component {
  render() {
    return <div> this is the feature! </div>;
  }
}
export default requireAuth(Feature);
