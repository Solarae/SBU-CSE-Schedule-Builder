import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Search from './components/Search';
import Schedule from './components/Schedule';
import PopulateDB from './components/PopulateDB';
import { Provider } from 'react-redux';
import store from './store';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

class App extends Component {
  render () {
    return (
      <Provider store={store}>
      <Router>
        <div>
          <Switch>
            <Route exact path="/" component={Search}/>
            <Route exact path="/schedule" component={Schedule}/>
            <Route exact path="/populateDB" component={PopulateDB}/>
          </Switch>
        </div>
      </Router>
      </Provider>
    );
  }
}

export default App;
