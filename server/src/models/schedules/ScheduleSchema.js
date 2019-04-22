var mongoose = require('mongoose');

var ScheduleSchema = new mongoose.Schema({
  startDate : { type : Date, required : true},
  endDate : { type : Date, required : true},
  isActive : Boolean
});

var Schedule = mongoose.model('Schedule', ScheduleSchema);

module.exports = Schedule;