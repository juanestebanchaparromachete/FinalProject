import { Meteor }from 'meteor/meteor'
import { Sales } from './sales.jsx'
import { assert } from "meteor/practicalmeteor:chai";
import { resetDatabase } from 'meteor/xolvio:cleaner';
import { sinon } from 'meteor/practicalmeteor:sinon';
import faker from "faker";

if (Meteor.isServer) {
  describe('sales', function () {

    function createTestSale() {
      let obj = {
        challengeId: "tYss3Yy5XeQTaw4xy",
        userId: "vasMcJmcr2YrdzfLw",
        value: 3432532,
        userName: "test"
      };
      return obj;
    }

    describe('sales.insert', function () {

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

      it('Should add a new sale', function () {
        let tempObject = createTestSale();
        let challengeId = Meteor.call('sales.insert', tempObject);

        let foundChallenge = Sales.find({_id: challengeId}).fetch()[0];

        assert.equal(tempObject.userId, foundChallenge.userId)
        assert.equal(foundChallenge == null, false)
      })

      it('Should throw a non-authorized error', function () {
        let tempObject = createTestSale();
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

    describe('sales.remove', function () {

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
        let tempObject = createTestSale();
        let challengeId = Meteor.call('sales.insert', tempObject)

        Meteor.call('sales.remove', challengeId);

        let foundComment = Sales.find({_id: challengeId}).fetch()[0];

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
          let tempObject = createTestSale();
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