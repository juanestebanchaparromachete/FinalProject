import { Factory } from 'meteor/dburles:factory';
import React from 'react';
import { chai } from 'meteor/practicalmeteor:chai';
import Task from './Task.jsx'
import { Meteor } from 'meteor/meteor';
import { shallow, mount, render } from 'enzyme';
import { assert } from "meteor/practicalmeteor:chai";
// import { mount } from 'enzyme';
import { resetDatabase } from 'meteor/xolvio:cleaner';
import { sinon } from 'meteor/practicalmeteor:sinon';
import faker from "faker";
import { PublicationCollector } from 'meteor/johanbrook:publication-collector';

describe('Project', () => {
  it('should render', () => {
    const renderedProject = shallow(<Task
      key={2}
      task={
        {
          name: 'hola',
          thumbnail : 'fwgre',
          _id : '9432',
          slogan:'fewgrw'
        }
      }
    />);
    assert.equal(renderedProject == null, false);
    console.log(renderedProject)
  });
  it('should have an id', () => {
    const renderedProject = shallow(<Task
      key={2}
      task={
        {
          name: 'hola',
          thumbnail : 'fwgre',
          _id : '9432',
          slogan:'fewgrw'
        }
      }
    />);
    assert.equal(!renderedProject.contains('<div className="card h-100">'), true);
  });
  it('should have an img', () => {
    const renderedProject = shallow(<Task
      key={2}
      task={
        {
          name: 'hola',
          thumbnail : 'fwgre',
          _id : '9432',
          slogan:'fewgrw'
        }
      }
    />);
    assert.equal(renderedProject.hasClass('col-md-3'), true);
  });
});

describe('ProjectsView', () => {
  it('should render', () => {
  });
  it('should have 4 project components', () => {
  });
  it('should have 5 images images', () => {
  });
  it('should have 4 buttons', () => {
  });
});