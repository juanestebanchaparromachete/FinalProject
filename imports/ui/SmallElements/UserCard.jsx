import React, {Component, PropTypes} from 'react';
import { Link } from 'react-router-dom';
import classnames from 'classnames';
import { Session } from 'meteor/session'

// Task component - represents a single todo item
export default class UserCard extends Component {

  render() {
    const taskClassName = classnames({
      // checked: this.props.challenge.checked,
      // private: this.props.challenge.private,
    });
    return (
      <div className="col-md-3">
        <div className="card-body">
          <img className="card-img-top" src={this.props.challenge.thumbnail} width="200px" height="190px" alt="Imagen descriptiva proyecto"/>
          <p className="card-text">{this.props.challenge.description}</p>
          <Link onClick={() => Session.set('challengeId', this.props.challenge._id)} to={{pathname: '/challenges/id/' + this.props.challenge._id, query: this.props.challenge}} className="btn btn-primary moreInfoButton">Ver detalle</Link>
        </div>
      </div>
    );
  }
}
