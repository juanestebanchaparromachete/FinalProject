import React, {Component, PropTypes} from 'react';
import { Link } from 'react-router-dom';
import classnames from 'classnames';
import { Session } from 'meteor/session'

// Task component - represents a single todo item
export default class Challenge extends Component {

  render() {
    const taskClassName = classnames({
      // checked: this.props.challenge.checked,
      // private: this.props.challenge.private,
    });
    return (
      <div className="col-md-4 mb-4">
        <div className="card h-100">
          <div className="card-body">
            <img className="card-img-top" src={this.props.challenge.thumbnail} width="200px" alt="Imagen descriptiva proyecto"/>
            <p className="card-text">{this.props.challenge.description}</p>
            <Link onClick={() => Session.set('projectId', this.props.challenge._id)} to={{pathname: '/challenges/id/' + this.props.challenge._id, query: this.props.challenge}} className="btn btn-primary moreInfoButton">Ver detalle</Link>
          </div>
        </div>
      </div>
    );
  }
}
