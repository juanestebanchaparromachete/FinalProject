// import React from 'react';
// import { Meteor } from 'meteor/meteor';
// import { shallow, mount, render } from 'enzyme';
// import { assert } from "meteor/practicalmeteor:chai";
// import { chai } from 'meteor/practicalmeteor:chai';
// // import { mount } from 'enzyme';
// import { resetDatabase } from 'meteor/xolvio:cleaner';
// import { sinon } from 'meteor/practicalmeteor:sinon';
// import faker from "faker";
// import { PublicationCollector } from 'meteor/johanbrook:publication-collector';
// import ProjectsView from './ListView/ProjectsView.jsx';
// import Navbar from './SmallElements/NavBar.jsx';
//
// describe('ProjectsView', () => {
//
//   beforeEach(function () {
//     resetDatabase();
//     Factory.define('user', Meteor.users, {
//       username: faker.name.findName(),
//       userId: "j8H12k9l98UjL"
//     });
//     currentUser = Factory.create('user');
//     sinon.stub(Meteor, 'user');
//     sinon.stub(Meteor, 'userId');
//     Meteor.userId.returns(currentUser.userId);
//     Meteor.user.returns(currentUser);
//   });
//
//   afterEach(() => {
//     Meteor.user.restore();
//     Meteor.userId.restore();
//     resetDatabase();
//   });
//
//   it('Should render', () => {
//     // const renderedProjectsView = mount(<ProjectsView />);
//     const renderedProjectsView = shallow(<ProjectsView/>);
//     assert.isTrue(renderedProjectsView == null, false);
//   });
//
//   it('Should render the navbar within it', () => {
//     var renderedProjectsView = shallow(<ProjectsView/>);
//     console.log(renderedProjectsView)
//     assert.isTrue(renderedProjectsView.find('.navbar-nav').length > 0);
//     // assert.equal(renderedProjectsView.find('#optLink').prop('to'), '/ideas');
//     // assert.equal(renderedProjectsView.find('#createLink').prop('to'), '/projects/create');
//   });
//
//   it('Should have the correct amount of list items and sub-components', () => {
//     const renderedNavBar = shallow(<Navbar/>);
//     assert.isTrue(renderedNavBar.find('.container').length > 0)
//     assert.isTrue(renderedNavBar.find('.navbar-nav').length > 0)
//     assert.isTrue(renderedNavBar.find('.nav-item').length == 4)
//   });
// });