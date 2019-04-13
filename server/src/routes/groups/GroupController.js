var Group = require('../../models/groups/GroupSchema.js');

function createGroup(req, res) {
  Group.create(req.body, function (err, group) {
    if (err) {
      res.status(422).json({
        message: err
      });
    }
      else{
        res.status(200).send(group);
      }
  });
}

function listGroups(req, res) {
  Group.find({})
    .populate('students')
    .exec( function(err, groups) {
      if(err) res.status(422).json({code:'422',message:err});
      else{
        res.status(200).send(groups);
      }
    })
}

module.exports = {
  createGroup : createGroup,
  listGroups : listGroups 
}