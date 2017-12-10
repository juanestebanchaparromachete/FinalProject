import React, {Component, PropTypes} from 'react';
import { Link } from 'react-router-dom';
import classnames from 'classnames';
import { Session } from 'meteor/session'

// Task component - represents a single todo item
export default class Sale extends Component {

  render() {
    const taskClassName = classnames({
      // checked: this.props.challenge.checked,
      // private: this.props.challenge.private,
    });
    return (
      <div className="col-md-12 mb-12" height="700px !important">
        <div className="card h-200">
          <div className="card-body">
            <img className="card-img-top" src={this.props.sale.thumbnail} width="200px" alt="Imagen descriptiva proyecto"/>
            <p className="card-text">{this.props.sale.description}</p>
            <div className="row">
            <select>
                {this.props.sale.products.map(function(listValue){
                    return (
                        <option  key = {listValue}>{listValue}</option>);
                })}
            </select>
            </div>
            <br/>
            <div className="row">
              <br/>
              <Link onClick={() => Session.set('projectId', this.props.sale._id)} to={{pathname: '/sales/id/' + this.props.sale._id, query: this.props.sale}} className="btn btn-primary moreInfoButton">Asignar venta</Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
