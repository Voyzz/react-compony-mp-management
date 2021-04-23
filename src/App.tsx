import './App.css';

import {Route, BrowserRouter as Router} from 'react-router-dom';

import Admin from './pages/Admin';
import CheckLogin from "./pages/checkLogin.js";
import Error from './pages/Error';
import Login from './pages/Login.js';
import React from 'react';

function App() {
  return (
    <Router>
      <div className="App">
        <CheckLogin/>
        <Route path="/admin" component={Admin}></Route>
        <Route path="/error" component={Error}></Route>
        <Route path="/login" component={Login}></Route>
      </div>
    </Router>
  );
}

export default App;
