import {Meteor} from 'meteor/meteor';
import '/imports/api/tasks.jsx';
import '/imports/api/challenges.jsx';
import '/imports/api/users.jsx';
import '/imports/api/sales.jsx';

Meteor.startup(() => {
  Accounts.onCreateUser((options, user) => {
    console.log('HERE')
    const customizedUser = Object.assign({
      facebookId : options.facebookId,
      type: options.type,
      invite :options.invite
    }, user);
    return customizedUser;
  });
});
