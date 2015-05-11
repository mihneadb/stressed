"use strict";

import React from "react/addons";
import fetch from "node-fetch";
import Icon from "react-fa";
import {classSet} from "react/addons"; // eslint-disable-line

let Mood = React.createClass({
  displayName: "Mood",

  getInitialState() {
    return {
      isLoading: false,
      isMoodSet: false
    };
  },

  render() {
    let isLoading = this.state.isLoading,
        isMoodSet = this.state.isMoodSet;

    var buttonClasses = React.addons.classSet({
      "mood-button": true,
      "loading": isLoading,
      "success": isMoodSet
    });

    return <div className="mood stressed-content">
      <button className={buttonClasses}
            disabled={isLoading || isMoodSet}
            onClick={!isLoading ? this.setStatus : null}>
        {isLoading ? <Icon spin name="circle-o-notch" />
                   : isMoodSet ? <Icon name="check" />
                               : <Icon name="meh-o" />}
      </button>
    </div>
  },

  setStatus() {
    // Replace button state
    this.setState({isLoading: true});

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
          isLoading: false,
          isMoodSet: true
        });
      }, 2000);
    });
  }
});

export default Mood;
