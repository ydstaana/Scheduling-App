var Schedule = require('../../models/schedules/ScheduleSchema.js');

function createSchedule(req, res) {
  Schedule.create(req.body, function (err, sched) {
    if (err) {
      res.status(422).json({
        message: err
      });
    }
    else{
      res.status(200).send(sched);
    }
  });
};

function listSchedules(req, res) {
  Schedule.find({}, function(err, scheds) {
    if (err) {
      res.status(422).json({
        message: err
      });
    }
    else{
      res.status(200).send(scheds);
    }
  })
}

module.exports = {
  createSchedule : createSchedule,
  listSchedules : listSchedules
}