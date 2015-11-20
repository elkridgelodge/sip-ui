Meteor.methods({
  mainnumber: function (userid) {
console.log(Meteor.users.findOne({_id: userid}).phones)
    return Meteor.users.findOne({_id: userid}).phones[0].phone
  },
  didnumber: function (userid) {

    try {
      var client = Soap.createClient(url);
      var result = client.MyFunction(args);

      console.log("SOAP result is " + result);
    }
    catch (err) {
      if(err.error === 'soap-creation') {
        console.log('SOAP Client creation failed');
      }
      else if (err.error === 'soap-method') {
        console.log('SOAP Method call failed');
      }
    return result
    }

  },
})

Meteor.publish("userdata", function () {
  var userId = this.userId
  return Meteor.users.find({_id: this.userId})
})
