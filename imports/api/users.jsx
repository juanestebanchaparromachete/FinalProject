import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

// export const Users = Mongo.db('users');

if (Meteor.isServer) {
  // This code only runs on the server
  Meteor.publish('users', function challengePublication(userId) {
    return Meteor.users.find({_id:userId},{fields: {
      '_id': true,
      'username': true,
      'invite': true,
    }});
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
  },
  'users.find2'(text) {

    // Make sure the user is logged in before inserting a challenge
    if (! Meteor.userId()) {
      throw new Meteor.Error('not-authorized');
    }

    return Meteor.users.find({
      _id: text,
    }).fetch();
  },
  'users.updateInvite'(inviteCode) {

    // Make sure the user is logged in before inserting a challenge
    if (! Meteor.userId()) {
      throw new Meteor.Error('not-authorized');
    }

    return Meteor.users.update(this._id, {
      $set: { invite: inviteCode },
    });
  },
  'users.findWithFacebookId'(facebookId) {

    return Meteor.users.find({
      facebookId: facebookId,
    }).fetch();
  }
});