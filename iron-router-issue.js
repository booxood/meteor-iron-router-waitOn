Users = new Meteor.Collection('users');


Router.map(function(){
  this.route('home',{
    path: '/',
    template: 'hello',
    // onBeforeAction: function(){
    //   this.subscribe('users').wait();
    // }
    waitOn: function(){
      console.log('router waitOn')
      return Meteor.subscribe('users');
    }
  })
})


if (Meteor.isClient) {
  Template.hello.rendered = function(){
    console.log('template hello rendered');
    var users1 = Users.find().fetch();
    console.log(users1);
    Meteor.defer(function(){
      console.log('meteor defer');
      var users2 = Users.find().fetch();
      console.log(users2);
    })
  }
}

if (Meteor.isServer) {
  //fixtures
  if(Users.find().count() === 0){
    for(var i=0,l=10; i<l; i++){
      Users.insert({
        x: i
      })
    }
  }

  Meteor.publish('users', function(){
    console.log('meteor.publish users');
    return Users.find()
  })
}
