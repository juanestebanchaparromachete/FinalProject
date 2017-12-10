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
    console.log(this.props)
    return (
      <div className="col-md-3">
        <div className="user-card-body">
          <img className="card-img-top" src={"https://dummyimage.com/300x300/8acdb0/ffffff&text="+(this.props.index+1)} width="200px" height="190px" alt="Imagen descriptiva proyecto"/>
          <p className="user-card-text" style={{fontSize:'22px', fontWeight:800}}>{this.props.info.userName}</p>
          <p className="user-card-text">{'Amount of sold items:'}</p>
          <span className="numberSpan">{this.props.info.value2}</span>
          <p className="user-card-text">{'Total value of sales:'}</p>
          <span className="numberSpan">{this.props.info.value}</span>
          {/*<Link onClick={() => Session.set('challengeId', this.props.challenge._id)} to={{pathname: '/challenges/id/' + this.props.challenge._id, query: this.props.challenge}} className="btn btn-primary moreInfoButton">Ver detalle</Link>*/}
        </div>
      </div>
    );
  }
}
