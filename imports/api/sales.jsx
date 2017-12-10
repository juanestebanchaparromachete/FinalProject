import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Sales = new Mongo.Collection('sales');

if (Meteor.isServer) {
  // This code only runs on the server
  Meteor.publish('sales', function ideasPublication(challengeId) {
    if (challengeId == null)
      return null;
    else
      return Sales.find({challengeId : challengeId+""});
  });
}

Meteor.methods({
    'sales.insert'(sale) {
        // Make sure the user is logged in before inserting a challenge
        if (! Meteor.userId()) {
            throw new Meteor.Error('not-authorized');
        }
        sale.createdAt = new Date();
        sale.owner = Meteor.userId();
        sale.username = Meteor.user().username;
        Sales.insert(sale);
    },
    'sales.add'(sale) {

        // Make sure the user is logged in before inserting a challenge
        if (! Meteor.userId()) {
            throw new Meteor.Error('not-authorized');
        }

        //AGREGAR NUEVA VENTA
        sale.value =Number(sale.value);
        console.log(sale);
        Sales.insert(sale);
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