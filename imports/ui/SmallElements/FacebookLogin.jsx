import React, {Component, PropTypes} from 'react';
import { Link } from 'react-router-dom';
import classnames from 'classnames';
import { Session } from 'meteor/session'
import {createContainer} from 'meteor/react-meteor-data';

// Task component - represents a single todo item
class FacebookLogin extends Component {

  constructor(props){
    super(props)
    this.facebookLogin = this.facebookLogin.bind(this);
  }

  facebookLogin(){
    FB.login(function (response) {
      if (response.authResponse) {
        FB.api('/me', {fields: 'first_name, last_name, email'}, function (meResponse) {
          console.log(meResponse)
          // // CHECK IF THE FACEBOOK ID IS ALREADY IN THE DB
          // $http.get("/v2/clients/facebook/" + meResponse.id).success(function (data) {
          //   // IF IT IS, CREATE THE SESSION
          //   $http.post("/v2/test/session/" + data.id)
          //     .success(function (data2) {
          //       $cookies.putObject("user", data);
          //       $cookies.put("userId", data.id);
          //       $cookies.put("userName", data.name);
          //       $cookies.put("entityUserName", data.username);
          //       $scope.logInProcess = false;
          //       if ($rootScope.logginClientForCheckout) {
          //         window.location.href = window.location.pathname + '#/cart';
          //         $window.cookies = $cookies;
          //         $rootScope.client = data;
          //       }
          //       else
          //         window.location.href = '/';
          //     })
          //     .error(function (error) {
          //       $scope.logInProcess = false;
          //       alert("Something went wrong " + error.message);
          //     });
          // }).error(function (data) {
          //   // IF IT IS NOT, VERIFY HIM WITH DIGITS
          //   $scope.logInProcess = false;
          //   $state.go('user-information');
          // });

        });
      } else {
        $scope.logInProcess = false;
        console.log('User cancelled login or did not fully authorize.');
      }
    }, {scope: 'public_profile, email'});
  }

  render() {
    const taskClassName = classnames({
      // checked: this.props.challenge.checked,
      // private: this.props.challenge.private,
    });
    console.log(this.props)
    return (
      <div className="facebook-button-container">

        <a className="btn btn-block btn-social btn-lg btn-facebook" id="facebook-log-in-button" onClick={this.facebookLogin}>
          <span className="fa fa-facebook"></span>
          <span>Login with facebook</span>
        </a>

      </div>
    );
  }
}

export default createContainer(() => {
  return {
    currentUser: Meteor.user(),
  };
}, FacebookLogin);