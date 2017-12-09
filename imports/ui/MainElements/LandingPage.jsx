import React, {Component, PropTypes} from 'react';
import {createContainer} from 'meteor/react-meteor-data';
import ReactDOM from 'react-dom';
import {Meteor} from 'meteor/meteor';
import LandingNavbar from '../SmallElements/LandingNavbar.jsx'
import {Redirect} from 'react-router';

export default class LandingPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      hideCompleted: false,
    };
    this.redirectBasedOnUserType = this.redirectBasedOnUserType.bind(this);
  }

  toggleHideCompleted() {
    this.setState({
      hideCompleted: !this.state.hideCompleted,
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

  redirectBasedOnUserType () {
    let b = this;
    Meteor.call('users.find', function (error, result) {
      if (error) {
        console.log('bad business');
      }
      else {
        console.log(result)
        if (result[0].type === "MANAGER") {
          b.setState({
            redirect: <Redirect push to="/challenges"/>
          });
        }
        else if (result[0].type === "SELLER") {
          b.setState({
            redirect: <Redirect push to="/challenges"/>
          });
        }
      }
    });
  }

  render() {
    if (Meteor.userId())
      this.redirectBasedOnUserType();
    return (
      <div>
        {this.state.redirect}
        <LandingNavbar />
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