import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

// export const Users = Mongo.db('users');

if (Meteor.isServer) {
  // This code only runs on the server
  Meteor.publish('users', function challengePublication() {
    return Users.find({});
  });
}

Meteor.methods({
  'users.find'(text) {

    // Make sure the user is logged in before inserting a challenge
    if (! Meteor.userId()) {
      throw new Meteor.Error('not-authorized');
    }

    return Meteor.users.find({
      username: text,
    }).fetch();
  }
});