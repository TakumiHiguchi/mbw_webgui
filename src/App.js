import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  useLocation,
  useParams
} from "react-router-dom";
import {
  TransitionGroup,
  CSSTransition
} from "react-transition-group";

//view
import Home from "./view/home";
import Can from "./view/Can";
import Written from "./view/Written";
import Signin from "./view/Signin";
import PrivateRoute from './view/PrivateRoute';
//css
import './App.scss';

function App() {
  return (
      <Router>
        <Switch>
          <PrivateRoute exact path="/" component={Home} />
          <PrivateRoute exact path="/can" component={Can}/>
          <PrivateRoute exact path="/written" component={Written} />
          <Route exact path="/signin" component={Signin} />
          <Route render={() => <h1>ページが見つかりません</h1>} />
        </Switch>
      </Router>
  );
}




export default App;
