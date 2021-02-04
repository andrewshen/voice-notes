import React from 'react';
import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';

import PrivateRoute from './routes/PrivateRoute';
import PublicRoute from './routes/PublicRoute';

import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';

const App = () => {
  return (
    <Router>
      <PrivateRoute exact path="/" component={Home} />
      <PublicRoute exact path="/login" component={Login} />
      <PublicRoute exact path="/register" component={Register} />
    </Router>
  );
};

export default App;
