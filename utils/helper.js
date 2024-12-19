const moment = require("moment");

module.exports = {
  formatTime: (time) => {
    return moment(time, "HH:mm").format("hh:mm A");
  },

  addDelay: (time, delayMinutes) => {
    return moment(time, "HH:mm").add(delayMinutes, "minutes").format("HH:mm");
  },

  isValidTime: (time) => {
    return moment(time, "HH:mm", true).isValid();
  },
};
