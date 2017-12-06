import { Meteor } from 'meteor/meteor';
import { Email } from 'meteor/email';
import '/imports/api/tasks.jsx';
import '/imports/api/ideas.jsx';
import '/imports/api/comments.jsx';


Meteor.startup(() => {
  // code to run on server at startup
});

// Server: Define a method that the client can call.
Meteor.methods({
    sendEmail(to, from, subject, text) {
        // Make sure that all arguments are strings.
        // check([to, from, subject, text], [String]);
        // Let other method calls from the same client start running, without
        // waiting for the email sending to complete.
        this.unblock();
        Email.send({ to, from, subject, text });
    }
});

