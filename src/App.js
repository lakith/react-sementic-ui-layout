import React, { Component } from 'react';
import './App.css';
import 'semantic-ui-css/semantic.min.css';
import {Switch,Route,Redirect} from 'react-router-dom'
import HomepageLayout from './containers/home/home';

class App extends Component {


  render() {

    let routes = (
              <Switch>
                <Route path="/register" />
                <Route path="/login" />
                <Route path="/logout" />
                <Route path="/" exact component={HomepageLayout} />
                <Redirect to="/" />
              </Switch>
  )

    return (
      <div className="App">
        {routes}
      </div>
    );
  }
}

export default App;
