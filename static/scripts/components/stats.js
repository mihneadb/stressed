"use strict";

import React from "react";
import _ from "lodash";
import fetch from "node-fetch";
import moment from "moment";
import classSet from "classnames";


let Stats = React.createClass({
  displayName: "Stats",

  statics: {
    DATE_FORMAT: "Do MMMM YY"
  },

  getInitialState() {
    return {
      data: []
    };
  },

  componentWillMount() {
    /*
      Endpoint response for timeseries
      {
        1428537600: 12,
        1428624000: 0,
        1428710400: 32
      }
    */
    const currentTime = Math.round(new Date().getTime() / 1000);
    const oneWeek = 7 * 24 * 60 * 60;
    const oneWeekSinceNow = currentTime - oneWeek;

    fetch(window.TIMESERIES + "?since=" + oneWeekSinceNow)
    .then((res) => {
        return res.json();
    }).then((json) => {
      let barData = [];

      Object.keys(json).map((k) => {
        barData.push({
          timeframe: parseInt(k),
          value: json[k]
        });
      });

      this.setState({
        data: barData,
        maxValue: _.max(json)
      });
    });
  },

  render() {
    return <div className="stats">
      {!_.isEmpty(this.state.data) ? this.renderBarColumn() : null}
    </div>;
  },

  renderBarColumn() {
    return _.map(this.state.data, (data, index) => {
      let barHeight = Math.round(data.value / this.state.maxValue * 100) + "%";
      let style = {
        height: data.value === 0 ? "100%" : barHeight
      };
      let barClasses = classSet({
        "bar": true,
        "bar-with-no-value": data.value === 0
      });

      return <div key={index}
                  className={barClasses}>
        <div className="bar-column">
          <div className="value" style={style}>
            <span>{data.value}</span>
          </div>
        </div>
        <div className="date">
          {moment.utc(data.timeframe, 'X').format(this.constructor.DATE_FORMAT)}
        </div>
      </div>;
    });
  }
});


export default Stats;
