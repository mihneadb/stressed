"use strict";

import React from "react";
import _ from "lodash";
import fetch from "node-fetch";
import moment from "moment";
import classSet from "classnames";
<<<<<<< HEAD
import Icon from "react-fa";
=======

>>>>>>> a246be034873584e93e14f33fd910655d58fab21

let Stats = React.createClass({
  displayName: "Stats",

  statics: {
    DATE_FORMAT: "Do MMMM YY"
  },

  getInitialState() {
    return {
<<<<<<< HEAD
      stressed_data: [],
      happy_data: []
=======
      data: []
>>>>>>> a246be034873584e93e14f33fd910655d58fab21
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
<<<<<<< HEAD
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
=======
    const oneWeek = 7 * 24 * 60 * 60;
    const oneWeekSinceNow = currentTime - oneWeek;

    fetch(window.TIMESERIES + "?since=" + oneWeekSinceNow)
>>>>>>> a246be034873584e93e14f33fd910655d58fab21
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
<<<<<<< HEAD
        happy_data: barData,
        maxValue_happy: _.max(json)
=======
        data: barData,
        maxValue: _.max(json)
>>>>>>> a246be034873584e93e14f33fd910655d58fab21
      });
    });
  },

  render() {
    return <div className="stats">
<<<<<<< HEAD
      {!_.isEmpty(this.state.stressed_data) || !_.isEmpty(this.state.happy_data) ? this.renderBarColumn() : null}
=======
      {!_.isEmpty(this.state.data) ? this.renderBarColumn() : null}
>>>>>>> a246be034873584e93e14f33fd910655d58fab21
    </div>;
  },

  renderBarColumn() {
<<<<<<< HEAD
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
=======
    return _.map(this.state.data, (data, index) => {
      let barHeight = Math.round(data.value / this.state.maxValue * 100) + "%";
      let style = {
        height: data.value === 0 ? "100%" : barHeight
      };
      let barClasses = classSet({
        "bar": true,
        "bar-with-no-value": data.value === 0
>>>>>>> a246be034873584e93e14f33fd910655d58fab21
      });

      return <div key={index}
                  className={barClasses}>
        <div className="bar-column">
          <div className="value" style={style}>
<<<<<<< HEAD
            <ul>
              <li>{<Icon name="meh-o" />} {data.value}</li>
              <li>{<Icon name="smile-o" />} {this.state.happy_data[index].value}</li>
            </ul>
=======
            <span>{data.value}</span>
>>>>>>> a246be034873584e93e14f33fd910655d58fab21
          </div>
        </div>
        <div className="date">
          {moment.utc(data.timeframe, 'X').format(this.constructor.DATE_FORMAT)}
        </div>
<<<<<<< HEAD
      </div>
=======
      </div>;
>>>>>>> a246be034873584e93e14f33fd910655d58fab21
    });
  }
});


export default Stats;
