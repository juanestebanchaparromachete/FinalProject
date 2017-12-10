import React, {Component, PropTypes} from 'react';
import {Meteor} from 'meteor/meteor';
import {Redirect} from 'react-router';
import {createContainer} from 'meteor/react-meteor-data';
import LandingNavbar from '../SmallElements/LandingNavbar.jsx'
import {Session} from 'meteor/session'
import {confirmAlert} from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'
import UserCard from "../SmallElements/UserCard"; // Import css

class SingleChallenge extends Component {

  constructor(props) {
    super(props);
    window.scrollTo(0, 0);
    this.state = {
      challenge: props.location.query,
      value: '',
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.deleteProject = this.deleteProject.bind(this);
  }

  renderUsers() {
    // let filteredTasks = this.props.comments;
    // // if (this.state.hideCompleted) {
    // //   filteredTasks = filteredTasks.filter(task => !task.checked);
    // // }
    // return filteredTasks.map((task, i) => {
    //   const currentUserId = this.props.currentUser && this.props.currentUser._id;
    //   // const showPrivateButton = task.owner === currentUserId;
    //   return (
    //     <Comment
    //       key={i}
    //       comment={task}
    //     />
    //   );
    // });
  }


  deleteProject() {
    // confirmAlert({
    //   title: '¿Seguro que quieres borrar este proyecto?',                        // Title dialog
    //   message: 'Se eliminará el proyecto, los requerimientos y los comentarios.',               // Message dialog
    //   // childrenElement: () => <div>Custom UI</div>,       // Custom UI or Component
    //   confirmLabel: 'Confirmar',                           // Text button confirm
    //   cancelLabel: 'Cancelar',                             // Text button cancel
    //   onConfirm: () => this.submitDelete(),    // Action after Confirm
    //   onCancel: () => console.log('nothing'),      // Action after Cancel
    // })
  }

  submitDelete() {
    // let b = this;
    // Meteor.call('tasks.remove', this.state.task._id, function (error, result) {
    //   if (error) {
    //     Bert.alert( 'Debes iniciar sesión para poder publicar!', 'danger', 'growl-top-right' );
    //   }
    //   else{
    //     b.setState({task:undefined})
    //   }
    // });
  }

  handleSubmit(event) {
    // event.preventDefault();
    // let b = this.state.value;
    // Meteor.call('comments.insert', this.state.value, this.state.task._id, function (error, result) {
    //   if (error) {
    //     Bert.alert( 'Debes iniciar sesión para poder comentar!', 'danger', 'growl-top-right' );
    //   }
    //   else{
    //     console.log(this.refs)
    //     b = "";
    //   }
    // });
    // console.log(this.refs)
    // this.setState({value: b})
    // this.forceUpdate();
  }

  render() {
    if (!this.state.challenge) {
      return <Redirect push to="/challenges"/>;
    }
    return (
      <div>
        <LandingNavbar/>
        <div id="green">
          <div className="container">
            <div className="row">
              <div className="col-md-12 centered">
                <h3>{this.state.challenge.name}</h3>
                <p>{this.state.challenge.description}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="container">
          <div className="row centered mt grid">
            <h3>Current ranking:</h3>
            <div className="mt"></div>
            <div className="col-lg-4">
              <a href="#"><img src="assets/img/01.jpg" alt=""/></a>
            </div>
            <div className="col-lg-4">
              <a href="#"><img src="assets/img/02.jpg" alt=""/></a>
            </div>
            <div className="col-lg-4">
              <a href="#"><img src="assets/img/03.jpg" alt=""/></a>
            </div>
          </div>

          <div className="row mt centered">
            <UserCard challenge={this.state.challenge}/>
            <UserCard challenge={this.state.challenge}/>
          </div>
        </div>
      </div>
    );
  }
}


  export default createContainer(() => {
    // Meteor.subscribe('sales', Session.get('projectId'));
    return {
    currentUser: Meteor.user(),
  };
  }, SingleChallenge);