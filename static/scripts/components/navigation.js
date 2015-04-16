import React from "react";
import Router from "react-router";
import Icon from "react-fa";
let { Link } = Router;

let Navigation = React.createClass({
  displayName: "Navigation",

  render() {
    return <ul className="navigation">
      <li>
        <Link to="mood"
              bsStyle="link"
              className="mood-button"><Icon name="meh-o" /></Link>
      </li>
      <li>
        <Link to="stats"
              bsStyle="link"
              className="stats-button"><Icon name="line-chart" /></Link>
      </li>
    </ul>
  }
});

export default Navigation;

