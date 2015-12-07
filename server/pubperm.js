Meteor.publish("userdata", function () {
  var userId = this.userId
  return Meteor.users.find({_id: this.userId})
})

Meteor.publish("userstatus", function() {
  return Meteor.users.find()
})
