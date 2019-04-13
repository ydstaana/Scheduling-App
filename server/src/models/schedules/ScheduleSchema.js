var mongoose = require('mongoose');

var ScheduleSchema = new mongoose.Schema({
  startDate : Date,
  endDate : Date,
});

var Schedule = mongoose.model('Schedule', ScheduleSchema);

module.exports = Schedule;