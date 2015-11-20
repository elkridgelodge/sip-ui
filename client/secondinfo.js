Meteor.subscribe('userdata', function () {
  Session.set('userdata_loaded', true)
})

Session.setDefault('othernumber', '')

Template.secondinfo.helpers({
  stagetwo: function () {
    return Session.equals("infocollectstage", 2)
  },
  mainnumber: function () {
//console.log(Template.instance().mainnumber.get())
    return Template.instance().mainnumber.get()
  },
  didnumber: function () {
//console.log(Template.instance().didnumber.get())
    return Template.instance().didnumber.get()
  },
})

Template.secondinfo.created = function () {
  var instance = this
  instance.mainnumber = new ReactiveVar('')
  this.autorun(function () {
//console.log(Meteor.users.findOne())
    var user = Meteor.users.findOne()
    if (user && Session.equals('userdata_loaded', true)) {
      var user = Meteor.users.findOne()
//      console.log(instance.mainnumber.get())
      Meteor.call("mainnumber", user._id, function (e, r) {
        if (!e) {
          console.log(r)
          instance.mainnumber.set(r)
        }
      })
    }    
  })

  instance.didnumber = new ReactiveVar(Session.get('othernumber'))
  this.autorun(function () {
    var user = Meteor.users.findOne()
    if (user && Session.equals('userdata_loaded', true) && Session.equals('othernumber', '')) {
//console.log("trying")
      Meteor.call("didnumber", user._id, function (e, r) {
        if (!e) {
          console.log(e)
          console.log(r)
          instance.didnumber.set(r)
          Session.set('othernumber', r)
        } else {
          console.log(e)
        }
      })


    }
  })
}
