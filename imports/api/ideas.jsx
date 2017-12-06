import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const ideas = new Mongo.Collection('ideas');

if (Meteor.isServer) {
  // This code only runs on the server
  Meteor.publish('ideas', function ideasPublication() {
    return ideas.find({
      $or: [
        { private: { $ne: true } },
        { owner: this.userId },
      ],
    });
  });
}

Meteor.methods({
  'ideas.insert'(idea) {
    check(idea, Object);

    // Make sure the user is logged in before inserting a idea
    if (! Meteor.user()) {
      throw new Meteor.Error('not-authorized');
    }

    idea.createdAt = new Date();
    idea.owner = Meteor.userId();
    idea.username = Meteor.user().username
    return ideas.insert(idea);
  },
  'ideas.remove'(ideaId) {
    check(ideaId, String);

    ideas.remove(ideaId);
  },
});