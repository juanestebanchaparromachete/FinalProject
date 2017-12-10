import React, { Component } from 'react';
import { Router, Route } from 'react-router';
import createBrowserHistory from 'history/createBrowserHistory';
// import ProjectsView from './ListView/ProjectsView.jsx'
// import IdeasView from './ListView/IdeasView.jsx'
// import CreateProject from './Creators/CreateProject.jsx'
// import SingleProject from './SingleView/SingleProject.jsx'
import { Redirect } from 'react-router';
// import CreateIdea from './Creators/CreateIdea.jsx'
import ChallengesList from './MainElements/ChallengesList.jsx';
import CreateChallenge from './CreatorElements/CreateChallenge.jsx';
import LandingPage from './MainElements/LandingPage.jsx'
import AssignSale from './MainElements/AssignSale.jsx';
import SingleChallenge from './MainElements/SingleChallenge.jsx';


const browserHistory = createBrowserHistory();
// App component - represents the whole app
class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      hideCompleted: false,
    };
  }

  toggleHideCompleted() {
    this.setState({
      hideCompleted: !this.state.hideCompleted,
    });
  }

  renderTasks() {
    let filteredTasks = this.props.tasks;
    if (this.state.hideCompleted) {
      filteredTasks = filteredTasks.filter(task => !task.checked);
    }
    return filteredTasks.map((task) => {
      const currentUserId = this.props.currentUser && this.props.currentUser._id;
      const showPrivateButton = task.owner === currentUserId;

      return (
        <Task
          key={task._id}
          task={task}
          showPrivateButton={showPrivateButton}
        />
      );
    });
  }

  handleSubmit(event) {
    event.preventDefault();

    // Find the text field via the React ref
    const text = ReactDOM.findDOMNode(this.refs.textInput).value.trim();

    Meteor.call('tasks.insert', text);
    // Clear form
    ReactDOM.findDOMNode(this.refs.textInput).value = '';
  }

  render() {
    return (
      <div>
        <Router history={browserHistory}>
          <div>
            <Route exact path="/" component={MainRedirect}/>
            <Route exact path="/main" component={LandingPage}/>
            <Route exact path="/challenges" component={ChallengesList}/>
            <Route path="/sale/:challenge/sales" component={AssignSale}/>
            <Route path="/challenges/:name" component={SingleChallenge}/>
            <Route exact path="/publish" component={CreateChallenge}/>
            <Route path="/challenges/:challenge/sales" component={AssignSale}/>
            <Route exact path="/error" component={NotFound}/>
          </div>
        </Router>
      </div>
    );
  }
}

const NotFound = () => (
  <h1>404.. This page is not found!</h1>);

const MainRedirect = () => (
  <Redirect push to="/main"/>);

export default App;