import React, {Component, PropTypes} from 'react';
import Modal from 'react-modal';

export default class LandingNavbar extends Component {

  constructor(props) {
    super(props);
    this.state = {
      modalIsOpen: false
    };
    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
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
                <input id="tab-1" type="radio" name="tab" className="sign-in" checked/>
                <label htmlFor="tab-1" className="tab">Sign In</label>
                <input id="tab-2" type="radio" name="tab" className="sign-up"/>
                <label htmlFor="tab-2" className="tab">Sign Up</label>
                <div className="login-form">
                  <div className="sign-in-htm">
                    <div className="group">
                      <label htmlFor="user" className="label testLabel">Username</label>
                      <input id="user" type="text" className="input"/>
                    </div>
                    <div className="group">
                      <label htmlFor="pass" className="label testLabel">Password</label>
                      <input id="pass" type="password" className="input" data-type="password"/>
                    </div>
                    <div className="group">
                      <input type="submit" className="button" value="Sign In"/>
                    </div>
                    <div className="hr"></div>
                  </div>
                  <div className="sign-up-htm">
                    <div className="group">
                      <label htmlFor="user" className="label testLabel">Username</label>
                      <input id="user" type="text" className="input"/>
                    </div>
                    <div className="group">
                      <label htmlFor="pass" className="label testLabel">Password</label>
                      <input id="pass" type="password" className="input" data-type="password"/>
                    </div>
                    <div className="group">
                      <label htmlFor="pass" className="label testLabel">Repeat Password</label>
                      <input id="pass" type="password" className="input" data-type="password"/>
                    </div>
                    <div className="group">
                      <label htmlFor="pass" className="label testLabel">Email Address</label>
                      <input id="pass" type="text" className="input"/>
                    </div>
                    <div className="group">
                      <input type="submit" className="button" value="Sign Up"/>
                    </div>

                  </div>
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