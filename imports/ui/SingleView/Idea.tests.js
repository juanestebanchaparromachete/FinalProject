import { Factory } from 'meteor/dburles:factory';
import React from 'react';
import { chai } from 'meteor/practicalmeteor:chai';
import Idea from './Idea.jsx'
import { Meteor } from 'meteor/meteor';
import { shallow, mount, render } from 'enzyme';
import { assert } from "meteor/practicalmeteor:chai";
import { resetDatabase } from 'meteor/xolvio:cleaner';
import { sinon } from 'meteor/practicalmeteor:sinon';
import faker from "faker";
import { PublicationCollector } from 'meteor/johanbrook:publication-collector';

describe('Idea', () => {
  it('should render', () => {
    const renderedIdea = shallow(<Idea
      key={2}
      idea={
        {
          name: 'hola',
          thumbnail : 'fwgre',
          _id : '9432',
          slogan:'fewgrw'
        }
      }
    />);
    assert.equal(renderedIdea == null, false);
    console.log(renderedIdea)
  });
  it('should have an id', () => {
    const renderedIdea = shallow(<Idea
      key={2}
      idea={
        {
          name: 'hola',
          thumbnail : 'fwgre',
          _id : '9432',
          slogan:'fewgrw'
        }
      }
    />);
    assert.equal(!renderedIdea.contains('<div className="card h-100">'), true);
  });
  it('should have an img', () => {
    const renderedIdea = shallow(<Idea
      key={2}
      idea={
        {
          name: 'hola',
          thumbnail : 'fwgre',
          _id : '9432',
          slogan:'fewgrw'
        }
      }
    />);
    assert.equal(renderedIdea.hasClass('col-md-3'), true);
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