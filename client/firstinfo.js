Template.firstinfo.helpers({
  stageone: function () {
    var userId = Meteor.userId()
    if (!userId || !Meteor.users.findOne({_id: userId, phones: {$eq: null}})) {
      return Session.equals("infocollectstage", 1)
    } else {
      return false
    }
  },
/*
  email: function () {
    return Meteor.users.findOne({_id: Meteor.userId()}).emails[0].email
  },
  phone: function () {
    return Meteor.users.findOne({_id: Meteor.userId()}).phones[0].phone
  },
*/
})

