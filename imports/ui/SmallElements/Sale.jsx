import React, {Component, PropTypes} from 'react';
import { Link } from 'react-router-dom';
import classnames from 'classnames';
import { Session } from 'meteor/session'


// Task component - represents a single todo item
export default class Sale extends Component {

    constructor(props) {
        super(props);
        window.scrollTo(0, 0);
        this.state = {
            value: []
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);

    }

    handleSubmit(event) {
        event.preventDefault();

        productoASumar=this.state.value;
        challengeId=this.props.sale._id;
        userId=Meteor.userId();
        products=this.props.sale.products;
        quantities=[];
        for (i=0; i<products.length; i++)
        {
          if(productoASumar==products[i])
          {
            quantities.push(1);
          }else{
              quantities.push(0);
          }
        }
        venta = {challengeId:challengeId, userId:userId, products:products, quantities:quantities, value:350000}
        Meteor.call('sales.add', venta);


    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

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
            <form id="contact" className="form" onSubmit={this.handleSubmit}>
            <div className="row">
            <select onChange={this.handleChange}>
                {this.props.sale.products.map(function(listValue){
                    return (
                        <option  key = {listValue}> {listValue}</option>);
                })}
            </select>
            </div>
            <br/>
            <div className="row">
              <br/>
              <fieldset>
              <button name="submit" type="submit" onSubmit={this.handleSubmit} className="btn btn-primary moreInfoButton">Asignar venta</button>
              </fieldset>
            </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
