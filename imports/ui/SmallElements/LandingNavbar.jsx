import React, {Component, PropTypes} from 'react';
import Modal from 'react-modal';
import {Meteor} from "meteor/meteor";
import SweetAlert from 'react-bootstrap-sweetalert';
import {Redirect} from 'react-router';

export default class LandingNavbar extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoggingIn: true,
      modalIsOpen: false,
      userId: '',
      password: '',
      sPass1:'',
      sPass2:'',
      sUserId:'',
      sPassword:'',
      sInvite:'',
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
    this.afterUserLogin = this.afterUserLogin.bind(this);

  }

  hideAlert() {
    this.setState({
      alert: null
    });
  }

  handleSignUpSubmit() {
    event.preventDefault();
    if (this.state.sPass1 != this.state.sPass2){
      this.setState({
        alert: <SweetAlert
          title={<span>ERROR</span>}
          onConfirm={this.hideAlert}
        >
          <span>Las contraseñas <span style={{color:'#F8BB86'}}>no coinciden</span></span>
        </SweetAlert>
      });
    }
    else {
      let options = {
        username: this.state.sUserId,
        password: this.state.sPass1,
        type:'SELLER',
        invite: this.state.sInvite,
      }
      Accounts.createUser(options,{
        password: this.state.sPass1,
        username: this.state.sUserId
      });
      Meteor.loginWithPassword(this.state.sUserId, this.state.sPass1, (error) => {
        if(error){
          console.log("SMTHNG WENT TERRIBLY WRONG")
        }
        else{
          console.log("WE ARE IN BABY")
          this.afterUserLogin();
        }
      })
    }
    event.preventDefault();
    console.log('test')
  }

  handleLoginSubmit() {
    event.preventDefault();
    Meteor.loginWithPassword(this.state.userId, this.state.password, (error) =>{
      if(error){
        this.setState({
          alert: <SweetAlert
            title={<span>ERROR</span>}
            onConfirm={this.hideAlert}
          >
            <span>Tu usuario o contraseña <span style={{color:'#F8BB86'}}>está mal</span>, por favor inténtalo de nuevo.</span>
          </SweetAlert>
        });
        console.log(error);
        this.props.error = error.reason;
      }
      else{
        this.afterUserLogin();
      }
    })
  }

  afterUserLogin(){
    console.log(Meteor.user().username)
    let b = this;
    Meteor.call('users.find', function (error, result) {
      if (error) {
        console.log('bad business');
      }
      else{
        if (result[0].type === "MANAGER"){
          b.setState({
            redirect: <Redirect push to="/challenges"/>
          });
        }
        else if (result[0].type === "SELLER"){
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

  render(){
    let contentStyles ={
      overlay : {
        position          : 'fixed',
        top               : '80px',
        left              : 0,
        right             : 0,
        bottom            : 0,
        backgroundColor   : 'rgba(255, 255, 255, 0.75)'
      },
      content : {
        position                   : 'absolute',
        top                        : '40px',
        left                       : '30%',
        right                      : '30%',
        bottom                     : '20px',
        border                     : '1px solid #ccc',
        background                 : '#fff',
        overflow                   : 'auto',
        // WebkitOverflowScrolling    : 'touch',
        borderRadius               : '4px',
        outline                    : 'none',
        padding                    : '0px'

      }
    };
    return (
      <div>
        {this.state.alert}
        {this.state.redirect}
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
                <input id="tab-1" type="radio" name="tab" className="sign-in" checked={this.state.isLoggingIn} onClick={this.changeLabel}/>
                <label htmlFor="tab-1" className="tab">Sign In</label>
                <input id="tab-2" type="radio" name="tab" className="sign-up" checked={!this.state.isLoggingIn} onClick={this.changeLabel}/>
                <label htmlFor="tab-2" className="tab">Sign Up</label>
                <div className="login-form" >
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
                    <div className="hr"></div>
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
              <a className="navbar-brand" href="#"><i className="fa fa-bolt"></i></a>
            </div>
            <div className="navbar-collapse collapse">
              <ul className="nav navbar-nav navbar-right">
                <li className="active"><a
                  href="#" onClick={() => this.openModal()}>Accede a tu cuenta</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}