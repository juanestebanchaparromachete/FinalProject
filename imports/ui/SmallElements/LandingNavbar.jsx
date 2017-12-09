import React, {Component, PropTypes} from 'react';
import Modal from 'react-modal';
import {Meteor} from "meteor/meteor";
import {createContainer} from 'meteor/react-meteor-data';
import SweetAlert from 'react-bootstrap-sweetalert'
import {Link} from 'react-router-dom';

class LandingNavbar extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoggingIn: true,
      modalIsOpen: false,
      userId: '',
      password: '',
      sPass1: '',
      sPass2: '',
      sUserId: '',
      sPassword: '',
      sInvite: '',
      alert: null,
      redirect: null
    };
    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.handleLoginSubmit = this.handleLoginSubmit.bind(this);
    this.handleSignUpSubmit = this.handleSignUpSubmit.bind(this);
    this.hideAlert = this.hideAlert.bind(this);
    this.changeLabel = this.changeLabel.bind(this);
    this.redirectBasedOnUserType = this.redirectBasedOnUserType.bind(this);
  }

  hideAlert() {
    this.setState({
      alert: null
    });
  }

  handleSignUpSubmit(event) {
    event.preventDefault();
    let b = this;
    if (this.state.sPass1 != this.state.sPass2) {
      this.setState({
        alert: <SweetAlert
          title={<span>ERROR</span>}
          onConfirm={this.hideAlert}
        >
          <span>The passwords <span style={{color: '#F8BB86'}}>do not match</span></span>
        </SweetAlert>
      });
    }
    else {
      let options = {
        username: this.state.sUserId,
        password: this.state.sPass1,
        type: 'SELLER',
        invite: this.state.sInvite,
      }
      Accounts.createUser(options, {
        password: this.state.sPass1,
        username: this.state.sUserId
      });
      Meteor.loginWithPassword(this.state.sUserId, this.state.sPass1, (error) => {
        if (error) {
          console.log("SMTHNG WENT TERRIBLY WRONG")
        }
        else {
          console.log("WE ARE IN BABY")
          this.setState({modalIsOpen:false});
          b.forceUpdate();
          console.log(b.props)
          redirectBasedOnUserType();
          b.forceUpdate();
        }
      })
    }
    console.log('test')
  }

  handleLoginSubmit(event) {
    event.preventDefault();
    let b = this;
    Meteor.loginWithPassword(this.state.userId, this.state.password, (error) => {
      if (error) {
        this.setState({
          alert: <SweetAlert
            title={<span>ERROR</span>}
            onConfirm={this.hideAlert}
          >
            <span>Your username and/or password <span style={{color: '#F8BB86'}}>is wrong</span>, please try again.</span>
          </SweetAlert>
        });
        console.log(error);
        this.props.error = error.reason;
      }
      else {
        console.log('HERE')
        this.setState({modalIsOpen:false});
        b.forceUpdate();
        console.log(b.props)
        redirectBasedOnUserType();
        b.forceUpdate();
      }
    })
  }

  redirectBasedOnUserType () {
    let b = this;
    Meteor.call('users.find',Meteor.user().username, function (error, result) {
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

  openModal() {
    this.setState({modalIsOpen: true});
  }

  afterOpenModal() {
    // references are now sync'd and can be accessed.
    this.subtitle.style.color = '#f00';
  }

  closeModal() {
    this.setState({modalIsOpen: false});
  }

  changeLabel() {
    let t = this.state.isLoggingIn;
    this.setState({
      isLoggingIn: !t
    });
  }

  render() {
    let contentStyles = {
      overlay: {
        position: 'fixed',
        top: '80px',
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(255, 255, 255, 0.75)'
      },
      content: {
        position: 'absolute',
        top: '40px',
        left: '30%',
        right: '30%',
        bottom: '20px',
        border: '1px solid #ccc',
        background: '#fff',
        overflow: 'auto',
        // WebkitOverflowScrolling    : 'touch',
        borderRadius: '4px',
        outline: 'none',
        padding: '0px'

      }
    };

    return (
      <div>
        {this.state.alert}
        <Modal
          style={contentStyles}
          isOpen={this.state.modalIsOpen}
          shouldCloseOnOverlayClick={true}
          onRequestClose={this.closeModal}
          // onAfterOpen={afterOpenFn}
          // style={customStyle}
          contentLabel="Modal"
        >
          <div id="loginFormLanding">
            <div className="login-wrap">
              <div className="login-html">
                <input id="tab-1" type="radio" name="tab" className="sign-in" checked={this.state.isLoggingIn}
                       onClick={this.changeLabel}/>
                <label htmlFor="tab-1" className="tab">Sign In</label>
                <input id="tab-2" type="radio" name="tab" className="sign-up" checked={!this.state.isLoggingIn}
                       onClick={this.changeLabel}/>
                <label htmlFor="tab-2" className="tab">Sign Up</label>
                <div className="login-form">
                  <form className="sign-in-htm" onSubmit={this.handleLoginSubmit}>
                    <div className="group">
                      <label htmlFor="user" className="label testLabel">Username</label>
                      <input id="user" type="text" className="input"
                             value={this.state.userId}
                             onChange={(event) => this.setState({userId: event.target.value})}
                             required/>
                    </div>
                    <div className="group">
                      <label htmlFor="pass" className="label testLabel">Password</label>
                      <input id="pass" type="password" className="input"
                             value={this.state.password}
                             onChange={(event) => this.setState({password: event.target.value})}
                             required data-type="password"/>
                    </div>
                    <div className="group">
                      <input type="submit" className="button" value="Sign In"/>
                    </div>
                  </form>
                  <form className="sign-up-htm" onSubmit={this.handleSignUpSubmit}>
                    <div className="group">
                      <label htmlFor="user" className="label testLabel">Username</label>
                      <input id="user" type="text" className="input"
                             value={this.state.sUserId}
                             onChange={(event) => this.setState({sUserId: event.target.value})} required/>
                    </div>
                    <div className="group">
                      <label htmlFor="pass" className="label testLabel">Password</label>
                      <input id="pass" type="password" className="input" data-type="password"
                             value={this.state.sPass1}
                             onChange={(event) => this.setState({sPass1: event.target.value})} required/>
                    </div>
                    <div className="group">
                      <label htmlFor="pass" className="label testLabel">Repeat Password</label>
                      <input id="pass" type="password" className="input" data-type="password"
                             value={this.state.sPass2}
                             onChange={(event) => this.setState({sPass2: event.target.value})} required/>
                    </div>
                    <div className="group">
                      <label htmlFor="pass" className="label testLabel">Invite code</label>
                      <input id="pass" type="text" className="input"
                             value={this.state.sInvite}
                             onChange={(event) => this.setState({sInvite: event.target.value})} required/>
                    </div>
                    <div className="group">
                      <input type="submit" className="button" value="Sign Up"/>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </Modal>
        <div className="navbar navbar-default navbar-fixed-top">
          <div className="container">
            <div className="navbar-header">
              <button type="button" className="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
              </button>
              <a className="navbar-brand"><i className="fa fa-bolt"></i></a>
            </div>
            <div className="navbar-collapse collapse">
              <ul className="nav navbar-nav navbar-right">
                {this.props.currentUser ?
                  <li className="active">
                    <Link className="navbarText " id="projectLink" to='/challenges'>Challenges</Link>
                  </li> : null
                }
                {this.props.currentUser ?
                  <li className="active">
                    <Link className="navbarText" id="optLink" to='/publish'>Publish</Link>
                  </li> : null
                }
                  {this.props.currentUser ?
                      <li className="active">
                        <Link className="navbarText" id="optLink" to='/sales'>Assign sale</Link>
                      </li> : null
                  }
                {this.props.currentUser ?
                  <li className="active">
                    <a onClick={() => Meteor.logout()}>Logout: {this.props.currentUser.username}</a>
                  </li> : null
                }
                {!this.props.currentUser ?
                  <li className="active">
                    <a  onClick={() => this.openModal()}>Access your account</a>
                  </li> : null
                }
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default createContainer(() => {
  return {
    currentUser: Meteor.user(),
  };
}, LandingNavbar);