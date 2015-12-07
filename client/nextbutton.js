Template.nextbutton.events({
  'click .nextbutton': function (e,t) {
    var phone = document.getElementById('phone-input').value
    Session.set("insecureusername", phone)
    var email = document.getElementById('email-input').value
    var userObj = {}
    userObj.emails = [{address: email, verified: false}]
    userObj.phones = [{phone: phone, verified: false}]
    if (email && phone) {
      Meteor.insecureUserLogin(phone)
      Session.set("insecureloggedin", true)
      var userid = Meteor.userId()
      if (Session.equals("insecureloggedin", true) && Meteor.users.findOne({_id: userid})) {
        Meteor.call("newUser", userObj, function (e, r) {
          if (!e) {
            Meteor.insecureUserLogin(phone)
            console.log("insecure login success")
          } else {
            console.log(e)
          }
        })
      }
    } else if (!phone || phone == '') {
      alert("Missing phone number")
    } else {
      alert("Missing email")
    }
    console.log("Form submitted.")

Session.set("infocollectstage", 2)
  },

})

