import React from 'react';
import { Meteor } from 'meteor/meteor';
import { shallow, mount, render } from 'enzyme';
import { assert } from "meteor/practicalmeteor:chai";
import { chai } from 'meteor/practicalmeteor:chai';
import Navbar from './NavBar.jsx'


describe('Navbar', () => {

  it('Should render', () => {
    const renderedNavBar = shallow(<Navbar/>);
    assert.isTrue(renderedNavBar.hasClass('navbar'), true);
  });

  it('Should have the proper routing routes', () => {
    const renderedNavBar = shallow(<Navbar/>);
    console.log(renderedNavBar)
    assert.equal(renderedNavBar.find('#projectLink').prop('to'), '/projects');
    assert.equal(renderedNavBar.find('#optLink').prop('to'), '/ideas');
    assert.equal(renderedNavBar.find('#createLink').prop('to'), '/projects/create');
  });

  it('Should have the correct amount of list items and sub-components', () => {
    const renderedNavBar = shallow(<Navbar/>);
    assert.isTrue(renderedNavBar.find('.container').length > 0)
    assert.isTrue(renderedNavBar.find('.navbar-nav').length > 0)
    assert.isTrue(renderedNavBar.find('.nav-item').length == 4)
  });
});