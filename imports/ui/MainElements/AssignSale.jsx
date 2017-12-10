import React, {Component, PropTypes} from 'react';
import {createContainer} from 'meteor/react-meteor-data';
import ReactDOM from 'react-dom';
import {Meteor} from 'meteor/meteor';
import Navbar from '../SmallElements/Navbar.jsx'
import { Sales } from "../../api/sales.jsx";
import { Challenges } from "../../api/challenges.jsx";
import Sale from "../SmallElements/Sale.jsx";
import LandingNavbar from "../SmallElements/LandingNavbar";
import {Redirect} from 'react-router';

// ProjectsView component - represents the whole app
class AssignSale extends Component {

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
    let filteredSales = this.props.sales;
    console.log('props sig');
    let currentChallenge = this.props.match.params.challenge;
    // if (this.state.hideCompleted) {
    //   filteredSales = filteredSales.filter(task => !task.checked);
    // }
    return filteredSales.map((sale) => {
      // const currentUserId = this.props.currentUser && this.props.currentUser._id;
      // const showPrivateButton = sale.owner === currentUserId;
        if(sale._id == currentChallenge)
        {
          this.props.currentChallenge = currentChallenge
      return (
        <Sale
          key={sale._id}
          sale={sale}
        />
      )};
        return "";
    });
  }

  handleSubmit(event) {
    event.preventDefault();

    // Find the text field via the React ref
    const text = ReactDOM.findDOMNode(this.refs.textInput).value.trim();

    Meteor.call('sales.insert', text);
    // Clear form
    ReactDOM.findDOMNode(this.refs.textInput).value = '';
  }

  render() {
    return (
      <div>
        {/*{ Meteor.userId() ? null : <Redirect push to="/main"/> }*/}
        <LandingNavbar/>
        <div className="row my-4">
          <div className="container">
            <br/>
            <br/>
            <br/>
            <br/>
            <h1>Assign sale</h1>

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
    sales: Challenges.find({}, {sort: {createdAt: -1}}).fetch(),
    currentUser: Meteor.user(),
  };
}, AssignSale);