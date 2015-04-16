import React from "react";
import Router from "react-router";
let { Route, RouteHandler, NotFoundRoute, DefaultRoute, Link } = Router;


// Components

import Mood from "./components/mood";
import Stats from "./components/stats";
import Navigation from "./components/navigation";

// API URL's constants

window.API_URL = "http://localhost:5000/api";
window.STATUSES = window.API_URL + "/statuses/";
window.TIMESERIES = window.API_URL + "/timeseries/";

import "./../styles/main.less";

let StressedApp = React.createClass({
  displayName: "StressedApp",

  render() {
    return <div className="streesed-app">
      <div className="stressed-wrapper">
        <RouteHandler />
        <Navigation />
      </div>
    </div>
  }
});

let routes = (
  <Route handler={StressedApp} path="/">
    <DefaultRoute handler={Mood} />
    <Route handler={Mood} name="mood" path="mood" />
    <Route handler={Stats} name="stats" />
    <NotFoundRoute handler={Mood}/>
  </Route>
);


Router.run(routes, Router.HistoryLocation, function(Handler) {
  React.render(<Handler />, document.getElementById("root"));
});
