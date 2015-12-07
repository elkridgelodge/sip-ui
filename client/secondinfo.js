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
    if (Meteor.users.findOne({_id: Meteor.userId()})) {
      return Meteor.users.findOne({_id: Meteor.userId()}).username
    } else {
      return Template.instance().mainnumber.get()
    }
  },
  didnumber: function () {
//console.log(Template.instance().didnumber.get())
    return Session.get("didnumber")
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
    var insecureusername = Session.get("insecureusername")
    console.log(insecureusername)
    var user = Meteor.users.findOne({_id: Meteor.userId()})
    if (user && Session.equals('insecureloggedin', true)) {
//console.log("trying")
      Meteor.call("didnumber", Session.get("insecureusername"), function (e, r) {
        if (r) {
console.log(r)
          console.log(r.content)
          instance.didnumber.set(r.content)
instance.didnumber.set(r)
          Session.set("didnumber", r)
        } else {
          console.log(e)
          Session.set("didnumber", "server error")
        }
      })


    }
  })
}
