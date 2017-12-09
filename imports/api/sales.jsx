import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Sales = new Mongo.Collection('sales');

if (Meteor.isServer) {
  // This code only runs on the server
  Meteor.publish('sales', function salePublication() {
    return sales.find({
      $or: [
        { private: { $ne: true } },
        { owner: this.userId },
      ],
    });
  });
}

Meteor.methods({
  'sales.insert'(text) {
    check(text, String);

    // Make sure the user is logged in before inserting a challenge
    if (! Meteor.userId()) {
      throw new Meteor.Error('not-authorized');
    }

    Sales.insert({
      text,
      createdAt: new Date(),
      owner: Meteor.userId(),
      username: Meteor.user().username,
    });
  },
  'sales.remove'(saleId) {
    check(saleId, String);

    Sales.remove(saleId);
  },
  'sales.setChecked'(saleId, setChecked) {
    check(saleId, String);
    check(setChecked, Boolean);

    Sales.update(saleId, { $set: { checked: setChecked } });
  },
  'sales.setPrivate'(saleId, setToPrivate) {
    check(saleId, String);
    check(setToPrivate, Boolean);

    const sale = Sales.findOne(saleId);

    // Make sure only the challenge owner can make a challenge private
    if (sale.owner !== Meteor.userId()) {
      throw new Meteor.Error('not-authorized');
    }

    Sales.update(saleId, { $set: { private: setToPrivate } });
  },
});