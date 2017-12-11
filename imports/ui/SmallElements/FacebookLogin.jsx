import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router-dom';
import classnames from 'classnames';
import {Session} from 'meteor/session'
import {createContainer} from 'meteor/react-meteor-data';
import SweetAlert from 'react-bootstrap-sweetalert'

// Task component - represents a single todo item
class FacebookLogin extends Component {

  constructor(props) {
    super(props)
    this.state = {
      alert: null
    }
    this.facebookLogin = this.facebookLogin.bind(this);
    this.hideAlert = this.hideAlert.bind(this);
  }

  hideAlert() {
    this.setState({
      alert: null
    });
  }

  facebookLogin() {
    let b = this;
    FB.login(function (response) {
      if (response.authResponse) {
        FB.api('/me', {fields: 'first_name, last_name, email'}, function (meResponse) {
          // CHECK IF THE FACEBOOK ID IS ALREADY IN THE DB
          Meteor.call('users.findWithFacebookId', meResponse.id, function (error, result) {
            if (error) {
              console.log('bad business');
            }
            else {
              if (result.length == 0) {
                let info = {
                  username: meResponse.first_name + "" + meResponse.last_name,
                  password: meResponse.first_name + "-" + meResponse.last_name + "-"+meResponse.id,
                  facebookId: meResponse.id
                }
                b.props.signupFunction(info);
              }
              else{
                let info = {
                  username: meResponse.first_name + "" + meResponse.last_name,
                  password: meResponse.first_name + "-" + meResponse.last_name + "-"+meResponse.id,
                }
                b.props.loginFunction(info);
              }
            }
          });
        });
      } else {
        console.log('User cancelled login or did not fully authorize.');
      }
    }, {scope: 'public_profile, email'});
  }

  render() {
    const taskClassName = classnames({
      // checked: this.props.challenge.checked,
      // private: this.props.challenge.private,
    });
    return (
      <div>
        {this.state.alert}
        <div className="facebook-button-container">
          <a className="btn btn-block btn-social btn-lg btn-facebook" id="facebook-log-in-button"
             onClick={this.facebookLogin}>
            <span className="fa fa-facebook"></span>
            <span>Login with facebook</span>
          </a>
        </div>
      </div>
    );
  }
}

export default createContainer(() => {
  Meteor.subscribe('users')
  return {
    currentUser: Meteor.user(),
  };
}, FacebookLogin);