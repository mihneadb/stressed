"use strict";

import React from "react";
import _ from "lodash";
import fetch from "node-fetch";
import moment from "moment";


let Stats = React.createClass({
  displayName: "Stats",

  statics: {
    DATE_FORMAT: "Do MMMM YYYY"
  },

  getInitialState() {
    return {
      data: []
    };
  },

  componentWillMount() {
    fetch(window.TIMESERIES + "?since=1428613681")
    .then((res) => {
      console.log(res);
        return res.json();
    }).then((json) => {
      var barData = [];
      _.forEach(json, (data) => {
        barData.push(data);
      });
      console.log(barData);
      this.setState({
        data: barData
      });
    });
  },

  render() {
    return <div className="stats stressed-content">
      {!_.isEmpty(this.state.data) ? this.state.data
                                   : null}
    </div>;
  }
});


export default Stats;
