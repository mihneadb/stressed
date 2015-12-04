"use strict";

import React from "react";
import _ from "lodash";
import fetch from "node-fetch";
import moment from "moment";
import classSet from "classnames";
import Icon from "react-fa";

let Stats = React.createClass({
  displayName: "Stats",

  statics: {
    DATE_FORMAT: "Do MMMM YY"
  },

  getInitialState() {
    return {
      stressed_data: [],
      happy_data: []
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
    const tenDays = 9 * 24 * 60 * 60;
    const tenDaysSinceNow = currentTime - tenDays;

    fetch(window.TIMESERIES + "?since=" + tenDaysSinceNow + "&message=stressed")
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
        stressed_data: barData,
        maxValue_stressed: _.max(json)
      });
    });

    fetch(window.TIMESERIES + "?since=" + tenDaysSinceNow + "&message=happy")
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
        happy_data: barData,
        maxValue_happy: _.max(json)
      });
    });
  },

  render() {
    return <div className="stats">
      {!_.isEmpty(this.state.stressed_data) || !_.isEmpty(this.state.happy_data) ? this.renderBarColumn() : null}
    </div>;
  },

  renderBarColumn() {
    let sum_list = _.map(this.state.stressed_data, (data, index) => { return data.value + this.state.happy_data[index].value; });
    return _.map(this.state.stressed_data, (data, index) => {
      let max_sum = _.max(sum_list);
      let p_value = Math.round((data.value + this.state.happy_data[index].value) / max_sum * 100);
      let barHeight = p_value + "%";
      let height_final = p_value < 10 ? "10%" : barHeight
      let style = {
        height: data.value === 0 && this.state.happy_data[index].value === 0 ? "100%" : height_final
      };
      let barClasses = classSet({
        "bar": true,
        "bar-with-no-value": data.value === 0 && this.state.happy_data[index].value === 0
      });

      return <div key={index}
                  className={barClasses}>
        <div className="bar-column">
          <div className="value" style={style}>
            <ul>
              <li>{<Icon name="meh-o" />} {data.value}</li>
              <li>{<Icon name="smile-o" />} {this.state.happy_data[index].value}</li>
            </ul>
          </div>
        </div>
        <div className="date">
          {moment.utc(data.timeframe, 'X').format(this.constructor.DATE_FORMAT)}
        </div>
      </div>
    });
  }
});


export default Stats;
