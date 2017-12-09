import React, {Component} from 'react';
import {Meteor} from 'meteor/meteor';
import LandingNavbar from '../SmallElements/LandingNavbar.jsx'
import {Redirect} from 'react-router';
import axios from 'axios';
import {createContainer} from 'meteor/react-meteor-data';
import SweetAlert from 'react-bootstrap-sweetalert'

class CreateChallenge extends Component {

  constructor(props) {
    super(props);
    window.scrollTo(0, 0);
    this.state = {
      value: [],
      alert: null,
      count: 1,
      name: '',
      description: '',
      uploadedFileCloudinaryUrl: '',
      products: [],
      stage: 'Gestación'
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(i, event) {
    let value = this.state.value.slice();
    value[i] = event.target.value;
    this.setState({value});
  }

  renderProducts() {
    let uiItems = [];
    for (let i = 0; i < this.state.count; i++) {
      uiItems.push(
        <div className="center-div" style={{textAlign: 'center'}} key={i}>
          <div className="row" style={{display: 'inline', textAlign: 'center'}}>
            <div key={i} style={{display: 'inline'}}>
              {/*<label htmlFor="exampleInputEmail1">Requerimiento {i + 1} &emsp; </label>*/}
              <input aria-labelledby="reqs" id="exampleSelect1" type="text" value={this.state.value[i] || ''}
                     placeholder={'Product ' + (i + 1) + ' ...'}
                     onChange={this.handleChange.bind(this, i)} required className="requirementInput"/>
              <input type='button' value='Delete' className="removeReqButton"
                     onClick={this.removeClick.bind(this, i)}/>
            </div>
          </div>
        </div>
      )
    }
    return uiItems || null;
  }

  handleSubmit(event) {
    event.preventDefault();
    let newChallenge = {
      name: this.state.name,
      description: this.state.description,
      keyWords: this.state.keyWords,
      products: this.state.products
    }
    let b = this;
    Meteor.call('challenges.insert', newChallenge, function (error, result) {
      if (error) {
        console.log(error)
        b.setState({
          alert:
          <SweetAlert
            title={<span>ERROR</span>}
            onConfirm={this.hideAlert}
            >
            {/*<span>The passwords <span style={{color: '#F8BB86'}}>do not match</span></span>*/}
          </SweetAlert>
        });
      }
      else{
        b.setState({redirect: true});
      }
    });
  }

  addClick() {
    this.setState({count: this.state.count + 1})
  }

  removeClick(i) {
    let value = this.state.value.slice();
    value.splice(i, 1);
    this.setState({
      count: this.state.count - 1,
      value
    })
  };

  onDrop(files) {
    const uploaders = files.map(file => {
      // Initial FormData
      const formData = new FormData();
      formData.append("file", file);
      formData.append("tags", `codeinfuse, medium, gist`);
      formData.append("upload_preset", "rtbdnmmi");
      formData.append("api_key", "rtbdnmmi");
      formData.append("timestamp", (Date.now() / 1000) | 0);

      return axios.post("https://api.cloudinary.com/v1_1/openinnovation/image/upload", formData, {
        headers: {"X-Requested-With": "XMLHttpRequest"},
      }).then(response => {
        this.state.thumbnail = response.data.secure_url;
      })
    });
  }

  render() {
    if (this.state.redirect) {
      return <Redirect push to="/challenges"/>;
    }

    return (
      <div>
        {this.state.alert}
        { Meteor.userId() ? null : <Redirect push to="/main"/> }
        <LandingNavbar/>
        <div className="container2">
          <form id="contact" className="form" onSubmit={this.handleSubmit}>
            <h3 id="publica">Create a new challenge!</h3>
            {/*<h4>Contact us for custom quote</h4>*/}
            <fieldset>
              <label className="col-md-4" htmlFor="challengeName" style={{float:'left'}}>Challenge name:</label>
              <input type="text" className="form-control col-md-8" id="challengeName"
                     aria-labelledby="publica" required
                     value={this.state.name}
                     onChange={(event) => this.setState({name: event.target.value})}/>
            </fieldset>
            <fieldset>
              <label className="col-md-4" htmlFor="challengeDesc" style={{float:'left'}}>Challenge description:</label>
              <input type="text" className="form-control col-md-8" id="challengeDesc"
                     aria-labelledby="publica" required
                     value={this.state.description}
                     onChange={(event) => this.setState({description: event.target.value})}/>
            </fieldset>
            <fieldset>
              <label className="col-md-4" htmlFor="challengeDesc" style={{float:'left'}}>Key words(comma separated):</label>
              <input type="text" className="form-control col-md-8" id="challengeKeyWords"
                     aria-labelledby="publica" required
                     value={this.state.keyWords}
                     onChange={(event) => this.setState({keyWords: event.target.value})}/>
            </fieldset>
            <fieldset>
              <div>
                <label id="reqs"htmlFor="exampleInputEmail1">Eligible products for this challenge</label><br/>
                {this.renderProducts()}
                <div style={{textAlign: 'center'}}>
                  <input type='button' value='Add another one' id="addMoreButton"
                         onClick={this.addClick.bind(this)}/>
                </div>
              </div>
            </fieldset>
            <fieldset>
              <button name="submit" type="submit" id="contact-submit" data-submit="...Sending">Publish
              </button>
            </fieldset>
          </form>
        </div>
      </div>
    )
  }
}

export default createContainer(() => {
  return {
    currentUser: Meteor.user(),
  };
}, CreateChallenge);