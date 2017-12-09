import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Products = new Mongo.Collection('products');

if (Meteor.isServer) {
  // This code only runs on the server
  Meteor.publish('products', function challengePublication() {
    return Products.find({});
  });
}

Meteor.methods({
  'products.insert'(product) {

    // Make sure the user is logged in before inserting a challenge
    if (! Meteor.userId()) {
      throw new Meteor.Error('not-authorized');
    }

    Products.insert({

      createdAt: new Date(),
      owner: Meteor.userId(),
      username: Meteor.user().username,
    });
  },
  'products.remove'(challengeId) {
    check(challengeId, String);

    Products.remove(challengeId);
  },
  'products.setChecked'(challengeId, setChecked) {
    check(challengeId, String);
    check(setChecked, Boolean);

    Products.update(challengeId, { $set: { checked: setChecked } });
  },
  'products.setPrivate'(challengeId, setToPrivate) {
    check(challengeId, String);
    check(setToPrivate, Boolean);

    const challenge = Products.findOne(challengeId);

    // Make sure only the challenge owner can make a challenge private
    if (challenge.owner !== Meteor.userId()) {
      throw new Meteor.Error('not-authorized');
    }

    Products.update(challengeId, { $set: { private: setToPrivate } });
  },
});