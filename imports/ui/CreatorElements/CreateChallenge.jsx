import React, {Component} from 'react';
import {Meteor} from 'meteor/meteor';
import LandingNavbar from '../SmallElements/LandingNavbar.jsx'
import {Redirect} from 'react-router';
import axios from 'axios';
import {createContainer} from 'meteor/react-meteor-data';

class CreateChallenge extends Component {

  constructor(props) {
    super(props);
    window.scrollTo(0, 0);
    this.state = {
      value: [],
      count: 1,
      name: '',
      slogan: '',
      description: '',
      thumbnail: '',
      uploadedFileCloudinaryUrl: '',
      requirements: [],
      stage: 'Gestación'
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    let idea = props.location.query;
    if (idea){
      this.state.description = idea.description;
      this.state.slogan = idea.slogan;
      this.state.thumbnail = idea.thumbnail;
      this.state.name = idea.name;
    }
  }

  handleChange(i, event) {
    let value = this.state.value.slice();
    value[i] = event.target.value;
    this.setState({value});
  }

  renderRequirements() {
    let uiItems = [];
    for (let i = 0; i < this.state.count; i++) {
      uiItems.push(
        <div className="center-div" style={{textAlign: 'center'}} key={i}>
          <div className="row" style={{display: 'inline', textAlign: 'center'}}>
            <div key={i} style={{display: 'inline'}}>
              {/*<label htmlFor="exampleInputEmail1">Requerimiento {i + 1} &emsp; </label>*/}
              <input aria-labelledby="reqs" id="exampleSelect1" type="text" value={this.state.value[i] || ''}
                     placeholder={'Requerimiento ' + (i + 1) + ' ...'}
                     onChange={this.handleChange.bind(this, i)} required className="requirementInput"/>
              <input type='button' value='Borrar' className="removeReqButton"
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
    this.state.requirements = this.state.value;
    let b = this;
    Meteor.call('tasks.insert', this.state, function (error, result) {
      if (error) {
        Bert.alert( 'Debes iniciar sesión para poder publicar!', 'danger', 'growl-top-right' );
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
      return <Redirect push to="/projects"/>;
    }

    return (
      <div>
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