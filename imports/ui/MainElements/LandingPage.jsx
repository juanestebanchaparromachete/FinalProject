import React, {Component, PropTypes} from 'react';
import {createContainer} from 'meteor/react-meteor-data';
import ReactDOM from 'react-dom';
import {Meteor} from 'meteor/meteor';
import LandingNavbar from '../SmallElements/LandingNavbar.jsx'


// ProjectsView component - represents the whole app
export default class LandingPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      hideCompleted: false,
    };
  }

  toggleHideCompleted() {
    this.setState({
      hideCompleted: !this.state.hideCompleted,
    });
  }

  // renderProjects() {
  //   let filteredChallenges = this.props.challenges;
  //   // if (this.state.hideCompleted) {
  //   //   filteredChallenges = filteredChallenges.filter(task => !task.checked);
  //   // }
  //   return filteredChallenges.map((challenge) => {
  //     // const currentUserId = this.props.currentUser && this.props.currentUser._id;
  //     // const showPrivateButton = challenge.owner === currentUserId;
  //
  //     return (
  //       <Challenge
  //         key={challenge._id}
  //         challenge={challenge}
  //       />
  //     );
  //   });
  // }

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
        <LandingNavbar/>
        <div id="hello">
          <div className="container">
            <div className="row">
              <div className="col-lg-10 col-lg-offset-1 centered">
                <h1>ALPRECIO-RETOS</h1>
                <h2>Publica y maneja retos con tus vendedores</h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}