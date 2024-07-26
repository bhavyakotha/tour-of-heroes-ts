import React from 'react';
import Navbar from './Navbar.jsx';
import Dashboard from './Dashboard.jsx';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Heroes from './Heroes.jsx';
import Heroview from './Heroview.jsx';
declare module 'react-router-dom';


const App: React.FC = () => {
  return (
    <Router>
      <div className="App">
        <div className="bg">
          <Navbar />
          <div className="content">
            <Switch>
              <Route exact path="/">
                <Dashboard />
              </Route>
              <Route path="/allheroes">
                <Heroes />
              </Route>
              <Route path="/heroes/:id">
                <Heroview />
              </Route>
            </Switch>
          </div>
        </div>
      </div>
    </Router> 
  );
}

export default App;
