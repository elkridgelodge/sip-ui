Meteor.subscribe("userstatus")

Template.callcenterdashboard.helpers({
  callcenterdashboard: function () {
    var userId = Meteor.userId()
    if (userId) {
      var user = Meteor.users.findOne({_id: userId})
      if (user.emails[0].verified == true) {
        return true
      }
    }
  },
  activeusers: function () {
    return Meteor.users.find({"status.idle": false, username: {$exists: 1}})
  },
  idleusers: function () {
    return Meteor.users.find({"status.idle": true, username: {$exists: 1}})
  },
  phoneid: function () {
    return this.username
  },
})
