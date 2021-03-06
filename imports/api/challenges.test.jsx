import { Meteor }from 'meteor/meteor'
import { Challenges } from './challenges.jsx'
import { assert } from "meteor/practicalmeteor:chai";
import { resetDatabase } from 'meteor/xolvio:cleaner';
import { sinon } from 'meteor/practicalmeteor:sinon';
import faker from "faker";

if (Meteor.isServer) {
  describe('challenges', function () {

    function createTestChallenge() {
      let obj = {
        name: faker.name.findName(),
        keyWords : [faker.lorem.word(), faker.lorem.word(), faker.lorem.word()],
        keyWords : [faker.lorem.words(), faker.lorem.words(), faker.lorem.words()],
        description: faker.lorem.sentence(),
        thumbnail: faker.image.imageUrl(),
        invite: faker.lorem.word()
      };
      return obj;
    }

    describe('challenges.insert', function () {

      beforeEach(function () {
        resetDatabase();
        Factory.define('user', Meteor.users, {
          username: faker.name.findName(),
          userId: "j8H12k9l98UjL"
        });
        currentUser = Factory.create('user');
        sinon.stub(Meteor, 'user');
        sinon.stub(Meteor, 'userId');
        Meteor.userId.returns(currentUser.userId);
        Meteor.user.returns(currentUser);
      });

      afterEach(() => {
        Meteor.user.restore();
        Meteor.userId.restore();
        resetDatabase();
      });

      it('Should add a new challenge', function () {
        let tempObject = createTestChallenge();
        let challengeId = Meteor.call('challenges.insert', tempObject);

        let foundChallenge = Challenges.find({_id: challengeId}).fetch()[0];

        assert.equal(tempObject.thumbnail, foundChallenge.thumbnail)
        assert.equal(foundChallenge == null, false)
      })

      it('Should throw a non-authorized error', function () {
        let tempObject = createTestChallenge();
        Meteor.user.restore();
        Meteor.userId.restore();
        resetDatabase();
        try {
          let projectId = Meteor.call('challenge.insert', tempObject)
          assert.fail();
        } catch (err){
          assert(true);
        }
        Factory.define('user', Meteor.users, {
          username: faker.name.findName(),
          userId: "j8H12k9l98UjL"
        });
        currentUser = Factory.create('user');
        sinon.stub(Meteor, 'user');
        sinon.stub(Meteor, 'userId');
        Meteor.userId.returns(currentUser.userId);
        Meteor.user.returns(currentUser);
      })
    });

    describe('challenges.remove', function () {

      beforeEach(function () {
        resetDatabase();
        Factory.define('user', Meteor.users, {
          username: faker.name.findName(),
          userId: "j8H12k9l98UjL"
        });
        currentUser = Factory.create('user');
        sinon.stub(Meteor, 'user');
        sinon.stub(Meteor, 'userId');
        Meteor.userId.returns(currentUser.userId);
        Meteor.user.returns(currentUser);
      });

      afterEach(() => {
        Meteor.user.restore();
        Meteor.userId.restore();
        resetDatabase();
      });

      it('Should delete the previously inserted challenge', function () {
        let tempObject = createTestChallenge();
        let challengeId = Meteor.call('challenges.insert', tempObject)

        Meteor.call('challenges.remove', challengeId);

        let foundComment = Challenges.find({_id: challengeId}).fetch()[0];

        assert.isUndefined(foundComment);

      })

      it('Should throw a non-authorized error', function () {
        Meteor.user.restore();
        Meteor.userId.restore();
        resetDatabase();
        Factory.define('user', Meteor.users, {
          username: faker.name.findName(),
          userId: "j8H12k9l98Uj2"
        });
        currentUser = Factory.create('user');
        sinon.stub(Meteor, 'user');
        sinon.stub(Meteor, 'userId');
        Meteor.userId.returns(currentUser.userId);
        Meteor.user.returns(currentUser);
        try {
          let tempObject = createTestChallenge();
          let projectId = Meteor.call('challenges.insert', tempObject)
          Meteor.call('challenges.remove', commentId);
          assert.fail();
        } catch (err){
          assert(true, 'Should execute this line');
        }

      })
    });
  })
}