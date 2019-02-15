import React, { Component } from 'react';
import './App.css';
import 'semantic-ui-css/semantic.min.css';
import {Switch,Route,Redirect} from 'react-router-dom'
import HomepageLayout from './containers/home/home';
import Register from './containers/auth/register/Register';
import Login from './containers/auth/login/login';

class App extends Component {


  render() {

    let routes = (
              <Switch>
                <Route path="/register" component={Register}/>
                <Route path="/login"  component={Login}/>
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
