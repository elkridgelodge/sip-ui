Template.nextbutton.events({
  'click .nextbutton': function (e,t) {
    var firstname = document.getElementById('firstname-input').value
    var phone = document.getElementById('phone-input').value
    var email = document.getElementById('email-input').value
    var userObj = {}
    userObj.emails = [{address: email, verified: false}]
    userObj.phones = [{phone: phone, verified: false}]
    if (email && phone) {
      Meteor.call("newUser", userObj, function (e, r) {
        if (!e) {
          Session.set("infocollectstage", 2)
        }
      })
    } else if (!phone || phone == '') {
      alert("Missing phone number")
    } else {
      alert("Missing email")
    }
    console.log("Form submitted.")


  },

})

