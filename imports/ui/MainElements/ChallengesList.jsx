import React, {Component, PropTypes} from 'react';
import {createContainer} from 'meteor/react-meteor-data';
import ReactDOM from 'react-dom';
import {Meteor} from 'meteor/meteor';
import Navbar from '../SmallElements/Navbar.jsx'
import { Challenges } from "../../api/challenges.jsx";
import Challenge from "../SmallElements/Challenge.jsx";
import LandingNavbar from "../SmallElements/LandingNavbar";
import {Redirect} from 'react-router';

// ProjectsView component - represents the whole app
class ChallengesList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      hideCompleted: false
    };
  }

  toggleHideCompleted() {
    this.setState({
      hideCompleted: !this.state.hideCompleted,
    });
  }

  renderProjects() {
    let filteredChallenges = this.props.challenges;
    // if (this.state.hideCompleted) {
    //   filteredChallenges = filteredChallenges.filter(task => !task.checked);
    // }
    return filteredChallenges.map((challenge) => {
      // const currentUserId = this.props.currentUser && this.props.currentUser._id;
      // const showPrivateButton = challenge.owner === currentUserId;

      return (
        <Challenge
          key={challenge._id}
          challenge={challenge}
        />
      );
    });
  }

  handleSubmit(event) {
    event.preventDefault();

    // Find the text field via the React ref
    const text = ReactDOM.findDOMNode(this.refs.textInput).value.trim();

    Meteor.call('tasks.insert', text);
    // Clear form
    ReactDOM.findDOMNode(this.refs.textInput).value = '';
  }

  render() {
    return (
      <div>
        { Meteor.userId() ? null : <Redirect push to="/main"/> }
        <LandingNavbar/>
        <div className="row my-4">
          <div className="container">
            <h1>Retos activos</h1>
          </div>

        </div>
        <div className="container">
          <hr/>

          <div className="row">
          {this.renderProjects()}
          </div>
        </div>

      </div>
    );
  }
}

export default createContainer(() => {
  Meteor.subscribe('challenges');
  return {
    challenges: Challenges.find({}, {sort: {createdAt: -1}}).fetch(),
    currentUser: Meteor.user(),
  };
}, ChallengesList);