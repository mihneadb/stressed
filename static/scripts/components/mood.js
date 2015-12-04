"use strict";

import React from "react/addons";
import fetch from "node-fetch";
import Icon from "react-fa";
import classSet from "classnames";

let Mood = React.createClass({
  displayName: "Mood",

  getInitialState() {
    return {
      isLoading_l: false,
      isMoodSet_r: false,
      isLoading_r: false,
      isMoodSet_r: false
    };
  },

  render() {
    let isLoading_l = this.state.isLoading_l,
        isMoodSet_l = this.state.isMoodSet_l,
        isLoading_r = this.state.isLoading_r,
        isMoodSet_r = this.state.isMoodSet_r;

    var buttonClasses_l = classSet({
      "mood-button-left": true,
      "loading": isLoading_l,
      "success": isMoodSet_l
    });

    var buttonClasses_r = classSet({
      "mood-button-right": true,
      "loading": isLoading_r,
      "success": isMoodSet_r
    });

    return <div className="mood moodmeter-content">
      <button className={buttonClasses_l}
            disabled={isLoading_l || isMoodSet_l || isLoading_r || isMoodSet_r}
            onClick={!isLoading_l ? this.setStatus_l : null}>
        {isLoading_l ? <Icon spin name="circle-o-notch" />
                   : isMoodSet_l ? <Icon name="check-circle" />
                               : <Icon name="meh-o" />}
      </button>
      <button className={buttonClasses_r}
             disabled={isLoading_r || isMoodSet_r || isLoading_l || isMoodSet_l}
             onClick={!isLoading_r ? this.setStatus_r : null}>
        {isLoading_r ? <Icon spin name="circle-o-notch" />
                   : isMoodSet_r ? <Icon name="check-circle" />
                               : <Icon name="smile-o" />}
      </button>
    </div>
  },

  setStatus_l() {
    // Replace button state
    this.setState({isLoading_l: true});

    let moodMessage = { message: "stressed" };

    fetch(window.STATUSES, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(moodMessage)
    }).then((res) => {
      setTimeout(() => {

        // Completed of async action, set loading state back
        this.setState({
          isLoading_l: false,
          isMoodSet_l: true
        });
      }, 2000);
    });
  },

  setStatus_r() {
    // Replace button state
    this.setState({isLoading_r: true});

    let moodMessage = { message: "happy" };

    fetch(window.STATUSES, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(moodMessage)
    }).then((res) => {
      setTimeout(() => {

        // Completed of async action, set loading state back
        this.setState({
          isLoading_r: false,
          isMoodSet_r: true
        });
      }, 2000);
    });
  }
});

export default Mood;
