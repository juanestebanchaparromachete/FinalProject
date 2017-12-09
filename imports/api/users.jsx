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
  'users.find'() {

    // Make sure the user is logged in before inserting a challenge
    if (! Meteor.userId()) {
      throw new Meteor.Error('not-authorized');
    }

    return Meteor.users.find({
      username: Meteor.user().username,
    }).fetch();
  }
  // 'challenges.remove'(challengeId) {
  //   check(challengeId, String);
  //
  //   Challenges.remove(challengeId);
  // },
  // 'challenges.setChecked'(challengeId, setChecked) {
  //   check(challengeId, String);
  //   check(setChecked, Boolean);
  //
  //   Challenges.update(challengeId, { $set: { checked: setChecked } });
  // },
  // 'challenges.setPrivate'(challengeId, setToPrivate) {
  //   check(challengeId, String);
  //   check(setToPrivate, Boolean);
  //
  //   const challenge = Challenges.findOne(challengeId);
  //
  //   // Make sure only the challenge owner can make a challenge private
  //   if (challenge.owner !== Meteor.userId()) {
  //     throw new Meteor.Error('not-authorized');
  //   }
  //
  //   Challenges.update(challengeId, { $set: { private: setToPrivate } });
  // },
});