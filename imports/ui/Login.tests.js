import { Factory } from 'meteor/dburles:factory';
import React from 'react';
import { chai } from 'meteor/practicalmeteor:chai';
// import TodoItem from './TodoItem.jsx';
import Task from './SmallElements/Task.jsx'
import { Meteor } from 'meteor/meteor';
import { shallow, mount, render } from 'enzyme';
import { assert } from "meteor/practicalmeteor:chai";
// import { mount } from 'enzyme';
import { resetDatabase } from 'meteor/xolvio:cleaner';
import { sinon } from 'meteor/practicalmeteor:sinon';
import faker from "faker";
import { PublicationCollector } from 'meteor/johanbrook:publication-collector';
import ProjectsView from './ListView/ProjectsView.jsx';
import Navbar from './SmallElements/NavBar.jsx';
import Login from './Login.jsx';

describe('Login', () => {
  it('should render', () => {
    // const renderedProject = shallow(<Login/>);
  });
});