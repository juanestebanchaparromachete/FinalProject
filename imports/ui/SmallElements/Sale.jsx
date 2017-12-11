import React, {Component, PropTypes} from 'react';
import classnames from 'classnames';
import { Redirect } from 'react-router';

export default class Sale extends Component {

  constructor(props) {
    super(props);
    window.scrollTo(0, 0);
    this.state = {
      value: [],
      prod: '',
      quant: 0,
      val: 0,
      backToChallenge: false
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);

  }

  handleSubmit(event) {
    event.preventDefault();
    let b = this;
    productoASumar = this.state.prod;
    challengeId = this.props.sale._id;
    userId = Meteor.userId();
    products = this.props.sale.products;
    quantities = [];
    for (i = 0; i < products.length; i++) {
      if (productoASumar == products[i]) {
        quantities.push(Number(this.state.quant));
      } else {
        quantities.push(0);
      }
    }
    valueff = this.state.val;
    usernameff = Meteor.user().username;
    venta = {
      challengeId: challengeId,
      userId: userId,
      products: products,
      quantities: quantities,
      value: valueff,
      userName: usernameff
    }
    Meteor.call('sales.add', venta, function (error, result) {
      if (error) {
        console.log(error)
      }
      else {
        console.log('we good')
        confirm('The sale of the product ' + productoASumar + ' has been registered to ' + usernameff);
        b.setState({backToChallenge: true})
      }
    });
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  render() {
    console.log(this.props)
    return (
      <div className="col-md-12 mb-12" height="700px !important" align="middle">
        {this.state.backToChallenge ?
          <Redirect push to={'/challenges/id/' + this.props.sale._id}/> : null
        }
        <img className="card-img-top" src={this.props.sale.thumbnail} width="300px"
             alt="Imagen descriptiva proyecto"/>
        <p className="card-text">{this.props.sale.description}</p>
        <form id="contact" className="form" onSubmit={this.handleSubmit}>
          <div className="row">
            <div className="col-md-4">
              <label>Choose product: </label>
              <br/>
              <select value={this.state.prod} onClick={(event) => this.setState({prod: event.target.value})}
                      onChange={(event) => this.setState({prod: event.target.value})}>
                {this.props.sale.products.map(function (listValue) {
                  return (
                    <option key={listValue}> {listValue}</option>);
                })}
              </select>
            </div>
            <div className="col-md-4">
              <label>Insert quantity: </label>
              <input type="text" id="uname" name="name" value={this.state.quant}
                     onChange={(event) => this.setState({quant: event.target.value})}/>
            </div>
            <div className="col-md-4">
              <label>Insert value: </label>
              <input type="text" id="uname" name="name" value={this.state.val}
                     onChange={(event) => this.setState({val: event.target.value})}/>
            </div>
          </div>
          <br/>
          <div className="row">
            <br/>
            <fieldset>
              <button name="submit" type="submit" onSubmit={this.handleSubmit}
                      className="btn btn-primary moreInfoButton">Assign sale
              </button>
            </fieldset>
          </div>
        </form>
      </div>
    );
  }
}