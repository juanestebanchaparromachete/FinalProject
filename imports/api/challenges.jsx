import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
import axios from 'axios';

export const Challenges = new Mongo.Collection('challenges');

if (Meteor.isServer) {
  // This code only runs on the server
  Meteor.publish('challenges', function challengePublication() {
    return Challenges.find({
      $or: [
        { private: { $ne: true } },
        { owner: this.userId },
      ],
    });
  });
}

Meteor.methods({
  'challenges.insert'(challenge) {

    // Make sure the user is logged in before inserting a challenge
    if (! Meteor.userId()) {
      throw new Meteor.Error('not-authorized');
    }
    let searchParam = '';
    for (i = 0; i < challenge.products.length; i++) {
      searchParam += challenge.products[i];
      if (i != challenge.products.length - 1)
        searchParam += "%20";
    }
    let url = "https://www.googleapis.com/customsearch/v1?q="+searchParam+"&cx=009540301129484155775%3Aipvuwikdgdg&imgColorType=color&imgSize=medium&key=AIzaSyA5iFnQCml3976FMNAcFEF-vnsXClgK2B4";
    axios.get(url,
    ).then(response => {
      console.log(response.data.items[0].pagemap.metatags[0]);
      challenge.thumbnail = response.data.items[0].pagemap.metatags[0]['og:image'];
      challenge.createdAt = new Date();
      challenge.owner = Meteor.userId();
      challenge.username = Meteor.user().username;
      return Challenges.insert(challenge);
    })

  },
  'challenges.remove'(challengeId) {
    check(challengeId, String);

    Challenges.remove(challengeId);
  },
  'challenges.setChecked'(challengeId, setChecked) {
    check(challengeId, String);
    check(setChecked, Boolean);

    Challenges.update(challengeId, { $set: { checked: setChecked } });
  },
  'challenges.setPrivate'(challengeId, setToPrivate) {
    check(challengeId, String);
    check(setToPrivate, Boolean);

    const challenge = Challenges.findOne(challengeId);

    // Make sure only the challenge owner can make a challenge private
    if (challenge.owner !== Meteor.userId()) {
      throw new Meteor.Error('not-authorized');
    }

    Challenges.update(challengeId, { $set: { private: setToPrivate } });
  },
});